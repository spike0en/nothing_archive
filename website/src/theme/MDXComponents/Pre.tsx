/**
 * @file MDXComponents/Pre.tsx
 * @description Theme override for preformatted text (pre) elements rendered within MDX content.
 * 
 * Layer: Theme MDX element overrides.
 * Boundary: Pass-through wrapper for fenced code block children.
 */

import React, {type ReactNode} from 'react';
import type {Props} from '@theme/MDXComponents/Pre';

/**
 * MDXPre component.
 */
export default function MDXPre(props: Props): ReactNode | undefined {
  // With MDX 2, this element is only used for fenced code blocks
  // It always receives a MDXComponents/Code as children
  return <>{props.children}</>;
}
