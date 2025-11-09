'use client'
import { UserType } from '@/utils/types/userInterface'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import logo from '@/public/logo2.png'

const page = () => {

    const [user, setUser] = useState<UserType | null>(null)
    useEffect(() => {
        const getMe = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/me`, {
                method: 'GET',
                credentials: 'include'
            })
            const user = await res.json()
            setUser(user)
        }
        getMe()
    },[])
    return (
        <div className='max-w-[1280px] mx-auto'>
            <div>
                <Image className='w-32 h-32' src={user?.profile_picture || logo.src} alt={user?.username! || 'profile photo'} width={100} height={100}/>
                <h3>{"id :"+user?.id}</h3>
                <h3>{user?.googleId}</h3>
                <h3>{user?.username}</h3>
                <h3>{user?.email}</h3>
            </div>
            
            </div>
    )
}

export default page