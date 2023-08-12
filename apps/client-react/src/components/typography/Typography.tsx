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
  h1: 'text-5xl sm:text-4xl',
  h2: 'text-4xl sm:text-3xl',
  h3: 'text-3xl sm:text-2xl',
  h4: 'text-2xl sm:text-1xl',
  h5: 'text-xl sm:text-lg',
  paragraph1: 'text-lg sm:text-md',
  paragraph2: 'text-base sm:text-md',
  helper: 'text-md sm:text-sm',
  caption: 'text-sm sm:text-xs',
};

type TypographyProps = {
  variant: Variant;
  bold?: boolean;
  styles?: string;
};

const Typography = ({ children, variant, bold, styles }: PropsWithChildren<TypographyProps>) => {
  let sizeClasses = sizes[variant];
  const Tag = tags[variant];

  if (bold) sizeClasses += ' font-bold';

  return <Tag className={`${sizeClasses} ${styles}`}>{children}</Tag>;
};

Typography.defaultProps = {
  bold: false,
} as Pick<TypographyProps, keyof TypographyProps>;

export default Typography;
