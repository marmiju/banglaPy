'use client'
import Image from 'next/image'
import React from 'react'
import logo from '@/public/logo2.png'
import { AiFillGoogleCircle } from 'react-icons/ai'

const handleAuth = async () => {
    window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/google`;
}

    const Login = () => {
        return (
            <div className='max-w-[1280px] mx-auto h-[90svh] flex justify-center items-center text-center'>
                <div className=' border border-slate-600 p-10 space-y-10 bg-slate-900 rounded-2xl '>
                    <div className='flex flex-col  justify-center items-center'>
                        <Image
                            src={logo.src}
                            alt='banglaPy'
                            width={100}
                            height={100}
                        />
                        <h1 className='text-2xl'>লগইন</h1>
                        <p className='text-sm text-slate-400'>বাংলা পাইয়ে লগইন করো।</p>
                    </div>

                    <button onClick={handleAuth} className='mt-1 p-2 border w-full border-black text-black bg-white cursor-pointer rounded-[5px] flex items-center justify-center gap-2 '>< AiFillGoogleCircle /> <span>গুগল দিয়ে লগইন করুন</span></button>
                </div>
            </div>
        )
    }

    export default Login