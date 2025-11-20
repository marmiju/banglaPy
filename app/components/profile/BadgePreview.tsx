'use client'

import badge_bg from '@/public/badge_bg.png'
import { UserType } from '@/utils/types/types'

export default function BadgePreview({
    user,
    openModal
}: {
    user: UserType
    openModal: () => void
}) {
    return (
        <div className="w-full flex  justify-center md:w-auto">
           

            {!user.badge ? (
                <p className="text-white/60">লোডিং হচ্ছে...</p>
            ) : user.badge.length === 0 ? (
                <p className="text-white/60">এখনও কোন ব্যাজ নেই 😔</p>
            ) : (
                <div className='relative'>
                    {

                        <div className="max-w-[200px]  rounded-2xl" style={{ backgroundImage: `url(${badge_bg.src})` }}>
                            <div className="grid relative z-10 max-w-[200px] text-center border-2 backdrop-blur-[1px] pt-10 pb-10 text-white border-purple-600 items-center justify-center p-2 rounded-[20px]">

                                <h3 className="text-xl text-yellow-400 font-bold">{user.badge[user.badge.length - 1].name}</h3>
                                <p>{user.badge[0].description}</p>

                                <div className="flex justify-between text-gray-400">
                                    <p>লেভেলঃ {user.badge[user.badge.length - 1].level}</p>
                                    <p>{user.badge[user.badge.length - 1].category}</p>
                                </div>

                                {user.badge.length > 1 && (
                                    <button
                                        onClick={openModal}
                                        className="absolute right-[-20px] bottom-[10px] w-10 h-10 text-purple-700 border-2 border-purple-600 bg-white rounded-full"
                                    >
                                        + {user.badge.length - 1}
                                    </button>
                                )}
                            </div>



                        </div>
                    }
                    {
                        user.badge.length > 1 &&
                        <div className="max-w-[200px]   right-[-10px] z-10  absolute top-0  rounded-2xl" style={{ backgroundImage: `url(${badge_bg.src})` }}>
                            <div className="grid relative   w-[200px] text-center border-2 backdrop-blur-[1px] pt-10 pb-10 text-white border-purple-600 items-center justify-center p-2 rounded-[20px]">

                                <h3 className="text-xl text-yellow-400 font-bold">{user.badge[user.badge.length - 1].name}</h3>
                                <p>{user.badge[0].description}</p>

                                <div className="flex justify-between text-gray-400">
                                    <p>লেভেলঃ {user.badge[user.badge.length - 1].level}</p>
                                    <p>{user.badge[user.badge.length - 1].category}</p>
                                </div>

                                {user.badge.length > 1 && (
                                    <button
                                        onClick={openModal}
                                        className="absolute right-[-20px] bottom-[10px] w-10 h-10 text-purple-700 border-2 border-purple-600 bg-white rounded-full"
                                    >
                                        + {user.badge.length - 1}
                                    </button>
                                )}
                            </div>
                        </div>
                    }
                </div>
            )}
        </div>
    )
}
