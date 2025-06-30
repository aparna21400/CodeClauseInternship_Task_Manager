import React, { useState } from 'react'
import { FaThLarge, FaBars, FaEnvelope, FaCheckSquare, FaCalendarAlt, FaWallet } from 'react-icons/fa';
import { FaCog } from 'react-icons/fa';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { key: 'Dashboard', icon: FaThLarge, label: 'DASHBOARD' },
    { key: 'Notification', icon: FaEnvelope, label: 'NOTIFICATION' },
    { key: 'Task', icon: FaCheckSquare, label: 'TASKS' },
    { key: 'Planning', icon: FaCalendarAlt, label: 'PLANNING' },
    { key: 'setting', icon: FaCog, label: 'SETTING' },
  ];

  return (
    <aside className={`bg-[#335C67] text-white min-h-screen ${isOpen ? 'w-48' : 'w-16'} transition-all duration-300 p-4 flex flex-col gap-8`}>
      {/* Menu icon */}
      <button aria-label='Menu' className='text-2xl' onClick={() => setIsOpen(!isOpen)}>
        <FaBars />
      </button>

      {/* Navigation links */}
      <nav className='flex flex-col gap-6 text-xs font-semibold'>
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={`flex items-center gap-2 transition-colors p-2 rounded ${
                activeTab === item.key
                  ? 'bg-white/20 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <IconComponent className='text-sm flex-shrink-0' />
              {isOpen && <span className='whitespace-nowrap'>{item.label}</span>}
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;