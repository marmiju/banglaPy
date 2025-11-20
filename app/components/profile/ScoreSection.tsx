import { Score } from '@/utils/types/types'

export default function ScoreSection({ data }: { data?: Score[] }) {
  return (
    <div className="border p-4 rounded-xl bg-black/20">
      <h2 className="text-xl font-bold mb-2">🏆 স্কোর</h2>

      {!data || data.length === 0 ? (
        <p className="text-white/60">ডেটা নেই</p>
      ) : (
        <ul className="space-y-2">
          {data.map(score => (
            <li key={score.id} className="border-b border-white/10 pb-2">
              <p>Total Score: {score.totalScore}</p>
              <p>Solved: {score.solvedCount}</p>
              <p>Updated: {new Date(score.lastUpdated).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
