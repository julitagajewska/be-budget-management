export type IconSize = 'small' | 'medium' | 'large'

export const iconSizes: Record<IconSize, string> = {
  small: '20px',
  medium: '24px',
  large: '36px'
};

type IconProps = {
  size?: IconSize
};

export default IconProps;
