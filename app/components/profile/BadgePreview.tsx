'use client'

import badge_bg from '@/public/badge_bg.png'
import { Badge } from '@/utils/types/types'
import { useEffect, useState } from 'react'

export default function BadgePreview({
    badge,
    setBadge,
    userId,
    openModal
}: {
    badge: Badge[],
    setBadge: (badge: Badge[]) => void
    userId: string
    openModal: () => void
}) {


    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Fetch activities
    useEffect(() => {
        if (!userId) return;
        const getActivity = async () => {
            try {
                setIsLoading(true);
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/badge/${userId}`);
                const json = await res.json();
                setBadge(json || []);
            } catch (err) {
                console.error("Activity Fetch Error:", err);
            } finally {
                setIsLoading(false);
            }
        };

        getActivity();
    }, [userId]);


    if (isLoading) return <BadgeSkeleton />

    return (
        <div className="w-full flex  justify-center md:w-auto">

            {badge.length === 0 ? (
                <p className="text-white/60">এখনও কোন ব্যাজ নেই 😔</p>
            ) : (
                <div className='relative'>
                    {

                        <div className="max-w-[200px]  rounded-2xl" style={{ backgroundImage: `url(${badge_bg.src})` }}>
                            <div className="grid relative z-10 max-w-[200px] text-center border-2 backdrop-blur-[1px] pt-10 pb-10 text-white border-purple-600 items-center justify-center p-2 rounded-[20px]">

                                <h3 className="text-xl text-yellow-400 font-bold">{badge[badge.length - 1].name}</h3>
                                <p>{badge[0].description}</p>

                                <div className="flex justify-between text-gray-400">
                                    <p>লেভেলঃ {badge[badge.length - 1].level}</p>
                                    <p>{badge[badge.length - 1].category}</p>
                                </div>

                                {badge.length > 1 && (
                                    <button
                                        onClick={openModal}
                                        className="absolute right-[-20px] bottom-[10px] w-10 h-10 text-purple-700 border-2 border-purple-600 bg-white rounded-full"
                                    >
                                        + {badge.length - 1}
                                    </button>
                                )}
                            </div>



                        </div>
                    }
                    {
                        badge.length > 1 &&
                        <div className="max-w-[200px]   right-[-10px] z-10  absolute top-0  rounded-2xl" style={{ backgroundImage: `url(${badge_bg.src})` }}>
                            <div className="grid relative   w-[200px] text-center border-2 backdrop-blur-[1px] pt-10 pb-10 text-white border-purple-600 items-center justify-center p-2 rounded-[20px]">

                                <h3 className="text-xl text-yellow-400 font-bold">{badge[badge.length - 1].name}</h3>
                                <p>{badge[0].description}</p>

                                <div className="flex justify-between text-gray-400">
                                    <p>লেভেলঃ {badge[badge.length - 1].level}</p>
                                    <p>{badge[badge.length - 1].category}</p>
                                </div>

                                {badge.length > 1 && (
                                    <button
                                        onClick={openModal}
                                        className="absolute right-[-20px] bottom-[10px] w-10 h-10 text-purple-700 border-2 border-purple-600 bg-white rounded-full"
                                    >
                                        + {badge.length - 1}
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

export function BadgeSkeleton() {
    return (
        <div className="h-[150px] w-[200px] bg-slate-700 rounded-lg animate-pulse" />
    );
}