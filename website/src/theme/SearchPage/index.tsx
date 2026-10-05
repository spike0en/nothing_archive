import React from 'react';
import Head from '@docusaurus/Head';
import SearchPage from '@theme-original/SearchPage';

export default function SearchPageWrapper(): React.JSX.Element {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex,follow,noai,noimageai" />
      </Head>
      <SearchPage />
    </>
  );
}
