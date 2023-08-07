import { PropsWithChildren } from 'react';

type SidebarProps = {
  side: 'left' | 'right';
};

const Sidebar = ({ side, children }: PropsWithChildren<SidebarProps>) => {
  return (
    <div
      className={`w-[12%] min-w-[14rem] h-screen top-0 fixed bg-transparent px-4 py-4 ${
        side === 'left' ? 'left-0' : 'right-0'
      }`}
    >
      <div className=" rounded-xl shadow-2xl h-full w-full flex flex-col justify-between p-5">{children}</div>
    </div>
  );
};

export default Sidebar;
