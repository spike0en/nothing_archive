import { translate } from "@docusaurus/Translate";
import { iconNoResults } from "./icons";
import styles from "./SearchBar.module.css";
export function EmptyTemplate() {
    if (process.env.NODE_ENV === "production") {
        return `<span class="${styles.noResults}"><span class="${styles.noResultsIcon}">${iconNoResults}</span><span>${translate({
            id: "theme.SearchBar.noResultsText",
            message: "No results",
        })}</span></span>`;
    }
    return `<span class="${styles.noResults}">⚠️ The search index is only available when you run docusaurus build!</span>`;
}
