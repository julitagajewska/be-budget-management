/* eslint-disable react/jsx-no-useless-fragment */
import { ReactNode } from 'react';
import Typography from '../typography/Typography.tsx';

// Variants
// Icon only
// Icon + Text - left
// Icon + Text - center
// Color: transparent, filled

type LayoutVariant = 'icon-only' | 'icon-only-large' | 'icon-text-left' | 'icon-text-center';
type FillVariant = 'transparent' | 'filled';
type ColorVariant = 'accent-1' | 'accent-2' | 'accent-3' | 'neutral';
type ShapeVariant = 'square' | 'circle';

const layoutClasses: Record<LayoutVariant, string> = {
  'icon-only': 'w-5 h-5 flex flex-row items-center justify-center',
  'icon-only-large': 'w-7 h-7 flex flex-row items-center justify-center',
  'icon-text-left': 'w-full flex flex-row items-center justify-start gap-2 px-2',
  'icon-text-center': 'flex flex-row items-center justify-center gap-2 px-2',
};

const fillClasses: Record<FillVariant, string> = {
  transparent: 'bg-opacity-0 hover:bg-opacity-10',
  filled: 'bg-opacity-100 text-white',
};

const colorClasses: Record<ColorVariant, string> = {
  'accent-1': 'bg-accent-1 hover:bg-accent-1-hover',
  'accent-2': 'bg-accent-2 hover:bg-accent-2-hover',
  'accent-3': 'bg-accent-3 hover:bg-accent-3-hover',
  'neutral': 'bg-neutral hover:bg-neutral-hover',
};

const shapeClasses: Record<ShapeVariant, string> = {
  square: 'rounded-md py-1 my-1',
  circle: 'rounded-full py-2',
};

type IconButtonProps = {
  layout: LayoutVariant;
  fill: FillVariant;
  color: ColorVariant;
  shape: ShapeVariant;
  handleClick: () => void;
  icon?: ReactNode;
  text?: string;
};

const IconButton = ({ layout, fill, color, shape, handleClick, icon, text }: IconButtonProps) => {
  const classesBase = 'transition-all duration-200 ease-in-out ';

  return (
    <button
      onClick={() => handleClick()}
      className={`${classesBase} ${layoutClasses[layout]} ${fillClasses[fill]} ${colorClasses[color]} ${shapeClasses[shape]}`}
      type="button"
    >
      {icon}
      {layout !== 'icon-only' && layout !== 'icon-only-large' ? (
        <Typography variant="helper" styles="truncate text-elipsis">
          {text}
        </Typography>
      ) : (
        <></>
      )}
    </button>
  );
};

IconButton.defaultProps = {
  layout: 'icon-text-left',
  fill: 'transparent',
  color: 'neutral',
  shape: 'square',
} as Pick<IconButtonProps, keyof IconButtonProps>;

export default IconButton;
