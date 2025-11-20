import { Learned } from '@/utils/types/types'

export default function LearnedSection({ data }: { data?: Learned[] }) {
    return (
        <div className="border p-4 rounded-xl bg-black/20">
            <h2 className="text-xl font-bold mb-2">📘 শেখা রিসোর্স</h2>

            {!data || data.length === 0 ? (
                <p className="text-white/60">এখনও কিছু শেখা হয়নি</p>
            ) : (
                <ul className="space-y-2">
                    {data.map(item => (
                        <li key={item.id} className="border-b border-white/10 pb-1">
                            Resource ID: { }
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
