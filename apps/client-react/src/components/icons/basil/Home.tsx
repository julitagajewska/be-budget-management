import IconProps from '../../../data/types/index.ts';
import getIconSize from '../../../utils/index.ts';

const Home = ({ size }: IconProps) => {
  const sizePX = getIconSize(size);

  return (
    <svg width={`${sizePX}`} height={`${sizePX}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.5578 5.53423C12.6873 4.69887 11.3127 4.69887 10.4422 5.53423L5.81574 9.97357C5.70239 10.0823 5.62614 10.224 5.5978 10.3785C5.04367 13.4004 5.00277 16.494 5.47681 19.5295L5.58933 20.25H8.56579V14.0387C8.56579 13.6244 8.90158 13.2887 9.31579 13.2887H14.6842C15.0984 13.2887 15.4342 13.6244 15.4342 14.0387V20.25H18.4107L18.5232 19.5295C18.9972 16.494 18.9563 13.4004 18.4022 10.3785C18.3739 10.224 18.2976 10.0823 18.1843 9.97357L13.5578 5.53423ZM9.40363 4.45191C10.8546 3.05965 13.1454 3.05965 14.5964 4.45191L19.2228 8.89125C19.5634 9.21804 19.7925 9.64373 19.8776 10.108C20.4621 13.2956 20.5053 16.559 20.0052 19.7609L19.8245 20.9184C19.7497 21.3971 19.3374 21.75 18.8529 21.75H14.6842C14.27 21.75 13.9342 21.4142 13.9342 21V14.7887H10.0658V21C10.0658 21.4142 9.73 21.75 9.31579 21.75H5.14706C4.66258 21.75 4.25029 21.3971 4.17554 20.9184L3.99478 19.7609C3.49473 16.559 3.53788 13.2956 4.12241 10.108C4.20754 9.64373 4.43662 9.21804 4.77719 8.89125L9.40363 4.45191Z"
        fill="black"
      />
    </svg>
  );
};

export default Home;
