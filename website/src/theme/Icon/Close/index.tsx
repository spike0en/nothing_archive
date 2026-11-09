import React, { type ReactNode } from 'react';
import type { Props } from '@theme/Icon/Close';
import { FaTimes } from 'react-icons/fa';

export default function IconClose({
  width = 14,
  className,
  color,
  ...restProps
}: Props): ReactNode {
  const iconSize = Number(width) || 14;
  return (
    <FaTimes
      size={iconSize}
      color={color}
      className={className}
      {...restProps}
    />
  );
}
