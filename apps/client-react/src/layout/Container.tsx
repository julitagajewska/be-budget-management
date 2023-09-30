import { PropsWithChildren } from 'react';

// Typy kontenerów
// Flex - row - justify left
// Flex - row - space between
// Flex - col - justify center
// Flex - col - space between

type Variant = 'row-start' | 'row-center' | 'row-between' | 'col-start' | 'col-center' | 'col-between';

const classes: Record<Variant, string> = {
  'row-start': 'w-full flex-row items-center justify-start',
  'row-center': 'w-full flex-row items-center justify-center',
  'row-between': 'w-full flex-row items-center justify-between',
  'col-center': 'h-full flex-col justify-center',
  'col-between': 'h-full flex-col justify-between',
  'col-start': 'flex-col justify-start',
};

type ContainerProps = {
  variant: Variant;
  styles?: string;
};

const Container = ({ children, variant, styles }: PropsWithChildren<ContainerProps>) => {
  return <div className={`flex ${classes[variant]} ${styles}`}>{children}</div>;
};

Container.defaultProps = {
  styles: '',
} as Pick<ContainerProps, keyof ContainerProps>;

export default Container;
