import React from 'react';
import { Redirect } from '@docusaurus/router';

interface RedirectToLatestProps {
  data: {
    to: string;
  };
}

export default function RedirectToLatest({ data }: RedirectToLatestProps): React.JSX.Element {
  return <Redirect to={data.to} />;
}
