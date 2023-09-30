import { Dispatch, SetStateAction } from 'react';
import { CaretLeft, CaretRight } from '../icons/basil/index.ts';

type SidebarCollapseButtonProps = {
  side: 'left' | 'right';
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const SidebarCollapseButton = ({ side, open, setOpen }: SidebarCollapseButtonProps) => {
  const classesBase =
    'absolute top-32 z-50 transition-all duration-500 ease-in-out bg-primary-light hover:bg-primary-light shadow-md rounded-full';

  if (side === 'left') {
    return (
      <button type="button" onClick={() => setOpen(!open)} className={`right-1 ${classesBase}`}>
        <div className={`${open ? 'rotate-0' : 'rotate-180'} px-1 py-1 rounded-full`}>
          <CaretLeft />
        </div>
      </button>
    );
  }

  return (
    <button type="button" onClick={() => setOpen(!open)} className={`left-1 ${classesBase}`}>
      <div className={`${open ? 'rotate-0' : 'rotate-180'} px-1 py-1 rounded-full`}>
        <CaretRight />
      </div>
    </button>
  );
};

export default SidebarCollapseButton;
