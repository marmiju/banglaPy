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
    <div className="relative min-h-screen bg-white overflow-hidden">
      {/* Toggle Button */}
      <button
        onClick={handleToggle}
        className="fixed top-4 left-4 z-50 border text-2xl p-2 rounded border-gray-400 bg-white shadow-md cursor-pointer hover:scale-110 transition-transform duration-300"
      >
        {isOpen ? <RiAlignItemRightFill /> : <RiAlignItemLeftFill />}
      </button>

      {/* Sidebar Drawer */}
      <div
        className={`fixed top-15 left-0 bottom-0  overflow-y-scroll w-64 bg-white shadow-xl z-40 transform transition-transform duration-500 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <div
        className={`transition-all duration-500 ${isOpen ? 'ml-64' : 'ml-0'}`}
      >
        <BanglaCodeRunner />
      </div>
    </div>
  );
};

export default Banglapy;
