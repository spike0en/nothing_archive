/**
 * @file SearchBar/index.tsx
 * @description Custom swizzled SearchBar component overriding @docusaurus/theme-search-algolia/SearchBar.
 * Renders the primary navigation search button with official Google Material Symbols Outlined search SVG icon.
 * Intercepts Algolia search client to record exact query hits, preventing @docsearch/react count accumulation bug.
 * 
 * Layer: Navigation theme search component.
 * Boundary: Invoked by Docusaurus navbar for Algolia DocSearch integration.
 */

import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
// @ts-ignore
import {createPortal} from 'react-dom';
import {useDocSearchKeyboardEvents} from '@docsearch/react/useDocSearchKeyboardEvents';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import {useHistory} from '@docusaurus/router';
import {
  isRegexpStringMatch,
  useSearchLinkCreator,
} from '@docusaurus/theme-common';
import {
  useAlgoliaContextualFacetFilters,
  useSearchResultUrlProcessor,
  useAlgoliaAskAi,
  mergeFacetFilters,
} from '@docusaurus/theme-search-algolia/client';
import Translate from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import translations from '@theme/SearchTranslations';
import type {
  InternalDocSearchHit,
  DocSearchModal as DocSearchModalType,
  DocSearchModalProps,
  StoredDocSearchHit,
  DocSearchTransformClient,
  DocSearchHit,
  DocSearchTranslations,
  UseDocSearchKeyboardEventsProps,
} from '@docsearch/react';

import type {AutocompleteState} from '@algolia/autocomplete-core';
import type {FacetFilters} from 'algoliasearch/lite';
import type {ThemeConfigAlgolia} from '@docusaurus/theme-search-algolia';

type DocSearchProps = Omit<
  DocSearchModalProps,
  'onClose' | 'initialScrollY'
> & {
  contextualSearch?: string;
  externalUrlRegex?: string;
  searchPagePath: boolean | string;
  askAi?: Exclude<
    (DocSearchModalProps & {askAi: unknown})['askAi'],
    string | undefined
  >;
};

interface DocSearchV4Props extends Omit<DocSearchProps, 'askAi'> {
  indexName: string;
  askAi?: ThemeConfigAlgolia['askAi'];
  translations?: DocSearchTranslations;
}

/** Dynamic module reference for code-split lazy loading of DocSearch modal assets */
let DocSearchModal: typeof DocSearchModalType | null = null;

/**
 * Lazy loads the heavy DocSearch modal JS bundle and CSS styles on first interaction or focus.
 * 
 * @returns {Promise<void>} Resolves when modal modules are imported and assigned to local state.
 */
function importDocSearchModalIfNeeded(): Promise<void> {
  if (DocSearchModal) {
    return Promise.resolve();
  }
  return Promise.all([
    import('@docsearch/react/modal'),
    // @ts-ignore
    import('@docsearch/react/style'),
  ]).then(([{DocSearchModal: Modal}]) => {
    DocSearchModal = Modal;
  });
}

/**
 * Renders the official Google Material Symbols Outlined search SVG icon.
 * Uses 24px viewBox coordinates with fill="currentColor" to match navbar stroke density.
 * 
 * @returns {ReactNode} Vector SVG element representing the search icon.
 */
function SearchIcon(): ReactNode {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="16"
      width="16"
      viewBox="0 -960 960 960"
      fill="currentColor"
      className="DocSearch-Search-Icon"
    >
      <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
    </svg>
  );
}

/**
 * Custom navigation hook for routing search result selection to local history or external links.
 * 
 * @param {Pick<DocSearchProps, 'externalUrlRegex'>} props - Regex matching external URLs.
 * @returns {DocSearchModalProps['navigator']} Navigator object implementing search result navigation.
 */
function useNavigator({
  externalUrlRegex,
}: Pick<DocSearchProps, 'externalUrlRegex'>): DocSearchModalProps['navigator'] {
  const history = useHistory();
  const [navigator] = useState<DocSearchModalProps['navigator']>(() => {
    return {
      navigate(params) {
        if (isRegexpStringMatch(externalUrlRegex, params.itemUrl)) {
          window.location.href = params.itemUrl;
        } else {
          history.push(params.itemUrl);
        }
      },
    };
  });
  return navigator;
}

/**
 * Intercepts Algolia search queries to capture exact total hits for active query.
 * Resolves the upstream bug in @docsearch/react where context.nbHits accumulates across keystrokes.
 * 
 * @returns {{ transformSearchClient: DocSearchModalProps['transformSearchClient'], latestHitsCount: number }}
 * Transformed client wrapper and current query's exact non-accumulating hit count.
 */
