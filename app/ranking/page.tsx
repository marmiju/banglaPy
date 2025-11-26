'use client'

import { useEffect, useState } from "react";
import Image from "next/image";
import { useUserContext } from "../components/hooks/provider/ContextApi";
import logo2 from "../../public/logo2.png";
import Link from "next/link";
import { Score } from "@/utils/types/types";
import { div } from "framer-motion/client";

const Ranking = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [ranking, setRanking] = useState<Score[] | null>([]);
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);

    // New Filters
    const [sortBy, setSortBy] = useState("score_desc");
    const [minSolved, setMinSolved] = useState("");
    const [maxSolved, setMaxSolved] = useState("");
    const [minScore, setMinScore] = useState("");
    const [maxScore, setMaxScore] = useState("");

    const { user } = useUserContext();

    const fetchRanking = async () => {

        const params = new URLSearchParams({
            page: String(page),
            limit: String(limit),
            search: searchTerm,
            sortBy,
            minSolved,
            maxSolved,
            minScore,
            maxScore
        });

        setLoading(true)

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/ranking?${params.toString()}`,
            { credentials: "include" }
        );

        const data = await res.json();
        console.log(data)
        setRanking(data.rank || []);
        setTotalPages(data.totalPages || 1);
        setLoading(false)
    };

    useEffect(() => {
        fetchRanking();
    }, [page, sortBy]);

    useEffect(() => {
        setPage(1);
        fetchRanking();
    }, [searchTerm, minSolved, maxSolved, minScore, maxScore]);

    return (
        <div className="max-w-6xl mx-auto p-4 mb-32">
            <h2 className='text-3xl font-bold mb-6'>🏆 লিডারবোর্ড</h2>

            {/* Search */}
            <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className=" mt-3 p-2 rounded w-full bg-slate-800"
                placeholder="ইউজারনেম বা ইমেইল দিয়ে খুঁজুন..."
            />

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">

                {/* Sort */}
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className=" p-2 rounded bg-slate-800"
                >
                    <option value="score_desc">পয়েন্ট (অধিক → কম)</option>
                    <option value="score_asc">পয়েন্ট (কম → অধিক)</option>
                    <option value="solved_desc">সমাধান (অধিক → কম)</option>
                    <option value="solved_asc">সমাধান (কম → অধিক)</option>
                </select>

                {/* Min Solved */}
                <input
                    type="number"
                    value={minSolved}
                    onChange={(e) => setMinSolved(e.target.value)}
                    className=" p-2 rounded bg-slate-800"
                    placeholder="সর্বনিম্ন সমাধান"
                />

                {/* Max Solved */}
                <input
                    type="number"
                    value={maxSolved}
                    onChange={(e) => setMaxSolved(e.target.value)}
                    className=" p-2 rounded bg-slate-800"
                    placeholder="সর্বোচ্চ সমাধান"
                />

                {/* Min Score */}
                <input
                    type="number"
                    value={minScore}
                    onChange={(e) => setMinScore(e.target.value)}
                    className=" p-2 rounded bg-slate-800"
                    placeholder="সর্বনিম্ন পয়েন্ট"
                />
                {/* Second row filters */}

                <input
                    type="number"
                    value={maxScore}
                    onChange={(e) => setMaxScore(e.target.value)}
                    className="bg-slate-800 p-2 rounded"
                    placeholder="সর্বোচ্চ পয়েন্ট"
                />

            </div>


            {/* Table */}
            {
                loading ? <div className="w-full h-44 animate-pulse bg-slate-800 my-10"> </div>
                    :
                    <table className="w-full mt-6 border-collapse">
                        <thead>
                            <tr className="bg-slate-800 text-white">
                                <th className="p-3">র‍্যাংক</th>
                                <th className="p-3">ইউজার</th>
                                <th className="p-3 text-center">সমাধান</th>
                                <th className="p-3 text-center">পয়েন্ট</th>
                            </tr>
                        </thead>

                        <tbody>
                            {ranking!.map((item, index) => (
                                <tr key={item.id} className="border-b border-slate-700">

                                    <td className="p-3">{((page - 1) * limit) + index + 1}</td>

                                    <td className="p-1 flex items-center justify-center gap-3">
                                        <Link href={`/u/${item.userId}`}
                                            className="flex space-x-2  items-center max-w-44  md:w-[200px]"
                                        >
                                            <Image
                                                src={item.user?.profile_picture || logo2}
                                                width={40}
                                                height={40}
                                                className="rounded-sm "
                                                alt="profile"
                                            />
                                            <span>
                                                {item.user?.username}
                                                {item.userId === user?.id ? " (আপনি)" : ""}
                                            </span></Link>
                                    </td>

                                    <td className="text-center p-3">{item.solvedCount}</td>
                                    <td className="text-center p-3 font-bold">{item.totalScore}</td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
            }


            {/* Pagination */}
            <div className="flex justify-center mt-6 gap-3">
                <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className="px-4 py-2 bg-slate-700 rounded disabled:opacity-50"
                >
                    পূর্ববর্তী
                </button>

                <span className="px-4 py-2 bg-slate-800 rounded text-white">
                    পেজ {page} / {totalPages}
                </span>

                <button
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                    className="px-4 py-2 bg-slate-700 rounded disabled:opacity-50"
                >
                    পরবর্তী
                </button>
            </div>
        </div>
    );
};

export default Ranking;
