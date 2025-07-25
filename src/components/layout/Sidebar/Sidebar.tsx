import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';

import { navigationItems } from './constants';

const Sidebar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const isActiveRoute = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className="hidden md:flex flex-col min-h-screen bg-black text-white transition-all duration-300 relative z-10 shadow-xl"
        style={{ width: isCollapsed ? '4rem' : '16rem' }}
      >
        {/* Header */}
        <div className="flex items-center justify-center h-16 bg-black border-b border-brown relative">
          <h1 className="text-xl font-bold text-brown">{!isCollapsed ? 'KUDWA' : 'K'}</h1>

          {/* Toggle Button */}
          <button
            onClick={toggleSidebar}
            className={classNames('absolute p-1 text-brown hover:text-yellow transition-colors duration-200', {
              'right-2': !isCollapsed,
              'right-1': isCollapsed,
            })}
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isCollapsed ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              )}
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-6 space-y-2">
          <div className={classNames('mb-6 px-1', { invisible: isCollapsed })}>
            <h2 className="px-3 text-xs font-semibold text-brown uppercase tracking-wider">Navigation</h2>
          </div>

          {navigationItems.map((item) => {
            const isActive = isActiveRoute(item.path);

            return (
              <div key={item.path} className="relative group">
                <Link
                  to={item.path}
                  className={`flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive ? 'bg-blue text-white shadow-lg' : 'text-brown hover:bg-blue/20 hover:text-white'
                  } ${isCollapsed ? 'justify-center' : ''}`}
                  title={isCollapsed ? item.name : ''}
                >
                  <span
                    className={`flex-shrink-0 transition-colors duration-200 ${
                      // eslint-disable-next-line sonarjs/no-duplicate-string
                      isActive ? 'text-white' : 'text-brown'
                    } ${!isCollapsed ? 'mr-3' : ''}`}
                  >
                    {item.icon}
                  </span>

                  {!isCollapsed && (
                    <>
                      <span className="truncate">{item.name}</span>
                      {isActive && <div className="ml-auto w-2 h-2 bg-yellow rounded-full animate-pulse" />}
                    </>
                  )}

                  {isCollapsed && isActive && (
                    <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-yellow rounded-full" />
                  )}
                </Link>

                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-brown text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                    {item.name}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-black border-t border-brown shadow-lg z-30 w-screen">
        <div className="flex items-center justify-around h-16">
          {navigationItems.map((item) => {
            const isActive = isActiveRoute(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center flex-1 py-1 text-xs font-medium transition-colors ${
                  isActive ? 'text-white' : 'text-brown hover:text-white'
                }`}
              >
                <div className={`mb-1 ${isActive ? 'text-white' : 'text-brown'}`}>{item.icon}</div>
                <span className="truncate max-w-full px-2 text-[10px]">{item.name}</span>
                {isActive && <div className="mt-1 w-1.5 h-1.5 bg-yellow rounded-full animate-pulse" />}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
