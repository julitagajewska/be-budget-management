import { useState } from 'react';
import SidebarCollapseButton from '../components/sidebar/SidebarCollapseButton.tsx';
import SidebarLeft from '../components/sidebar/SidebarLeft.tsx';
import SidebarRight from '../components/sidebar/SidebarRight.tsx';

type SidebarContainerProps = {
  side: 'left' | 'right';
};

const SidebarContainer = ({ side }: SidebarContainerProps) => {
  const [open, setOpen] = useState(false);

  const classesContainerBase = `h-screen top-0 fixed bg-transparent px-4 py-4 ${
    side === 'left' ? 'left-0' : 'right-0'
  } absolute transition-all duration-300 ease-in-out`;
  const classesContainerOpen = 'w-[12%] min-w-[14rem]';
  const classesContainerClosed = 'w-[4%] min-w-[5rem]';

  const classesSidebarBase =
    'rounded-xl shadow-2xl h-full w-full flex flex-col justify-between py-5 bg-primary-medium overflow-y-auto overflow-x-hidden';
  const classesSidebarClosed = 'px-2';
  const classesSidebarOpen = 'px-5';

  return (
    <div className={`${classesContainerBase} ${open ? classesContainerOpen : classesContainerClosed}`}>
      <div className={`${classesSidebarBase} ${open ? classesSidebarOpen : classesSidebarClosed}`}>
        <SidebarCollapseButton side={side} open={open} setOpen={setOpen} />
        {side === 'left' ? <SidebarLeft open={open} /> : <SidebarRight open={open} />}
      </div>
    </div>
  );
};

export default SidebarContainer;
