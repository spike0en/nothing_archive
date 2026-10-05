import React from 'react';
import Head from '@docusaurus/Head';
import NotFound from '@theme-original/NotFound';

export default function NotFoundWrapper(): React.JSX.Element {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex,follow,noai,noimageai" />
      </Head>
      <NotFound />
    </>
  );
}
