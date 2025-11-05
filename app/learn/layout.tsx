"use client"
import { resources } from '@/public/data/teching';
import Link from 'next/link';
import React, { useState } from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [sec, setSec] = useState<string>('')

  const handleClick = (name:string) => {
    setOpen(false)
    setSec(name)
  }


  return (
    <div className='sticky top-20'>

      {/* ---- Mobile Menu Button ---- */}
      <button
        onClick={() => setOpen(!open)}
        className="lg:hidden px-2 py-1 cursor-pointer bg-slate-600 shadow-2xl text-white fixed top-5 left-[-1] rounded-sm z-50"
      >
        {open ? "✖ Close" : "☰ Menu"}
      </button>

      {/* ---- Sidebar / Drawer (Fixed) ---- */}
      <div
        className={`
          fixed top-0 left-0 h-full w-64 border-r border-slate-500 backdrop-blur-2xl  p-4 overflow-y-auto z-40
          transform transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <h2 className="font-bold text-lg mb-4 pt-10 border-b lg:pt-0">টপিক</h2>

        <div className="flex flex-col ">
          {resources.map(res => (
            <Link
              key={res.topic}
              href={`#${res.topic}`}
              className={`px-2 py-1 hover:bg-slate-700 rounded ${sec == res.topic? 'bg-slate-600': ''}`}
              onClick={() => handleClick(res.topic)}
            >
              {`• ${res.topic}`}
            </Link>
          ))}
        </div>
      </div>

      {/* ---- Content Wrapper (Scrollable) ---- */}
      <div className="lg:ml-64 p-4 min-h-screen">
        {children}
      </div>

    </div>
  );
};

export default Layout;
