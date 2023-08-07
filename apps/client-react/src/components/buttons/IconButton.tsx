type IconButtonProps = {
  variant?: 'transparent' | 'filled';
  color?: 'primary' | 'secondary';
  icon: JSX.Element;
  text?: string;
  handleClick: () => void;
};

const IconButton = ({ variant, color, icon, text, handleClick }: IconButtonProps) => {
  return (
    <button
      onClick={() => handleClick()}
      className="bg-slate-500 rounded-xl flex flex-row items-center justify-start gap-2 px-4 py-1 "
      type="button"
    >
      {icon}
      {text}
    </button>
  );
};

IconButton.defaultProps = {
  variant: 'filled',
  color: 'primary',
} as Pick<IconButtonProps, keyof IconButtonProps>;

export default IconButton;
