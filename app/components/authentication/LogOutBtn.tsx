import { redirect } from 'next/navigation'
import React from 'react'
import { useUserContext } from '../hooks/provider/ContextApi'


const LogOutBtn = () => {
    const { setUser } = useUserContext()
    const logout = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/logout`, {
            method: 'GET',
            credentials: 'include',
        })
        if (res.status === 200) {
            setUser(null)
            return redirect('/auth/login')
        }
        alert('login failed')
    }
    return (<button className='bg-gradient-to-br from-purple-600 to-pink-700 rounded px-4 py-1 hover:bg-gradient-to-bl hover:scale-98  transition-all duration-300 cursor-pointer ' onClick={logout}>Log out</button>)
}

export default LogOutBtn