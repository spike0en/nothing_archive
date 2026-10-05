import React from 'react';
import Head from '@docusaurus/Head';
import { Redirect, useLocation } from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';

/** Client-side route redirect component for Docusaurus dynamic routes. */
export default function RedirectToLatest({ data }: { data: { to: string } }): React.JSX.Element {
  const canonicalUrl = useBaseUrl(data.to, { absolute: true });
  const { search, hash } = useLocation();

  return (
    <>
      <Head>
        <meta name="robots" content="noindex,follow,noai,noimageai" />
        <link rel="canonical" href={canonicalUrl} />
      </Head>
      <main>
        <p>
          Redirecting to the latest changelog.{' '}
          <a href={data.to}>Open the latest changelog</a>
        </p>
      </main>
      <Redirect to={`${data.to}${search}${hash}`} />
    </>
  );
}
