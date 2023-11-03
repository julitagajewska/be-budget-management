import React from 'react';

const PageContainer = ({ children }: React.PropsWithChildren) => {
  return <div className="react-light w-screen h-[100vh] flex flex-col bg-primary-medium">{children}</div>;
};

export default PageContainer;
