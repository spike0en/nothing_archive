/**
 * @file MDXComponents/Img/index.tsx
 * @description Theme override for image elements rendered within MDX content, applying async decoding and lazy loading.
 * 
 * Layer: Theme MDX element overrides.
 * Boundary: Controls rendering and styling of img tags.
 */

import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import type {Props} from '@theme/MDXComponents/Img';

import styles from './styles.module.css';

function transformImgClassName(className?: string): string {
  return clsx(className, styles.img);
}

export default function MDXImg(props: Props): ReactNode {
  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <img
      decoding="async"
      loading="lazy"
      {...props}
      className={transformImgClassName(props.className)}
    />
  );
}
