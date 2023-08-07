import IconProps from '../../../data/types/index.ts';
import getIconSize from '../../../utils/index.ts';

const Bag = ({ size }: IconProps) => {
  const sizePX = getIconSize(size);

  return (
    <svg width={`${sizePX}`} height={`${sizePX}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.25 6.63098V5.4612C7.25 4.59495 7.88374 3.85906 8.7404 3.73056L9.96032 3.54757C11.3125 3.34474 12.6875 3.34474 14.0397 3.54757L15.2596 3.73056C16.1163 3.85906 16.75 4.59495 16.75 5.4612V6.63098L18.464 6.76933C19.7764 6.87527 20.847 7.86341 21.0574 9.16313C21.5226 12.0357 21.5226 14.9643 21.0574 17.8369C20.847 19.1366 19.7764 20.1247 18.464 20.2307L16.5921 20.3818C13.5357 20.6285 10.4643 20.6285 7.40787 20.3818L5.53595 20.2307C4.22357 20.1247 3.15303 19.1366 2.94255 17.8369C2.47736 14.9643 2.47736 12.0357 2.94255 9.16313C3.15303 7.86341 4.22357 6.87527 5.53596 6.76933L7.25 6.63098ZM10.1828 5.03098C11.3875 4.85027 12.6125 4.85027 13.8172 5.03098L15.0371 5.21396C15.1595 5.23232 15.25 5.33745 15.25 5.4612V6.5258C13.0851 6.40233 10.9149 6.40233 8.75 6.5258V5.4612C8.75 5.33745 8.84053 5.23232 8.96291 5.21396L10.1828 5.03098ZM7.52856 8.11337C10.5047 7.87314 13.4953 7.87314 16.4714 8.11337L18.3433 8.26447C18.9675 8.31485 19.4766 8.78479 19.5767 9.40292C19.6391 9.78785 19.6926 10.1738 19.7372 10.5606C14.8596 12.9624 9.14038 12.9624 4.26278 10.5606C4.30743 10.1738 4.36092 9.78785 4.42326 9.40292C4.52336 8.78479 5.03249 8.31485 5.65664 8.26447L7.52856 8.11337ZM4.12889 12.1567C9.12829 14.4304 14.8717 14.4304 19.8711 12.1567C19.9664 13.9728 19.8683 15.7966 19.5767 17.5971C19.4766 18.2152 18.9675 18.6852 18.3433 18.7355L16.4714 18.8866C13.4953 19.1269 10.5047 19.1269 7.52856 18.8866L5.65664 18.7355C5.03249 18.6852 4.52336 18.2152 4.42326 17.5971C4.13169 15.7966 4.03356 13.9728 4.12889 12.1567Z"
        fill="black"
      />
    </svg>
  );
};

export default Bag;
