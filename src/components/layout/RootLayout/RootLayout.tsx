import type { JSX } from 'react';

import Sidebar from '../Sidebar';

const RootLayout = ({ children }: { children: JSX.Element }) => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen relative">
      <Sidebar />
      <div className="flex-grow">{children}</div>
    </div>
  );
};

export default RootLayout;
