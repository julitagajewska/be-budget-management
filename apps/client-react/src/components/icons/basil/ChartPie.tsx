import IconProps from '../../../data/types/index.ts';
import getIconSize from '../../../utils/index.ts';

const ChartPie = ({ size }: IconProps) => {
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
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.25 3.78363C7.04513 4.16255 3.75 7.69647 3.75 12C3.75 16.5563 7.44365 20.25 12 20.25C14.3214 20.25 16.4185 19.2919 17.9185 17.7476L11.5286 12.5833C11.3524 12.4409 11.25 12.2265 11.25 12V3.78363ZM12.75 3.78363V11.25H20.2164C19.8597 7.29215 16.7079 4.14029 12.75 3.78363ZM20.2164 12.75H14.1212L18.8621 16.5815C19.6082 15.4664 20.0895 14.1597 20.2164 12.75ZM2.25 12C2.25 6.61522 6.61522 2.25 12 2.25C17.3848 2.25 21.75 6.61522 21.75 12C21.75 14.3212 20.9379 16.4548 19.583 18.1291C17.7968 20.3365 15.0632 21.75 12 21.75C6.61522 21.75 2.25 17.3848 2.25 12Z"
      />
    </svg>
  );
};

export default ChartPie;
