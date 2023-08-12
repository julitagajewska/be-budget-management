import { PropsWithChildren } from 'react';

type IconButtonProps = {
  variant?: 'transparent' | 'filled';
  shape?: 'square' | 'circle';
  color?: 'accent' | 'secondary';
  handleClick: () => void;
  justify?: 'start' | 'end' | 'between' | 'center';
  gap?: number;
};

const IconButton = ({
  children,
  variant,
  color,
  gap,
  shape,
  justify,
  handleClick,
}: PropsWithChildren<IconButtonProps>) => {
  let classesBase = `flex flex-row items-center gap-${gap} px-2 w-full transition-all duration-200 ease-in-out `;

  const classesSquare = ' rounded-md py-1 my-1 ';
  const classesCircle = ' rounded-full py-2 ';

  const classesFilled = ' bg-accent-1 hover:bg-accent-1-hover text-white py-[0.35rem]';
  const classesTransparent = ' bg-transparent hover:bg-black hover:bg-opacity-5 ';

  if (justify) classesBase += `justify-${justify}`;
  if (shape === 'circle') classesBase += classesCircle;
  if (shape === 'square') classesBase += classesSquare;

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
  color: 'secondary',
  justify: 'start',
  shape: 'square',
  gap: 2,
} as Pick<IconButtonProps, keyof IconButtonProps>;

export default IconButton;
