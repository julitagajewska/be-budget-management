import React, { ElementType, PropsWithChildren } from 'react';

type Variant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'paragraph1'
  | 'paragraph2'
  | 'helper'
  | 'helper'
  | 'caption'
  | 'caption2';

const tags: Record<Variant, ElementType> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  paragraph1: 'p',
  paragraph2: 'p',
  helper: 'span',
  caption: 'span',
  caption2: 'span',
};

const sizes: Record<Variant, string> = {
  h1: 'text-5xl sm:text-4xl',
  h2: 'text-4xl sm:text-3xl',
  h3: 'text-3xl sm:text-2xl',
  h4: 'text-2xl sm:text-1xl',
  h5: 'text-xl sm:text-lg',
  paragraph1: 'text-lg sm:text-md',
  paragraph2: 'text-md',
  helper: 'text-sm',
  caption: 'text-xs',
  caption2: 'text-[10px]',
};

type TypographyProps = {
  variant: Variant;
  bold?: boolean;
  styles?: string;
};

const Typography = ({ children, variant, bold, styles }: PropsWithChildren<TypographyProps>) => {
  let sizeClasses = sizes[variant];
  const Tag = tags[variant];

  if (bold) sizeClasses += ' font-semibold';

  return <Tag className={`${sizeClasses} ${styles}`}>{children}</Tag>;
};

Typography.defaultProps = {
  bold: false,
} as Pick<TypographyProps, keyof TypographyProps>;

export default Typography;