function useTransformSearchClient(): {
  transformSearchClient: DocSearchModalProps['transformSearchClient'];
  latestHitsCount: number;
} {
  const {
    siteMetadata: {docusaurusVersion},
  } = useDocusaurusContext();
  const [latestHitsCount, setLatestHitsCount] = useState<number>(0);

  const transformSearchClient = useCallback(
    (searchClient: DocSearchTransformClient) => {
      // Add standard Docusaurus user-agent metadata
      searchClient.addAlgoliaAgent('docusaurus', docusaurusVersion);
      const originalSearch = searchClient.search.bind(searchClient);

      // Wrap search function to calculate exact hit sum per query batch
      searchClient.search = (async (...args: Parameters<typeof originalSearch>) => {
        const res = await originalSearch(...args);
        if (res && Array.isArray(res.results) && res.results.length > 0) {
          // Sum nbHits across returned search result sets
          const totalHits = res.results.reduce(
            (sum: number, r: any) => sum + (typeof r?.nbHits === 'number' ? r.nbHits : 0),
            0,
          );
          setLatestHitsCount(totalHits);
        }
        return res;
      }) as typeof originalSearch;
      return searchClient;
    },
    [docusaurusVersion],
  );

  return { transformSearchClient, latestHitsCount };
}

/**
 * Transforms raw Algolia result items by processing URLs for Docusaurus base path routing.
 * 
 * @param {Pick<DocSearchProps, 'transformItems'>} props - Custom transform function override.
 * @returns {DocSearchModalProps['transformItems']} Transformed item processor callback.
 */
function useTransformItems(props: Pick<DocSearchProps, 'transformItems'>): DocSearchModalProps['transformItems'] {
  const processSearchResultUrl = useSearchResultUrlProcessor();
  const [transformItems] = useState<DocSearchModalProps['transformItems']>(
    () => {
      return (items: DocSearchHit[]) =>
        props.transformItems
          ? props.transformItems(items)
          : items.map((item) => ({
              ...item,
              url: processSearchResultUrl(item.url),
            }));
    },
  );
  return transformItems;
}

/**
 * Memoized hook producing the modal footer component that displays exact query hit counts.
 * 
 * @param {Object} params - Parameters object containing modal close callback and hits count.
 * @param {() => void} params.closeModal - Callback to close modal on navigation.
 * @param {number} params.hitsCount - Exact non-accumulated total hit count for current query.
 * @returns {DocSearchProps['resultsFooterComponent']} React component for search modal footer.
 */
function useResultsFooterComponent({
  closeModal,
  hitsCount,
}: {
  closeModal: () => void;
  hitsCount: number;
}): DocSearchProps['resultsFooterComponent'] {
  return useMemo(
    () =>
      ({state}) =>
        <ResultsFooter state={state} onClose={closeModal} hitsCount={hitsCount} />,
    [closeModal, hitsCount],
  );
}

/**
 * Renders individual search result item links.
 * 
 * @param {Object} props - Hit component props containing result item and children node.
 * @returns {ReactNode} Link element pointing to result URL.
 */
function Hit({
  hit,
  children,
}: {
  hit: InternalDocSearchHit | StoredDocSearchHit;
  children: ReactNode;
}) {
  return <Link to={hit.url}>{children}</Link>;
}

type ResultsFooterProps = {
  state: AutocompleteState<InternalDocSearchHit>;
  onClose: () => void;
  hitsCount: number;
};

/**
 * Modal footer component displaying "See all {count} results" link.
 * Uses exact intercepted hits count over accumulated context count.
 * 
 * @param {ResultsFooterProps} props - Footer state, close callback, and intercepted hits count.
 * @returns {ReactNode} Footer link element.
 */
function ResultsFooter({state, onClose, hitsCount}: ResultsFooterProps) {
  const createSearchLink = useSearchLinkCreator();
  const count = hitsCount > 0 ? hitsCount : (state.context?.nbHits ?? 0);

  return (
    <Link to={createSearchLink(state.query)} onClick={onClose}>
      <Translate
        id="theme.SearchBar.seeAll"
        values={{count}}>
        {'See all {count} results'}
      </Translate>
    </Link>
  );
}

/**
 * Merges contextual facet filters for multi-version / language doc search routing.
 * 
 * @param {DocSearchProps} props - Contextual search and configuration parameters.
 * @returns {DocSearchProps['searchParameters']} Combined Algolia search parameters.
 */
function useSearchParameters({
  contextualSearch,
  ...props
}: DocSearchProps): DocSearchProps['searchParameters'] {
  const contextualSearchFacetFilters = useAlgoliaContextualFacetFilters();
  const configFacetFilters: FacetFilters =
    props.searchParameters?.facetFilters ?? [];
  const facetFilters: FacetFilters = contextualSearch
    ? mergeFacetFilters(contextualSearchFacetFilters, configFacetFilters)
    : configFacetFilters;

  return {
    ...props.searchParameters,
    facetFilters,
  };
}

