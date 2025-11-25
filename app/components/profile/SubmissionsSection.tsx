import { Submission } from '@/utils/types/types'
import { useEffect, useState } from 'react'

export default function SubmissionsSection({ userId }: { userId:string }) {
  const [data,setData] = useState<Submission[]|null>(null)
  useEffect(()=>{
    const getSubmision = async()=>{
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/submission/${userId}`)
      const result = await res.json()
      setData(result)
    }
    getSubmision()
  },[])

  return (
    <div className="bg-slate-800 p-4 rounded-xl">
      <h2 className="text-xl font-bold mb-2">💻 সাবমিশন হিস্টোরি</h2>

      {!data || data.length === 0 ? (
        <p className="text-white/60">কোন সাবমিশন নেই</p>
      ) : (
        <ul className="space-y-3">
          {data.map(sub => (
            <li key={sub.id} className={`${sub.isCorrect ? 'text-green-500':'text-red-500'} border p-2 grid grid-cols-2  rounded-md border-white/10 bg-slate-700/40`}>
              <p className='text-xl '>Score: {sub.score}</p>
              <p className='text-gray-400 text-sm'>Problem: {sub.problemId}</p>
              <p>status: {sub.isCorrect ? '✅ Correct' : '❌ Wrong'}</p>
              <p className='text-gray-400 text-sm'>Date: {new Date(sub.created_at).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
