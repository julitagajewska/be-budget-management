import IconProps, { IconSize, iconSizes } from '../../data/types/icons/types.ts';

const IconWrapper = ({ size, children }: React.PropsWithChildren<IconProps>) => {
  const sizePX = iconSizes[size as IconSize];

  return (
    <svg width={`${sizePX}`} height={`${sizePX}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {children}
    </svg>
  )
};

IconWrapper.defaultProps = {
  size: 'small'
} as Pick<IconProps, keyof IconProps>;

export default IconWrapper;
