'use client'

import Image from 'next/image'
import logo from '@/public/logo2.png'
import LoginUi from '../components/authentication/LoginUi'
import { useUserContext } from '../components/hooks/provider/ContextApi'
import LogOutBtn from '../components/authentication/LogOutBtn'
import { useEffect, useState } from 'react'
import { Badge } from '@/utils/types/types'
import badge_bg from '@/public/badge_bg.png'
import Modal from '../components/modal/Modal'


const ProfilePage = () => {
  const { user } = useUserContext()
  const [badges, setBadges] = useState<Badge[] | null>(null)

  const [isOpean, setisopen] = useState(false)

  //  Fetch badges function
  console.log("profile User", user)
  console.log("User id from profile", user?.id)
  // Fetch badges
  const fetchBadges = async () => {
    if (!user?.id) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/badge/${user.id}`, {
        cache: 'no-store'
      })
      const data = await res.json()
      setBadges(data)
    } catch (error) {
      console.error("Failed to load badges", error)
    }
  }

  // ✔️ Call only after redirect + 2 seconds delay
  useEffect(() => {
    if (!user?.id) return;

    const timer = setTimeout(() => {
      fetchBadges();
    }, 2000);

    return () => clearTimeout(timer);
  }, [user]);





  return (
    <div className="max-w-[1280px] mx-auto p-4">
      {!user ? (
        <LoginUi />
      ) : (
        <div className='flex flex-col md:flex-row max-w-[1200px] mx-auto gap-6 p-4 justify-center md:justify-start items-center text-white'>

          {/* Profile Section */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <Image
              className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-purple-400 shadow-lg"
              src={user.profile_picture || logo.src}
              alt={user.username || 'profile photo'}
              width={100}
              height={100}
            />

            <div className='text-center md:text-left'>
              <h3 className='text-[26px] font-bold'>{user.username}</h3>
              <p className='text-[16px] text-white/80'>{user.email}</p>
            </div>

            <LogOutBtn />
          </div>


          {/* Badge Section */}
          <div className="w-full md:w-auto">
            <h2 className="text-xl font-bold mb-2 text-center md:text-left">🎖️ অর্জিত ব্যাজ</h2>

            {/* badge section */}
            {!badges ? (
              <p className='text-white/60'>লোডিং হচ্ছে</p>
            ) : badges.length === 0 ? (
              <p className='text-white/60'>এখনও কোন ব্যাজ অর্জিত হয়নি 😔</p>
            ) : (
              <div
                className='max-w-[200px]'
                style={{
                  backgroundImage: `url(${badge_bg.src})`

                }}>
                <div
                  className="grid relative max-w-[200px] text-center border-2 backdrop-blur-[1px]  pt-10 pb-10 text-white border-purple-600 items-center justify-center p-2 rounded-[20px]">

                  <h3 className=' text-xl text-yellow-400 font-bold stroke-1 stroke-amber-600'>{badges[0].name}</h3>
                  <p>{badges[0].description}</p>
                  <div className='flex justify-between'>
                    <p className='text-gray-400'>{`লেভেলঃ ${badges[0].level}`}</p>
                    <p className='text-gray-400'>{badges[0].category}</p>
                  </div>
                  {
                    badges.length > 1 && <button
                      onClick={() => { setisopen(true) }}
                      className='absolute cursor-pointer right-[-20px] bottom-[10px] w-10 h-10 text-purple-700 border-2 border-purple-600  bg-white rounded-full '
                    >{badges.length > 1 ? `+ ${badges.length - 1} ` : ''}</button>
                  }
                </div>
              </div>
            )}
            <Modal open={isOpean} onClose={() => setisopen(false)}>
              <div
                className="
      grid
      grid-cols-1
      sm:grid-cols-2
      md:grid-cols-3
      gap-4
      max-h-[70vh]
      overflow-y-auto
      p-4
    "
              >
                {badges && badges.map(badge => (
                  <div
                    key={badge.id}
                    style={{ backgroundImage: `url(${badge_bg.src})` }}
                    className="border-2 border-y-sky-700 border-x-purple-600 rounded-2xl"
                  >
                    <div className="grid text-center backdrop-blur-[1px] pt-10 pb-10 text-white p-2 rounded-[20px]">
                      <h3 className="text-xl text-yellow-400 font-bold truncate">{badge.name}</h3>
                      <p>{badge.description}</p>
                      <p className="text-gray-400">লেভেলঃ {badge.level}</p>
                      <p className="text-gray-400">{badge.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Modal>


          </div>

        </div>
      )}
    </div>
  )


}

export default ProfilePage


