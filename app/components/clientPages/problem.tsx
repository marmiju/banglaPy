// ClientPage.tsx
'use client';
import {  useEffect, useState } from "react";
import Modal from "@/app/components/modal/Modal";
import ProblemSec from "@/app/components/problemSec/ProblemSec";
import BanglaCodeRunner from "@/app/components/BanglaCodeRunner";
import { Problem } from "@/utils/types/userInterface";
import { getProblem } from "@/utils/functions/GetProblem";

interface Props {
    id: string
}

const ProblemPage = ({ id }: Props) => {
    const [open, setOpen] = useState(true);
    const [isloading, setIsloading] = useState(false);

    const [problem, setProblem] = useState<Problem | null>(null)

    useEffect(() => {

        const fetchProblem = async () => {
            setIsloading(true);
            const prob = await getProblem(id);
            setProblem(prob);
            setIsloading(false);
        }
        fetchProblem();
    }, [id])

    return (
        <>{
            isloading ? <div>Loading...</div>
                : problem && <><Modal open={open} onClose={() => setOpen(false)}>
                    <h2 className="text-2xl font-bold mb-4">উত্তর সমুহ</h2>

                    <div>
                        {problem?.submissions?.filter(sub => sub.isCorrect).map((sub) => (
                            <div key={sub.id} className="mb-4 p-4 border border-slate-200/50 rounded text-white bg-slate-800">
                                <pre className="whitespace-pre-wrap break-all">{sub.code}</pre>
                            </div>
                        ))}
                    </div>

                </Modal><div className="max-w-[1280px] pb-10 mx-auto">
                        <ProblemSec problem={problem} />
                        <BanglaCodeRunner problem={problem} />
                       { problem.submissions?.filter(sub=> sub.isCorrect).length 
                       && <button className=" text-white  rounded cursor-pointer underline p-2"
                        onClick={() => { setOpen(true); }}>উত্তর দেখুন</button> }
                    </div></>
        }
        </>
    );
};

export default ProblemPage;
