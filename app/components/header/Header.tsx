"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

import { BiCross, BiMenu } from "react-icons/bi";
import logo from '@/public/logo.png'

const Header = () => {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen(!open);
  // bg-gradient-to-l 

  return (
    <header className="w-full text-shadow-cyan-700-800 bg-white/40 from-slate-900 backdrop-blur-sm text-white shadow-md sticky top-0 z-50">
      <div className="flex justify-between items-center max-w-6xl mx-auto px-4 py-3">
        {/* Logo Section */}
        <div>
          <Image width={50} height={50} src={logo.src} alt="suddho"/>
          {/* <h1 className="text-2xl font-bold text-indigo-200">সহজ.বাংলা</h1>
          <p className="text-sm text-white">Your gateway to Bengali programming</p> */}
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-6 text-white/80 font-medium">
          <Link href="/" className="hover:text-indigo-600 transition">হোম</Link>
          <Link href="/about" className="hover:text-indigo-600 transition">বিস্তারিত</Link>
          <Link href="/learn" className="hover:text-indigo-600 transition">শিখুন</Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={toggleMenu}
        >
          {open ? <BiCross size={28} /> : <BiMenu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <nav className="flex flex-col items-center py-4 space-y-3 text-gray-700 font-medium">
            <Link href="/" onClick={() => setOpen(false)} className="hover:text-indigo-600 transition">হোম</Link>
            <Link href="/about" onClick={() => setOpen(false)} className="hover:text-indigo-600 transition">বিস্তারিত</Link>
            <Link href="/learn" onClick={() => setOpen(false)} className="hover:text-indigo-600 transition">শিখুন</Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
