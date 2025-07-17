import type { JSX } from 'react';

import Sidebar from '../Sidebar';

const RootLayout = ({ children }: { children: JSX.Element }) => {
  return (
    <div className="flex flex-row min-h-screen relative">
      <Sidebar />
      {children}
    </div>
  );
};

export default RootLayout;