/**
 * Core DocSearch trigger button and modal manager component.
 * Manages modal visibility, portal creation, keyboard shortcuts, and lazy bundle loading.
 * 
 * @param {DocSearchV4Props} props - Theme configuration and Algolia parameters.
 * @returns {ReactNode} Search bar trigger button and portal modal dialog.
 */
function DocSearch({externalUrlRegex, ...props}: DocSearchV4Props) {
  const navigator = useNavigator({externalUrlRegex});
  const searchParameters = useSearchParameters({...props} as DocSearchProps);
  const transformItems = useTransformItems(props);
  const {transformSearchClient, latestHitsCount} = useTransformSearchClient();

  const searchContainer = useRef<HTMLDivElement | null>(null);
  const searchButtonRef = useRef<HTMLButtonElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [initialQuery, setInitialQuery] = useState<string | undefined>(undefined);

  const {isAskAiActive, currentPlaceholder, onAskAiToggle, extraAskAiProps} =
    useAlgoliaAskAi(props);

  // Prepares portal DOM container for rendering modal dialog at body root
  const prepareSearchContainer = useCallback(() => {
    if (!searchContainer.current) {
      const divElement = document.createElement('div');
      searchContainer.current = divElement;
      document.body.insertBefore(divElement, document.body.firstChild);
    }
  }, []);

  // Opens search modal and triggers lazy bundle import
  const openModal = useCallback(() => {
    prepareSearchContainer();
    importDocSearchModalIfNeeded().then(() => setIsOpen(true));
  }, [prepareSearchContainer]);

  // Closes modal and returns focus to search trigger button
  const closeModal = useCallback(() => {
    setIsOpen(false);
    searchButtonRef.current?.focus();
    setInitialQuery(undefined);
    onAskAiToggle(false);
  }, [onAskAiToggle]);

  // Handles keyboard shortcut keydown events for quick search trigger
  const handleInput = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'f' && (event.metaKey || event.ctrlKey)) {
        return;
      }
      event.preventDefault();
      setInitialQuery(event.key);
      openModal();
    },
    [openModal],
  );

  const resultsFooterComponent = useResultsFooterComponent({
    closeModal,
    hitsCount: latestHitsCount,
  });

  useDocSearchKeyboardEvents({
    isOpen,
    onOpen: openModal,
    onClose: closeModal,
    onInput: handleInput,
    searchButtonRef,
    isAskAiActive: isAskAiActive ?? false,
    onAskAiToggle: onAskAiToggle ?? (() => {}),
  } satisfies UseDocSearchKeyboardEventsProps & {
    isAskAiActive: boolean;
    onAskAiToggle: (askAiToggle: boolean) => void;
  } as UseDocSearchKeyboardEventsProps);

  return (
    <>
      <Head>
        <link
          rel="preconnect"
          href={`https://${props.appId}-dsn.algolia.net`}
          crossOrigin="anonymous"
        />
      </Head>

      <button
        type="button"
        className="DocSearch DocSearch-Button"
        aria-label="Search"
        onTouchStart={importDocSearchModalIfNeeded}
        onFocus={importDocSearchModalIfNeeded}
        onMouseOver={importDocSearchModalIfNeeded}
        onClick={openModal}
        ref={searchButtonRef}
      >
        <span className="DocSearch-Button-Container">
          <SearchIcon />
        </span>
      </button>

      {isOpen &&
        DocSearchModal &&
        searchContainer.current &&
        createPortal(
          <DocSearchModal
            onClose={closeModal}
            initialScrollY={window.scrollY}
            initialQuery={initialQuery}
            navigator={navigator}
            transformItems={transformItems}
            hitComponent={Hit}
            transformSearchClient={transformSearchClient}
            {...(props.searchPagePath && {
              resultsFooterComponent,
            })}
            placeholder={currentPlaceholder}
            {...(props as any)}
            translations={props.translations?.modal ?? translations.modal}
            searchParameters={searchParameters}
            {...extraAskAiProps}
          />,
          searchContainer.current,
        )}
    </>
  );
}

/**
 * Main SearchBar exported component swizzling Docusaurus Algolia search bar.
 * Reads site config parameters and renders the DocSearch integration.
 * 
 * @param {Partial<DocSearchV4Props>} props - Optional component property overrides.
 * @returns {ReactNode} Instantiated DocSearch component.
 */
export default function SearchBar(props: Partial<DocSearchV4Props>): ReactNode {
  const {siteConfig} = useDocusaurusContext();

  const docSearchProps: DocSearchV4Props = {
    ...(siteConfig.themeConfig.algolia as DocSearchV4Props),
    ...props,
  };

  return <DocSearch {...docSearchProps} />;
}
