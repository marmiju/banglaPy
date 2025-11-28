import { Submission } from '@/utils/types/types'
import { useEffect, useState } from 'react'

export default function SubmissionsSection({ userId }: { userId: string }) {
  const [data, setData] = useState<Submission[] | null>(null)
  useEffect(() => {
    const getSubmision = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/submission/${userId}`)
      const result = await res.json()
      console.log(result)
      setData(result)
    }
    getSubmision()
  }, [])

  return (
    <div className="bg-slate-800 p-4 rounded-xl">
      <h2 className="text-xl font-bold mb-2">💻 সাবমিশন হিস্টোরি</h2>

      {!data || data.length === 0 ? (
        <p className="text-white/60">কোন সাবমিশন নেই</p>
      ) : (
        <ul className="space-y-3">
          {data.map(sub => (
            <li key={sub.id} className={`text-white border p-2 grid grid-cols-2  rounded-md border-white/10 bg-slate-700/40`}>
              <p className='text-xl'> প্রবলেমঃ {sub.problem?.title}</p>
              <p className='text-gray-400 '> {sub.score}</p>
              <p className={`${sub.isCorrect ? 'text-green-600':'text-red-600'}`}> {sub.isCorrect ? '✅ Correct' : '❌ Wrong'}</p>
              <p className='text-gray-400 '>Date: {new Date(sub.created_at).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
