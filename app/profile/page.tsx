'use client'

import { UserType } from '@/utils/types/userInterface'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import logo from '@/public/logo2.png'
import LoginUi from '../components/authentication/LoginUi'
import { redirect } from 'next/navigation'
import { useUserContext } from '../components/hooks/provider/ContextApi'
import LogOutBtn from '../components/authentication/LogOutBtn'


const ProfilePage = () => {
  const { user } = useUserContext()



  return (
    <div className="max-w-[1280px] mx-auto">
      {!user ? (
        <LoginUi />
      ) : (
        <div className='flex flex-col md:flex-row max-w-[1200px] mx-auto gap-4 p-2 justify-center items-center'>
          <Image
            className="w-16 md:w-22 h-16 md:h-22 rounded-full"
            src={user.profile_picture || logo.src}
            alt={user.username || 'profile photo'}
            width={60}
            height={60}
          />
          <div className='gap-1 flex flex-col overflow-ellipsis text-center md:text-start'>
            <h3 className='text-[24px] text-white'>{user.username}</h3>
            <h3 className='text-[16px] text-white/80 '>{user.email}</h3>
            <LogOutBtn />
          </div>


        </div>
      )}
    </div>
  )
}

export default ProfilePage
