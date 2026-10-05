import React from 'react';
import Head from '@docusaurus/Head';
import { Redirect, useLocation } from '@docusaurus/router';

/** Client-side route redirect component for Docusaurus dynamic routes. */
export default function RedirectToLatest({ data }: { data: { to: string } }): React.JSX.Element {
  const { search, hash } = useLocation();
  return (
    <>
      <Head>
        <meta name="robots" content="noindex,follow,noai,noimageai" />
      </Head>
      <Redirect to={`${data.to}${search}${hash}`} />
    </>
  );
}
