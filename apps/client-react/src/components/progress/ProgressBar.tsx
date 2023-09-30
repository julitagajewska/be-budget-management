type ProgressBarProps = {
  value: number;
};

const ProgressBar = ({ value }: ProgressBarProps) => {
  return (
    <div className="relative w-full pb-[8px]">
      <div className="absolute w-full bg-accent-1 opacity-20 h-1 rounded-full" />
      <div className="absolute bg-accent-1 opacity-70 h-1 rounded-full" style={{ width: `${value}%` }} />
    </div>
  );
};

ProgressBar.defaultProps = {
  value: 50,
} as Pick<ProgressBarProps, keyof ProgressBarProps>;

export default ProgressBar;
