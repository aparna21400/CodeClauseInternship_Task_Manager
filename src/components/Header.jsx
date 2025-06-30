import React from 'react';

const Header = () => {
  return (
    <header className="flex items-center justify-between bg-[#335C67] p-4 rounded shadow mb-6">
      <h2 className="text-xl font-semibold text-white">Task Manager</h2>
      <div className="text-sm text-[#FFF3B0]">Welcome back, Aparna!</div>
    </header>
  );
};

export default Header;
