import { Score } from '@/utils/types/types'
import { useEffect, useState } from 'react'

export default function ScoreSection({ userId }: { userId: string }) {
  const [data, setdata] = useState<Score>()
  useEffect(() => {
    const fetchScore = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user_score/${userId}`)
      const result = await res.json()

      setdata(result)
    }
    fetchScore()
  }, [userId])
  return (
    <div className=" bg-slate-800 p-4 rounded-xl">


      {!data ? (
        <p className="text-white/60">ডেটা নেই</p>
      ) :
        <div className='flex flex-col justify-between h-[200px]'>
          <p>মোট পয়েন্ট <br/> <span
            className='text-7xl font-semibold '>{data.totalScore}</span></p>

          <p>{data.solvedCount + ` টি সমস্যা সমাধান করেছেন`}</p>

        </div>

      }
    </div>


  )
}
