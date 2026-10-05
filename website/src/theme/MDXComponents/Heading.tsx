/**
 * @file MDXComponents/Heading.tsx
 * @description Theme override for section heading elements (h1-h6) rendered within MDX content.
 * 
 * Layer: Theme MDX element overrides.
 * Boundary: Delegates rendering directly to @theme/Heading.
 */

import React, {type ReactNode} from 'react';
import Heading from '@theme/Heading';
import useBrokenLinks from '@docusaurus/useBrokenLinks';
import type {Props} from '@theme/MDXComponents/Heading';

/**
 * MDXHeading component.
 */
export default function MDXHeading({as, id, ...props}: Props): ReactNode {
  const brokenLinks = useBrokenLinks();
  if (as === 'h1' && id) {
    brokenLinks.collectAnchor(id);
    return <h1 {...props} id={id} />;
  }
  return <Heading as={as} id={id} {...props} />;
}
