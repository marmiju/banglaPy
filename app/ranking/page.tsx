'use client';

import { Score } from "@/utils/types/userInterface";
import { useEffect, useMemo, useState } from "react";
import logo2 from '../../public/logo2.png';
import Image from "next/image";
import { useUserContext } from "../components/hooks/provider/ContextApi";

const Ranking = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [ranking, setRanking] = useState<Score[] | null>(null);
    const [sortBy, setSortBy] = useState("score"); // score | solved | recent

    const {user} = useUserContext()

    useEffect(() => {
        const fetchRanking = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/ranking`, {
                method: "GET",
                credentials: "include",
            });
            const data = await res.json();
            setRanking(data.rank || []);
        };
        fetchRanking();
    }, []);

    // 🔥 Filter + Search + Sort (computed)
    const filteredRanking = useMemo(() => {
        if (!ranking) return [];

        let result = [...ranking];

        // 🔍 SEARCH
        if (searchTerm.trim()) {
            const lower = searchTerm.toLowerCase();
            result = result.filter(item =>
                item.user?.username.toLowerCase().includes(lower) ||
                item.user?.email.toLowerCase().includes(lower)
            );
        }

        // 🔽 SORT OPTIONS
        if (sortBy === "score") {
            result = result.sort((a, b) => b.totalScore - a.totalScore);
        }
        if (sortBy === "solved") {
            result = result.sort((a, b) => b.solvedCount - a.solvedCount);
        }
        if (sortBy === "recent") {
            result = result.sort(
                (a, b) =>
                    new Date(b.lastUpdated).getTime() -
                    new Date(a.lastUpdated).getTime()
            );
        }

        return result;
    }, [ranking, searchTerm, sortBy]);

    return (
        <div className="max-w-6xl mx-auto p-4 mb-32">
            <h2 className='text-3xl font-bold mb-6'>🏆 লিডারবোর্ড</h2>

            {/* 🔍 Search + Filter Row */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">

                {/* SEARCH BAR */}
                <input
                    name="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border border-white/30 bg-transparent p-2 rounded-full w-full md:w-1/2"
                    type="text"
                    placeholder="ইউজারনেম বা ইমেইল দিয়ে খুঁজুন..."
                />
            
     

                {/* FILTER DROPDOWN */}
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-white/30 bg-transparent p-2 rounded-xl"
                >
                    <option className="text-black" value="score">বেশি পয়েন্ট অর্জন</option>
                    <option className="text-black" value="solved">বেশি সমস্যা সমাধান করা</option>
                    <option className="text-black" value="recent">সর্বশেষ সমাধান করা</option>
                </select>
            </div>

            {/* TABLE */}
            <table className="w-full mt-8 table-auto border-collapse">
                <thead>
                    <tr className="bg-slate-800 text-white">
                        <th className="p-3 text-left truncate overflow-hidden whitespace-nowrap max-w-[60px] sm:max-w-none">র‍্যাংক</th>
                        <th className="p-3 text-left truncate overflow-hidden whitespace-nowrap max-w-[60px] sm:max-w-none">ইউজার</th>
                        <th className="p-3 text-center truncate overflow-hidden whitespace-nowrap max-w-[60px] sm:max-w-none">সমাধান</th>
                        <th className="p-3 text-center truncate overflow-hidden whitespace-nowrap max-w-[60px] sm:max-w-none">পয়েন্ট</th>
                        <th className="p-3 text-center truncate overflow-hidden whitespace-nowrap max-w-[60px] sm:max-w-none">শেষ সমাধান</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredRanking.length === 0 && (
                        <tr>
                            <td colSpan={5} className="text-center p-6 opacity-70">
                                No matching users found...
                            </td>
                        </tr>
                    )}

                    {filteredRanking.map((item, index) => (
                        <tr

                            key={item.id}
                            className={`border-b border-slate-700 hover:bg-slate-900 transition
                                ${index === 0 ? ' text-orange-600'
                                     : ''
                                
                                }
                                `}
                        >
                            <td className="p-3 font-bold">{index + 1 == 1 ? '🏆': "#" + `${index+1}`}</td>

                            <td className="p-3 flex items-center gap-3">
                                <Image
                                    width={100}
                                    height={100}
                                    src={item.user?.profile_picture || logo2}
                                    alt={item.user?.username || "profile photo"}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <span className="truncate overflow-hidden whitespace-nowrap max-w-[60px] sm:max-w-none">{item.user?.username + `${user?.id === item.userId ? ' (আপনি)' : ''}`}</span>
                            </td>

                            <td className="p-3 text-center truncate overflow-hidden whitespace-nowrap max-w-[60px] sm:max-w-none">{item.solvedCount}</td>
                            <td className="p-3 text-center font-bold truncate overflow-hidden whitespace-nowrap max-w-[60px] sm:max-w-none">{item.totalScore}</td>

                            <td className="p-3 text-center text-sm opacity-70">
                                {new Date(item.lastUpdated).toLocaleDateString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Ranking;
