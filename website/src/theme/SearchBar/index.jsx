/**
 * @file SearchBar/index.jsx
 * @description Local search bar component wrapper that injects preferred docs version context.
 * 
 * Layer: Search theme overrides.
 * Boundary: Wraps SearchBar with DocsPreferredVersionContextProvider.
 */

import React from "react";
import "@easyops-cn/docusaurus-search-local/dist/client/client/utils/proxiedGenerated";
import SearchBar from "./SearchBar";
import { DocsPreferredVersionContextProvider } from "@docusaurus/plugin-content-docs/client";

/**
 * SearchBarWrapper component.
 */
export default function SearchBarWrapper(props) {
    return (<DocsPreferredVersionContextProvider>
      <SearchBar {...props}/>
    </DocsPreferredVersionContextProvider>);
}
