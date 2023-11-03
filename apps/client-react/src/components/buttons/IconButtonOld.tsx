import { PropsWithChildren } from 'react';

type IconButtonProps = {
  variant?: 'transparent' | 'filled';
  color?: 'primary' | 'secondary';
  handleClick: () => void;
  justify?: 'start' | 'end' | 'between';
};

const IconButton = ({ children, variant, color, justify, handleClick }: PropsWithChildren<IconButtonProps>) => {
  let classesBase = 'rounded-xl flex flex-row items-center gap-2 px-2 py-1 w-full ';
  const classesFilled = ' bg-accent-1 hover:bg-slate-300';
  const classesTransparent = ' bg-transparent hover:bg-black hover:bg-opacity-5';

  if (justify) classesBase += `justify-${justify}`;

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
  justify: 'start',
} as Pick<IconButtonProps, keyof IconButtonProps>;

export default IconButton;
