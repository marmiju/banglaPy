"use client";
import { Hind_Siliguri } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React, {  useEffect, useState } from "react";
import logo2 from '@/public/logo2.png'


import { BiMenu } from "react-icons/bi";
import { RxCrossCircled } from "react-icons/rx";
import { useUserContext } from "../hooks/provider/ContextApi";

const hindsiliguri = Hind_Siliguri({
  weight: ['300', '400', '500', '700', '600']
})


const Header = () => {
  const [open, setOpen] = useState(false);
  const { user, setUser } = useUserContext();

  const toggleMenu = () => setOpen(!open);

  useEffect(() => {
    const getMe = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/me`, {
        method: 'GET',
        credentials: 'include',
      })
      if (res.status === 200) {
        const data = await res.json()
        setUser(data)
      }
    }
    getMe()
  }, [])

  return (
    <header className="w-full   text-shadow-cyan-700-800  from-slate-900 backdrop-blur-sm text-white shadow-md  top-0 z-50">
      <div className="flex  justify-between items-center max-w-6xl mx-auto px-4 py-3">
        {/* Logo Section */}


        <Link href={'/'} className="flex  top-0 flex-row items-center">
          <Image className="w-12 h-12 " width={100} height={100}
            src={logo2} alt="bangla-py logo" />
          <h1 className={`text-2xl  font-bold text-white  ${hindsiliguri.className}`}>বাংলা-পাই</h1>
        </Link>


        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-6 items-center text-white/80 font-medium">
          <Link href="/" className="hover:text-blue-200 transition">হোম</Link>
          <Link href="/about" className="hover:text-blue-200 transition">বিস্তারিত</Link>
          <Link href="/learn" className="hover:text-blue-200 transition">শিখুন</Link>
          <Link href="/game" className="hover:text-blue-200 transition">গেম</Link>
          <Link href="/problems" className="hover:text-blue-200 transition">চ্যালেঞ্জ</Link>
          <Link href={'/profile'}>
            {/* profile */}
            <Image
              className=" sticky top-5 right-5  bg-gradient-to-bl from-blue-700 to-pink-600 p-[2px] rounded-full"
              src={user?.profile_picture! || logo2.src} alt="profilephoto" height={40} width={40} />
          </Link>

        </nav>




        {/* Mobile Menu Button */}
        <div className="md:hidden flex gap-4">
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMenu}
          >
            {open ? <RxCrossCircled size={28} /> : <BiMenu size={28} />}
          </button>
          <Link href={'/profile'}>
            <Image
              className="   bg-gradient-to-bl from-blue-700 to-pink-600 p-[2px] rounded-full"
              src={user?.profile_picture! || logo2.src} alt="profilephoto" height={32} width={32} />
          </Link>
        </div>
      </div>


      {/* Mobile Dropdown Menu */}
      {open && (
        <div className="md:hidden  text-white border-t  shadow-lg">
          <nav className="flex flex-col items-center w-full justify-center  py-4 space-y-3  font-medium">
            <Link href="/" onClick={() => setOpen(false)} className="hover:text-indigo-600 transition">হোম</Link>
            <Link href="/about" onClick={() => setOpen(false)} className="hover:text-indigo-600 transition">বিস্তারিত</Link>
            <Link href="/learn" onClick={() => setOpen(false)} className="hover:text-indigo-600 transition">শিখুন</Link>
            <Link href="/game" onClick={() => setOpen(false)} className="hover:text-indigo-600 transition">গেম</Link>
            <Link href="/problems" onClick={() => setOpen(false)} className="hover:text-indigo-600 transition">চ্যালেঞ্জ</Link>
          </nav>
        </div>

      )}

    </header>
  );
};

export default Header;
