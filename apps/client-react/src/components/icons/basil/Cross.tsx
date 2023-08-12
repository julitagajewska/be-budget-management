import IconProps from '../../../data/types/index.ts';
import getIconSize from '../../../utils/index.ts';

const Cross = ({ size }: IconProps) => {
  const sizePX = getIconSize(size);

  return (
    <svg
      width={`${sizePX}`}
      height={`${sizePX}`}
      className="fill-current"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M8.46447 15.5355L15.5355 8.46446" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8.46447 8.46447L15.5355 15.5355" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
};

export default Cross;
