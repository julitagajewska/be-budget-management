import deafultPicture from '../../assets/profile/profile-default.jpg';

type SizeVariant = 2 | 4 | 6 | 8 | 10 | 12 | 20;

const classes: Record<SizeVariant, string> = {
  2: 'w-2 h-2',
  4: 'w-4 h-4',
  6: 'w-6 h-6',
  8: 'w-8 h-8',
  10: 'w-10 h-10',
  12: 'w-12 h-12',
  20: 'w-20 h-20',
};

type ProfilePictureProps = {
  size: SizeVariant;
  src: string;
};

const ProfilePicture = ({ size, src }: ProfilePictureProps) => {
  return <img src={src} alt="User's avatar" className={`rounded-full ${classes[size]}`} />;
};

ProfilePicture.defaultProps = {
  size: 10,
  src: deafultPicture,
} as Pick<ProfilePictureProps, keyof ProfilePictureProps>;

export default ProfilePicture;
