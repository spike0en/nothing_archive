/**
 * @file SearchBar/SuggestionTemplate.js
 * @description HTML string renderer for individual search autocomplete suggestion items.
 * 
 * Layer: Search theme overrides.
 * Boundary: Formats document titles, headings, and AskAI prompts for autocomplete.js dropdown.
 */

import { SearchDocumentType, } from "@easyops-cn/docusaurus-search-local/dist/client/shared/interfaces";
import { concatDocumentPath } from "@easyops-cn/docusaurus-search-local/dist/client/client/utils/concatDocumentPath";
import { escapeHtml } from "@easyops-cn/docusaurus-search-local/dist/client/client/utils/escapeHtml";
import { getStemmedPositions } from "@easyops-cn/docusaurus-search-local/dist/client/client/utils/getStemmedPositions";
import { highlight } from "@easyops-cn/docusaurus-search-local/dist/client/client/utils/highlight";
import { highlightStemmed } from "@easyops-cn/docusaurus-search-local/dist/client/client/utils/highlightStemmed";
import { explicitSearchResultPath } from "@easyops-cn/docusaurus-search-local/dist/client/client/utils/proxiedGenerated";
import { iconAction, iconAskAI, iconContent, iconHeading, iconTitle, iconTreeInter, iconTreeLast, } from "./icons";
import styles from "./SearchBar.module.css";

/**
 * SuggestionTemplate component returning formatted HTML strings for individual search results.
 */
export function SuggestionTemplate({ document, type, page, metadata, tokens, isInterOfTree, isLastOfTree, }) {
    if (type === SearchDocumentType.AskAI) {
        return [
            `<span class="${styles.hitIcon}">${iconAskAI}</span>`,
            `<span class="${styles.hitWrapper}">`,
            `<span class="${styles.hitTitle}">Ask AI: <mark>${escapeHtml(tokens.join(" "))}</mark></span>`,
            `</span>`,
        ].join("");
    }
    const isTitle = type === SearchDocumentType.Title;
    const isKeywords = type === SearchDocumentType.Keywords;
    const isTitleRelated = isTitle || isKeywords;
    const isHeading = type === SearchDocumentType.Heading;
    const tree = [];
    if (isInterOfTree) {
        tree.push(iconTreeInter);
    }
    else if (isLastOfTree) {
        tree.push(iconTreeLast);
    }
    const treeWrapper = tree.map((item) => `<span class="${styles.hitTree}">${item}</span>`);
    const icon = `<span class="${styles.hitIcon}">${isTitleRelated ? iconTitle : isHeading ? iconHeading : iconContent}</span>`;
    const wrapped = [
        `<span class="${styles.hitTitle}">${isKeywords
            ? highlight(document.s, tokens)
            : highlightStemmed(document.t, getStemmedPositions(metadata, "t"), tokens)}</span>`,
    ];
    const needsExplicitHitPath = !isInterOfTree && !isLastOfTree && explicitSearchResultPath;
    if (needsExplicitHitPath) {
        const pathItems = page
            ? page.b
                ?.concat(page.t)
                .concat(!document.s || document.s === page.t ? [] : document.s)
            : document.b;
        wrapped.push(`<span class="${styles.hitPath}">${concatDocumentPath(pathItems ?? [])}</span>`);
    }
    else if (!isTitleRelated) {
        wrapped.push(`<span class="${styles.hitPath}">${highlight(page.t ||
            // Todo(weareoutman): This is for EasyOps only.
            // istanbul ignore next
            (document.u.startsWith("/docs/api-reference/")
                ? "API Reference"
                : ""), tokens)}</span>`);
    }
    const action = `<span class="${styles.hitAction}">${iconAction}</span>`;
    return [
        ...treeWrapper,
        icon,
        `<span class="${styles.hitWrapper}">`,
        ...wrapped,
        "</span>",
        action,
    ].join("");
}
