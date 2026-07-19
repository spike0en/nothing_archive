/**
 * @file MDXComponents/A/index.tsx
 * @description Theme override for anchor (link) elements rendered within MDX content.
 * 
 * Layer: Theme MDX element overrides.
 * Boundary: Wraps @docusaurus/Link and applies footnote anchor target class names.
 */

import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {useAnchorTargetClassName} from '@docusaurus/theme-common';
import type {Props} from '@theme/MDXComponents/A';

/**
 * MDXA component.
 */
export default function MDXA(props: Props): ReactNode {
  // MDX Footnotes have ids such as <a id="user-content-fn-1-953011" ...>
  const anchorTargetClassName = useAnchorTargetClassName(props.id);

  return (
    <Link {...props} className={clsx(anchorTargetClassName, props.className)} />
  );
}
