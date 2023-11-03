type ButtonProps = {
  variant?: Variant;
  iconLeft?: JSX.Element;
  iconRight?: JSX.Element;
  text: string;
  size?: Size;
};

type Variant = 'flled' | 'outlined';
type Size = 'small' | 'medium' | 'large';

const variants: Record<Variant, string> = {
  flled: 'bg-primary-700 text-text-50',
  outlined: 'bg-transparent text-text-700 outline outline-1 outline-primary-700',
};

const sizes: Record<Size, string> = {
  small: '',
  medium: '',
  large: 'w-56 px-12 py-2',
};

const baseStyles = 'px-6 py-1 rounded-full';

const Button = ({ variant, iconLeft, iconRight, text, size }: ButtonProps) => {
  const classes = `${baseStyles} ${variants[variant as Variant]} ${sizes[size as Size]}`;

  return (
    <button type="button" className={classes}>
      {iconLeft}
      {text}
      {iconRight}
    </button>
  );
};

Button.defaultProps = {
  variant: 'flled',
  size: 'medium',
} as Pick<ButtonProps, keyof ButtonProps>;

export default Button;
