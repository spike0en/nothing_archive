/**
 * @file SearchBar/SearchBar.jsx
 * @description Local search bar component handling client-side search autocomplete, 
 * index fetching, keyword highlighting, and keyboard shortcuts.
 * 
 * Layer: Search theme overrides.
 * Boundary: Integrates with @easyops-cn/docusaurus-search-local web worker search APIs.
 */

import React, { useCallback, useEffect, useRef, useState, } from "react";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useIsBrowser from "@docusaurus/useIsBrowser";
import { useHistory, useLocation } from "@docusaurus/router";
import { translate } from "@docusaurus/Translate";
import { useActivePlugin, useActiveVersion, } from "@docusaurus/plugin-content-docs/client";
import { fetchIndexesByWorker, searchByWorker } from "@easyops-cn/docusaurus-search-local/dist/client/client/theme/searchByWorker";
import { SuggestionTemplate } from "./SuggestionTemplate";
import { EmptyTemplate } from "./EmptyTemplate";
import { SearchDocumentType } from "@easyops-cn/docusaurus-search-local/dist/client/shared/interfaces";
import { Mark, searchBarShortcut, searchBarShortcutHint, searchBarShortcutKeymap, searchBarPosition, docsPluginIdForPreferredVersion, searchContextByPaths, hideSearchBarWithNoSearchContext, useAllContextsWithNoSearchContext, askAi, } from "@easyops-cn/docusaurus-search-local/dist/client/client/utils/proxiedGenerated";
import LoadingRing from "@easyops-cn/docusaurus-search-local/dist/client/client/theme/LoadingRing/LoadingRing";
import { normalizeContextByPath } from "@easyops-cn/docusaurus-search-local/dist/client/client/utils/normalizeContextByPath";
import { searchResultLimits } from "@easyops-cn/docusaurus-search-local/dist/client/client/utils/proxiedGeneratedConstants";
import { parseKeymap, matchesKeymap, getKeymapHints } from "@easyops-cn/docusaurus-search-local/dist/client/client/utils/keymap";
import { isMacPlatform } from "@easyops-cn/docusaurus-search-local/dist/client/client/utils/platform";
import styles from "./SearchBar.module.css";
async function fetchAutoCompleteJS() {
    const autoCompleteModule = await import("@easyops-cn/autocomplete.js");
    const autoComplete = autoCompleteModule.default;
    if (autoComplete.noConflict) {
        // For webpack v5 since docusaurus v2.0.0-alpha.75
        autoComplete.noConflict();
    }
    else if (autoCompleteModule.noConflict) {
        // For webpack v4 before docusaurus v2.0.0-alpha.74
        autoCompleteModule.noConflict();
    }
    return autoComplete;
}
async function fetchOpenAskAI() {
    try {
        // Dynamic import of open-ask-ai (optional peer dependency)
        // This creates a separate webpack chunk that is only loaded when:
        // 1. The askAi option is configured
        // 2. This function is called (when user interacts with search)
        // If open-ask-ai is not installed, the import will fail and be caught gracefully
        const openAskAIModule = await import("open-ask-ai");
        await import("open-ask-ai/styles.css");
        return {
            AskAIWidget: openAskAIModule.AskAIWidget,
        };
    }
    catch (error) {
        // open-ask-ai is optional, return null if not available
        return null;
    }
}
const SEARCH_PARAM_HIGHLIGHT = "_highlight";
export default function SearchBar({ handleSearchBarToggle, }) {
    const isBrowser = useIsBrowser();
    const { siteConfig: { baseUrl }, i18n: { currentLocale }, } = useDocusaurusContext();
    // It returns undefined for non-docs pages
    const activePlugin = useActivePlugin();
    let versionUrl = baseUrl;
    const activeVersion = useActiveVersion(activePlugin?.pluginId ?? docsPluginIdForPreferredVersion);
    if (activeVersion && !activeVersion.isLast) {
        versionUrl = activeVersion.path + "/";
    }
    const history = useHistory();
    const location = useLocation();
    const searchBarRef = useRef(null);
    const indexStateMap = useRef(new Map());
    // Should the input be focused after the index is loaded?
    const focusAfterIndexLoaded = useRef(false);
    const [loading, setLoading] = useState(false);
    const [inputChanged, setInputChanged] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const search = useRef(null);
    const askAIWidgetRef = useRef(null);
    const [AskAIWidgetComponent, setAskAIWidgetComponent] = useState(null);
    const prevSearchContext = useRef("");
    const [searchContext, setSearchContext] = useState("");
    const prevVersionUrl = useRef(baseUrl);
    useEffect(() => {
        if (!Array.isArray(searchContextByPaths)) {
            if (prevVersionUrl.current !== versionUrl) {
                // Reset index state map once version url is changed.
                indexStateMap.current.delete("");
                prevVersionUrl.current = versionUrl;
            }
            return;
        }
        let nextSearchContext = "";
        if (location.pathname.startsWith(versionUrl)) {
            const uri = location.pathname.substring(versionUrl.length);
            let matchedPath;
            for (const _path of searchContextByPaths) {
                const path = typeof _path === "string" ? _path : _path.path;
                if (uri === path || uri.startsWith(`${path}/`)) {
                    matchedPath = path;
                    break;
                }
            }
            if (matchedPath) {
                nextSearchContext = matchedPath;
            }
        }
        if (prevSearchContext.current !== nextSearchContext) {
            // Reset index state map once search context is changed.
            indexStateMap.current.delete(nextSearchContext);
            prevSearchContext.current = nextSearchContext;
        }
        setSearchContext(nextSearchContext);
    }, [location.pathname, versionUrl]);
    const hidden = !!hideSearchBarWithNoSearchContext &&
        Array.isArray(searchContextByPaths) &&
        searchContext === "";
    const loadIndex = useCallback(async () => {
        if (hidden || indexStateMap.current.get(searchContext)) {
            // Do not load the index (again) if its already loaded or in the process of being loaded.
            return;
        }
        indexStateMap.current.set(searchContext, "loading");
        search.current?.autocomplete.destroy();
        setLoading(true);
        const [autoComplete, openAskAIModule] = await Promise.all([
            fetchAutoCompleteJS(),
            askAi ? fetchOpenAskAI() : Promise.resolve(null),
            fetchIndexesByWorker(versionUrl, searchContext),
        ]);
        if (openAskAIModule) {
            setAskAIWidgetComponent(() => openAskAIModule.AskAIWidget);
        }
        const searchFooterLinkElement = ({ query, isEmpty, }) => {
            const a = document.createElement("a");
            const params = new URLSearchParams();
            params.set("q", query);
            let linkText;
            if (searchContext) {
                const detailedSearchContext = searchContext && Array.isArray(searchContextByPaths)
                    ? searchContextByPaths.find((item) => typeof item === "string"
                        ? item === searchContext
                        : item.path === searchContext)
                    : searchContext;
                const translatedSearchContext = detailedSearchContext
                    ? normalizeContextByPath(detailedSearchContext, currentLocale).label
                    : searchContext;
                if (useAllContextsWithNoSearchContext && isEmpty) {
                    linkText = translate({
                        id: "theme.SearchBar.seeAllOutsideContext",
                        message: 'See all results outside "{context}"',
                    }, { context: translatedSearchContext });
                }
                else {
                    linkText = translate({
                        id: "theme.SearchBar.searchInContext",
                        message: 'See all results within "{context}"',
                    }, { context: translatedSearchContext });
                }
            }
            else {
                linkText = translate({
                    id: "theme.SearchBar.seeAll",
                    message: "See all results",
                });
            }
            if (searchContext &&
                Array.isArray(searchContextByPaths) &&
                (!useAllContextsWithNoSearchContext || !isEmpty)) {
                params.set("ctx", searchContext);
            }
            if (versionUrl !== baseUrl) {
                if (!versionUrl.startsWith(baseUrl)) {
                    throw new Error(`Version url '${versionUrl}' does not start with base url '${baseUrl}', this is a bug of \`@easyops-cn/docusaurus-search-local\`, please report it.`);
                }
                params.set("version", versionUrl.substring(baseUrl.length));
            }
            const url = `${baseUrl}search/?${params.toString()}`;
            a.href = url;
            a.textContent = linkText;
            a.addEventListener("click", (e) => {
                if (!e.ctrlKey && !e.metaKey) {
                    e.preventDefault();
                    search.current?.autocomplete.close();
                    history.push(url);
                }
            });
            return a;
        };
        search.current = autoComplete(searchBarRef.current, {
            hint: false,
            autoselect: true,
            openOnFocus: true,
            cssClasses: {
                root: clsx(styles.searchBar, {
                    [styles.searchBarLeft]: searchBarPosition === "left",
                }),
                noPrefix: true,
                dropdownMenu: styles.dropdownMenu,
                input: styles.input,
                hint: styles.hint,
                suggestions: styles.suggestions,
                suggestion: styles.suggestion,
                cursor: styles.cursor,
                dataset: styles.dataset,
                empty: styles.empty,
            },
        }, [
            {
                source: async (input, callback) => {
                    const result = await searchByWorker(versionUrl, searchContext, input, searchResultLimits);
                    if (input && askAi) {
                        callback([
                            {
                                document: {
                                    i: -1,
                                    t: "",
                                    u: "",
                                },
                                type: SearchDocumentType.AskAI,
                                page: undefined,
                                metadata: {},
                                tokens: [input],
                            },
                            ...result,
                        ]);
                    }
                    else {
                        callback(result);
                    }
                },
                templates: {
                    suggestion: SuggestionTemplate,
                    empty: EmptyTemplate,
                    footer: ({ query, isEmpty }) => {
                        if (isEmpty &&
                            (!searchContext || !useAllContextsWithNoSearchContext)) {
                            return;
                        }
                        const a = searchFooterLinkElement({ query, isEmpty });
                        const div = document.createElement("div");
                        div.className = styles.hitFooter;
                        div.appendChild(a);
                        return div;
                    },
                },
            },
        ])
            .on("autocomplete:selected", function (event, { document: { u, h }, type, tokens }) {
            searchBarRef.current?.blur();
            if (type === SearchDocumentType.AskAI && askAi) {
                askAIWidgetRef.current?.openWithNewSession(tokens.join(""));
                return;
            }
            let url = u;
            if (Mark && tokens.length > 0) {
                const params = new URLSearchParams();
                for (const token of tokens) {
                    params.append(SEARCH_PARAM_HIGHLIGHT, token);
                }
                url += `?${params.toString()}`;
            }
            if (h) {
                url += h;
            }
            history.push(url);
        })
            .on("autocomplete:closed", () => {
            searchBarRef.current?.blur();
        });
        indexStateMap.current.set(searchContext, "done");
        setLoading(false);
        if (focusAfterIndexLoaded.current) {
            const input = searchBarRef.current;
            if (input.value) {
                search.current?.autocomplete.open();
            }
            input.focus();
        }
    }, [hidden, searchContext, versionUrl, baseUrl, history]);
    useEffect(() => {
        if (!Mark) {
            return;
        }
        const keywords = isBrowser
            ? new URLSearchParams(location.search).getAll(SEARCH_PARAM_HIGHLIGHT)
            : [];
        // A workaround to fix an issue of highlighting in code blocks.
        // See https://github.com/easyops-cn/docusaurus-search-local/issues/92
        // Code blocks will be re-rendered after this `useEffect` ran.
        // So we make the marking run after a macro task.
        setTimeout(() => {
            const root = document.querySelector("article");
            if (!root) {
                return;
            }
            const mark = new Mark(root);
            mark.unmark();
            if (keywords.length !== 0) {
                mark.mark(keywords, {
                    exclude: [".theme-doc-toc-mobile > button"],
                });
            }
            // Apply any keywords to the search input so that we can clear marks in case we loaded a page with a highlight in the url
            setInputValue(keywords.join(" "));
            search.current?.autocomplete.setVal(keywords.join(" "));
        });
    }, [isBrowser, location.search, location.pathname]);
    const [focused, setFocused] = useState(false);
    const onInputFocus = useCallback(() => {
        focusAfterIndexLoaded.current = true;
        loadIndex();
        setFocused(true);
        handleSearchBarToggle?.(true);
        setTimeout(() => {
            searchBarRef.current?.select();
        }, 0);
    }, [handleSearchBarToggle, loadIndex]);
    const onInputBlur = useCallback(() => {
        setFocused(false);
        handleSearchBarToggle?.(false);
    }, [handleSearchBarToggle]);
    const onInputMouseEnter = useCallback(() => {
        loadIndex();
    }, [loadIndex]);
    const onInputChange = useCallback((event) => {
        setInputValue(event.target.value);
        if (event.target.value) {
            setInputChanged(true);
        }
    }, []);
    // Implement hint icons for the search shortcuts on mac and the rest operating systems.
    const isMac = isBrowser ? isMacPlatform() : false;
    // Sync the input value and focus state for SSR
    useEffect(() => {
        const searchBar = searchBarRef.current;
        const domValue = searchBar?.value;
        if (domValue) {
            setInputValue(domValue);
        }
        if (searchBar && document.activeElement === searchBar) {
            focusAfterIndexLoaded.current = true;
            loadIndex();
            setFocused(true);
            handleSearchBarToggle?.(true);
        }
    }, 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);
    useEffect(() => {
        if (!searchBarShortcut || !searchBarShortcutKeymap) {
            return;
        }
        const parsedKeymap = parseKeymap(searchBarShortcutKeymap);
        const handleShortcut = (event) => {
            if (matchesKeymap(event, parsedKeymap)) {
                event.preventDefault();
                searchBarRef.current?.focus();
                onInputFocus();
            }
        };
        document.addEventListener("keydown", handleShortcut);
        return () => {
            document.removeEventListener("keydown", handleShortcut);
        };
    }, [onInputFocus, searchBarShortcutKeymap]);
    const onClearSearch = useCallback(() => {
        const params = new URLSearchParams(location.search);
        params.delete(SEARCH_PARAM_HIGHLIGHT);
        const paramsStr = params.toString();
        const searchUrl = location.pathname +
            (paramsStr != "" ? `?${paramsStr}` : "") +
            location.hash;
        if (searchUrl != location.pathname + location.search + location.hash) {
            history.push(searchUrl);
        }
        // We always clear these here because in case no match was selected the above history push wont happen
        setInputValue("");
        search.current?.autocomplete.setVal("");
    }, [location.pathname, location.search, location.hash, history]);
    return (<div className={clsx("navbar__search", styles.searchBarContainer, {
            [styles.searchIndexLoading]: loading && inputChanged,
            [styles.focused]: focused,
        })} hidden={hidden} 
    // Manually make the search bar be LTR even if in RTL
    dir="ltr">
      <input placeholder={translate({
            id: "theme.SearchBar.label",
            message: "Search",
            description: "The ARIA label and placeholder for search button",
        })} aria-label="Search" className={`navbar__search-input ${styles.searchInput}`} onMouseEnter={onInputMouseEnter} onFocus={onInputFocus} onBlur={onInputBlur} onChange={onInputChange} ref={searchBarRef} value={inputValue}/>
      {askAi && AskAIWidgetComponent && (<AskAIWidgetComponent ref={askAIWidgetRef} {...askAi}>
          <span hidden></span>
        </AskAIWidgetComponent>)}
      <LoadingRing className={styles.searchBarLoadingRing}/>
      {searchBarShortcut &&
            searchBarShortcutHint &&
            (inputValue !== "" ? (<button className={styles.searchClearButton} onClick={onClearSearch}>
            ✕
          </button>) : (isBrowser &&
                searchBarShortcutKeymap && (<div className={styles.searchHintContainer}>
              {getKeymapHints(searchBarShortcutKeymap, isMac).map((hint, index) => (<kbd key={index} className={styles.searchHint}>
                    {hint}
                  </kbd>))}
            </div>)))}
    </div>);
}
