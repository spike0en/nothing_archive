/**
 * @file RedirectToLatest.tsx
 * @description Helper component that performs a client-side route redirect 
 * to the specified target destination path.
 * 
 * Layer: Navigation & routing helpers.
 * Boundary: Wraps Docusaurus @docusaurus/router Redirect component.
 */

import React from 'react';
import { Redirect } from '@docusaurus/router';

interface RedirectToLatestProps {
  data: {
    to: string;
  };
}

/**
 * RedirectToLatest component.
 * 
 * @param props Contains the target URL destination string.
 */
export default function RedirectToLatest({ data }: RedirectToLatestProps): React.JSX.Element {
  return <Redirect to={data.to} />;
}
