"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getProblems } from "@/utils/functions/getProblems";

interface Problem {
    id: string;
    title: string;
    submissions?: any[];
}

const page = () => {
    const [problems, setProblems] = useState<Problem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProblems = async () => {
            const prob = await getProblems()
            setProblems(prob);
            setLoading(false);
        };

        fetchProblems();
    }, []);

    if (loading) {
        return <p className="text-center py-10 text-gray-400">Loading...</p>;
    }

    return (
        <div className="max-w-[90%] mx-auto flex flex-col">
            <p className="text-2xl my-6">সমস্যার তালিকাঃ</p>

            {problems.map((prob, index) => (
                <div key={prob.id}>
                    <Link
                        className={`flex justify-between hover:bg-slate-800 w-full px-4 py-2 text-white ${index % 2 == 0 ? "bg-slate-600" : "bg-slate-700"
                            }`}
                        href={`/problems/${prob.id}`}
                    >
                        <p>{prob.title}</p>
                        <p className="text-sm text-gray-400">{prob.submissions?.length}</p>
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default page
