'use client'

import Image from 'next/image'
import logo from '@/public/logo2.png'
import LogOutBtn from '../authentication/LogOutBtn'
import { useEffect, useState } from 'react'
import { UserType } from '@/utils/types/types'

export default function ProfileSection({ id, isOwner }: { id: string, isOwner: boolean }) {


    const [user, setuser] = useState<UserType | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true);
    useEffect(() => {
        const getMe = async () => {
            setIsLoading(true)
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${id}`, {
                method: 'GET',
                credentials: 'include',
            })

            const data = await res.json()
            console.log("u:", data)
            setuser(data)

            setIsLoading(false)
        }
        getMe()
    }, [])

    if (isLoading) return <>wait...</>
    return (
        <div className="flex flex-col items-center justify-center  gap-3">
            <Image
                className="w-20 h-20 md:w-24 md:h-24 p-[2px] rounded-xl bg-gradient-to-b to-purple-600 from-pink-600 shadow-lg"
                src={user!.profile_picture || logo.src}
                alt={user!.username}
                width={100}
                height={100}
            />

            <div className="text-center ">
                <h3 className="text-[26px] font-bold">{user!.username}</h3>
                <p className="text-[16px] text-white/80">{user!.email}</p>
            </div>

            {isOwner && <LogOutBtn />}
        </div>
    )
}
