type IconButtonProps = {
  icon: JSX.Element;
};

const IconButton = ({ icon }: IconButtonProps) => {
  return (
    <button type="button" className="px-1 py-1 rounded-full hover:bg-gray-100 transition-all duration-150 ease-in-out">
      {icon}
    </button>
  );
};

export default IconButton;
