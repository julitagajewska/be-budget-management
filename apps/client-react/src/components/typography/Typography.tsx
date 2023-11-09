import React, { ElementType, PropsWithChildren } from 'react';

type Variant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'paragraph1' | 'paragraph2' | 'helper' | 'helper' | 'caption';

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
};

const sizes: Record<Variant, string> = {
  h1: 'text-5xl sm:text-4xl font-slab',
  h2: 'text-4xl sm:text-3xl font-slab',
  h3: 'text-3xl sm:text-2xl font-slab',
  h4: 'text-2xl sm:text-1xl font-slab',
  h5: 'text-xl sm:text-lg font-slab',
  paragraph1: 'text-lg sm:text-md font-mulish',
  paragraph2: 'text-base sm:text-md font-mulish',
  helper: 'text-md sm:text-sm font-mulish',
  caption: 'text-sm sm:text-xs font-mulish',
};

type TypographyProps = {
  variant: Variant;
  bold?: boolean;
  className?: string
};

const Typography = ({ children, variant, bold, className }: PropsWithChildren<TypographyProps>) => {
  let sizeClasses = sizes[variant];
  const Tag = tags[variant];

  if (bold) sizeClasses += ' font-bold';

  return <Tag className={`${sizeClasses} ${className}`}>{children}</Tag>;
};

Typography.defaultProps = {
  bold: false,
} as Pick<TypographyProps, keyof TypographyProps>;

export default Typography;
