import React from "react";
import "@easyops-cn/docusaurus-search-local/dist/client/client/utils/proxiedGenerated";
import SearchBar from "./SearchBar";
import { DocsPreferredVersionContextProvider } from "@docusaurus/plugin-content-docs/client";
export default function SearchBarWrapper(props) {
    return (<DocsPreferredVersionContextProvider>
      <SearchBar {...props}/>
    </DocsPreferredVersionContextProvider>);
}
