import React from 'react';
import { Redirect } from '@docusaurus/router';

/** Client-side route redirect component for Docusaurus dynamic routes. */
export default function RedirectToLatest({ data }: { data: { to: string } }): React.JSX.Element {
  return <Redirect to={data.to} />;
}
