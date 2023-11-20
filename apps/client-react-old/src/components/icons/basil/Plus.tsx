import IconProps from '../../../data/types/index.ts';
import getIconSize from '../../../utils/index.ts';

const Plus = ({ size }: IconProps) => {
  const sizePX = getIconSize(size);

  return (
    <svg width={`${sizePX}`} height={`${sizePX}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 17V7" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M7 12L17 12" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
};

export default Plus;
