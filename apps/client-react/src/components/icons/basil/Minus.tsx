import IconProps from '../../../data/types/index.ts';
import getIconSize from '../../../utils/index.ts';

const Minus = ({ size }: IconProps) => {
  const sizePX = getIconSize(size);

  return (
    <svg width="36" height="36" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 12L17 12" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
};

export default Minus;
