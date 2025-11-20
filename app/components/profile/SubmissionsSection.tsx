import { Submission } from '@/utils/types/types'

export default function SubmissionsSection({ data }: { data?: Submission[] }) {
  return (
    <div className="border p-4 rounded-xl bg-black/20">
      <h2 className="text-xl font-bold mb-2">💻 সাবমিশন হিস্টোরি</h2>

      {!data || data.length === 0 ? (
        <p className="text-white/60">কোন সাবমিশন নেই</p>
      ) : (
        <ul className="space-y-3">
          {data.map(sub => (
            <li key={sub.id} className="border p-2 rounded-md border-white/10 bg-black/10">
              <p>Problem: {sub.problemId}</p>
              <p>Score: {sub.score}</p>
              <p>Status: {sub.isCorrect ? '✔️ Correct' : '❌ Wrong'}</p>
              <p>Date: {new Date(sub.created_at).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
