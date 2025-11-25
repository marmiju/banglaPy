import { Learned } from '@/utils/types/types'
import { useEffect, useState } from 'react'

const LearnedSection = ({ userId }: { userId: string }) => {
    const [data, setData] = useState<Learned[]>([])
    const [loading, setloading] = useState(false)

    useEffect(() => {
        const fetchLearned = async () => {
            setloading(true)
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/learned/${userId}`)
            const json = await res.json()
            setData(json)
            setloading(false)
        }
        fetchLearned()
    }, [userId])


    const color = [
        'bg-red-600',
        'bg-yellow-600',
        'bg-pink-600',
        'bg-green-600',
        'bg-purple-600'
    ]


    return (
        <>
            {
                loading ? <LearnedSkeleton />
                    : <div className='bg-slate-800 rounded-xl  p-4'>
                        <h3 className='text-yellow-500'>যেসব টপিক শিখেছেন</h3>
                        <div className=' h-44 flex flex-wrap  overflow-auto gap-2'>
                            {
                                data.map(item => {
                                    const n = color[Math.round(Math. random() * color.length -1 )]
                                    console.log(n)
                                    
                                    return (
                                        <h3 key={item.id} className={`px-2 border flex items-center  border-slate-600/80 rounded ${n} `}>{item.res.topic}</h3>
                                    )
                                })
                            }
                        </div>
                    </div>
            }
        </>
    )
}

export default LearnedSection

export const LearnedSkeleton = () => {
    return (
        <div className='w-full h-44 rounded-xl animate-pulse bg-slate-800'>

        </div>
    )
}