'use client'

import { UserType } from '@/utils/types/userInterface'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import logo from '@/public/logo2.png'

const ProfilePage = () => {
  const [user, setUser] = useState<UserType | null>(null)

  useEffect(() => {
    const getMe = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/me`, {
          method: 'GET',
          credentials: 'include',
          redirect: 'manual',
        })

        if (res.status === 200) {
          const data = await res.json()
          setUser(data)
        } else if (res.status === 302 || res.status === 301) {
          const redirectURL = res.headers.get('Location') || '/'
          window.location.href = redirectURL
        } else {
          window.location.href = '/'
        }
      } catch (err) {
        console.error(err)
        window.location.href = '/'
      }
    }

    getMe()
  }, [])

  const logout = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/logout`, {
      method: 'GET',
      credentials: 'include',
    })
    const result = await res.json()
    console.log(result)
  }

  return (
    <div className="max-w-[1280px] mx-auto">
      <div>
        <Image
          className="w-32 h-32"
          src={user?.profile_picture || logo.src}
          alt={user?.username || 'profile photo'}
          width={100}
          height={100}
        />
        <h3>id: {user?.id}</h3>
        <h3>{user?.googleId}</h3>
        <h3>{user?.username}</h3>
        <h3>{user?.email}</h3>

        <button onClick={logout}>Log out</button>
      </div>
    </div>
  )
}

export default ProfilePage
