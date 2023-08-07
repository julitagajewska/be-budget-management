import { PropsWithChildren } from 'react';

type IconButtonProps = {
  variant?: 'transparent' | 'filled';
  color?: 'primary' | 'secondary';
  handleClick: () => void;
};

const IconButton = ({ children, variant, color, handleClick }: PropsWithChildren<IconButtonProps>) => {
  const classesBase = 'rounded-xl flex flex-row items-center justify-start gap-2 px-4 py-1 w-full';
  const classesFilled = ' bg-slate-100 hover:bg-slate-300';
  const classesTransparent = ' bg-transparent hover:bg-black hover:bg-opacity-5';

  return (
    <button
      onClick={() => handleClick()}
      className={`${classesBase} ${variant === 'filled' ? classesFilled : classesTransparent}`}
      type="button"
    >
      {children}
    </button>
  );
};

IconButton.defaultProps = {
  variant: 'filled',
  color: 'primary',
} as Pick<IconButtonProps, keyof IconButtonProps>;

export default IconButton;
