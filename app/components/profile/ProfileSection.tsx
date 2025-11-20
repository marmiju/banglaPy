'use client'

import Image from 'next/image'
import logo from '@/public/logo2.png'
import { UserType } from '@/utils/types/types'
import LogOutBtn from '../authentication/LogOutBtn'

export default function ProfileSection({ user }: { user: UserType }) {
    return (
        <div className="flex flex-col items-center md:items-start gap-3">

            <Image
                className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-purple-400 shadow-lg"
                src={user.profile_picture || logo.src}
                alt={user.username}
                width={100}
                height={100}
            />

            <div className="text-center md:text-left">
                <h3 className="text-[26px] font-bold">{user.username}</h3>
                <p className="text-[16px] text-white/80">{user.email}</p>
            </div>

            <LogOutBtn />
        </div>
    )
}
