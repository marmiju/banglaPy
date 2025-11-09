'use client'
import { useState } from 'react'
import BanglaCodeRunner from '../components/BanglaCodeRunner'
import Sidebar from '../components/sideBar/Sidebar'
import { RiAlignItemLeftFill, RiAlignItemRightFill } from 'react-icons/ri'

const Banglapy = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative min-h-screen bg-slate-800 overflow-hidden">
      {/* Toggle Button */}
      <button
        onClick={handleToggle}
        className="fixed top-10 left-0 z-50 flex items-center space-x-2  p-2 rounded bg-slate-700 shadow-md cursor-pointer hover:scale-110 transition-transform duration-300"
      >
        {isOpen ? <RiAlignItemRightFill />  : <RiAlignItemLeftFill />} <span>history</span>
      </button>

      {/* Sidebar Drawer */}
      <div
        className={`fixed top-20 left-0 bottom-0  overflow-y-auto w-64  shadow-xl z-40 transform transition-transform duration-500 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <div
        className={`p-4 lg:p-16  transition-all duration-500 ${isOpen ? 'ml-64' : 'ml-0'}`}
      >
        <BanglaCodeRunner  height='400px'/>
      </div>
    </div>
  ); 
};

export default Banglapy;
