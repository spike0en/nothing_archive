/**
 * @file MDXComponents/Li.tsx
 * @description Theme override for list item (li) elements rendered within MDX content.
 * 
 * Layer: Theme MDX element overrides.
 * Boundary: Collects footnote anchor links and applies target class names.
 */

import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import useBrokenLinks from '@docusaurus/useBrokenLinks';
import {useAnchorTargetClassName} from '@docusaurus/theme-common';
import type {Props} from '@theme/MDXComponents/Li';

/**
 * MDXLi component.
 */
export default function MDXLi(props: Props): ReactNode | undefined {
  // MDX Footnotes have ids such as <li id="user-content-fn-1-953011">
  useBrokenLinks().collectAnchor(props.id);
  const anchorTargetClassName = useAnchorTargetClassName(props.id);

  return (
    <li className={clsx(anchorTargetClassName, props.className)} {...props} />
  );
}
