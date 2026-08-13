/**
 * @file MDXComponents/Code.tsx
 * @description Theme override for code elements rendered within MDX content, routing to inline or block elements.
 * 
 * Layer: Theme MDX element overrides.
 * Boundary: Chooses between @theme/CodeInline and @theme/CodeBlock.
 */

import type {ComponentProps, ReactNode} from 'react';
import React from 'react';
import CodeBlock from '@theme/CodeBlock';
import CodeInline from '@theme/CodeInline';
import type {Props} from '@theme/MDXComponents/Code';

function shouldBeInline(props: Props) {
  return (
    // empty code blocks have no props.children,
    // see https://github.com/facebook/docusaurus/pull/9704
    props.children !== undefined &&
    React.Children.toArray(props.children).every(
      (el) => Object.prototype.toString.call(el) === '[object String]' && !String(el).includes('\n'),
    )
  );
}

export default function MDXCode(props: Props): ReactNode {
  return shouldBeInline(props) ? (
    <CodeInline {...props} />
  ) : (
    // SAFETY: MDX Code block props component compatibility
    <CodeBlock {...(props as ComponentProps<typeof CodeBlock>)} />
  );
}
