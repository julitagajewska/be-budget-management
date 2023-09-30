import Typography from '../typography/Typography.tsx';

type SidebarDividerProps = {
  text: string;
  open: boolean;
};

const SidebarDivider = ({ text, open }: SidebarDividerProps) => {
  return (
    <div>
      {open ? (
        <Typography variant="helper">{text}</Typography>
      ) : (
        <div className="h-[2px] w-7 bg-neutral rounded-full" />
      )}
    </div>
  );
};

export default SidebarDivider;
