import React from 'react';
import { Redirect, useLocation } from '@docusaurus/router';

/** Client-side route redirect component for Docusaurus dynamic routes. */
export default function RedirectToLatest({ data }: { data: { to: string } }): React.JSX.Element {
  const { search, hash } = useLocation();
  return <Redirect to={`${data.to}${search}${hash}`} />;
}
