import IconProps from '../../../data/types/index.ts';
import getIconSize from '../../../utils/index.ts';

const Exchange = ({ size }: IconProps) => {
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
      <path d="M7.53033 6.53033C7.82322 6.23744 7.82322 5.76256 7.53033 5.46967C7.23744 5.17678 6.76256 5.17678 6.46967 5.46967L4.46967 7.46967C4.17678 7.76256 4.17678 8.23744 4.46967 8.53033L6.46967 10.5303C6.76256 10.8232 7.23744 10.8232 7.53033 10.5303C7.82322 10.2374 7.82322 9.76256 7.53033 9.46967L6.81066 8.75H17C17.4142 8.75 17.75 8.41421 17.75 8C17.75 7.58579 17.4142 7.25 17 7.25H6.81066L7.53033 6.53033Z" />
      <path d="M16.4697 13.4697C16.1768 13.7626 16.1768 14.2374 16.4697 14.5303L17.1893 15.25H7C6.58579 15.25 6.25 15.5858 6.25 16C6.25 16.4142 6.58579 16.75 7 16.75H17.1893L16.4697 17.4697C16.1768 17.7626 16.1768 18.2374 16.4697 18.5303C16.7626 18.8232 17.2374 18.8232 17.5303 18.5303L19.5303 16.5303C19.8232 16.2374 19.8232 15.7626 19.5303 15.4697L17.5303 13.4697C17.2374 13.1768 16.7626 13.1768 16.4697 13.4697Z" />
    </svg>
  );
};

export default Exchange;
