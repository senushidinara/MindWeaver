import React from 'react';
import { HomeIcon, PaletteIcon, MicroscopeIcon, KnightIcon, LinkIcon } from './Icons';

export type View = 'dashboard' | 'creativeStudio' | 'researchHub' | 'strategyEngine' | 'synthesisCore';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  viewName: View;
  isActive: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center w-full px-4 py-3 text-left rounded-lg transition-all duration-200 ${
      isActive
        ? 'bg-purple-600/30 text-white shadow-lg'
        : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'
    }`}
    aria-current={isActive ? 'page' : undefined}
  >
    <div className="w-6 h-6 mr-3">{icon}</div>
    <span className="font-semibold">{label}</span>
  </button>
);

interface SidebarProps {
  activeView: View;
  setActiveView: (view: View) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView }) => {
  const navItems: Omit<NavItemProps, 'isActive' | 'onClick'>[] = [
    {
      icon: <HomeIcon />,
      label: 'Dashboard',
      viewName: 'dashboard',
    },
    {
      icon: <PaletteIcon />,
      label: 'Creative Studio',
      viewName: 'creativeStudio',
    },
    {
      icon: <MicroscopeIcon />,
      label: 'Research Hub',
      viewName: 'researchHub',
    },
    {
      icon: <KnightIcon />,
      label: 'Strategy Engine',
      viewName: 'strategyEngine',
    },
    {
      icon: <LinkIcon />,
      label: 'Synthesis Core',
      viewName: 'synthesisCore',
    },
  ];

  return (
    <nav className="w-64 h-screen bg-gray-800 p-4 flex flex-col border-r border-gray-700 shadow-2xl z-40">
      <div className="mb-8 mt-2">
        <h2 className="text-xl font-bold text-center text-white">Hubs</h2>
      </div>
      <ul className="space-y-2">
        {navItems.map((item) => (
          <li key={item.viewName}>
            <NavItem
              {...item}
              isActive={activeView === item.viewName}
              onClick={() => setActiveView(item.viewName)}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;