// ClientPage.tsx
'use client';
import { useEffect, useState } from "react";
import Modal from "@/app/components/modal/Modal";
import ProblemSec from "@/app/components/problemSec/ProblemSec";
import BanglaCodeRunner from "@/app/components/BanglaCodeRunner";
import { Problem } from "@/utils/types/types";
import { getProblem } from "@/utils/functions/GetProblem";
import Solution from "../tabContent/Solution";
import Loading from "@/app/loading";

interface Props {
    id: string
}

const ProblemPage = ({ id }: Props) => {
    const [open, setOpen] = useState(false);
    const [isloading, setIsloading] = useState(false);
    const [index, setindex] = useState<number>(0)
    const [problem, setProblem] = useState<Problem | null>(null)

    const tabcontent = [<Solution key={0} prob={problem!}/>]

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
            isloading ? <Loading/>
                : problem && <><Modal open={open} onClose={() => setOpen(false)}>
                    <h2 className="text-2xl font-bold mb-4">উত্তর সমুহ</h2>

                    <div>
                        {problem?.submissions?.filter(sub => sub.isCorrect).map((sub) => (
                            <div key={sub.id} className="mb-4 p-4 border border-slate-200/50 rounded text-white bg-slate-800">
                                <pre className="whitespace-pre-wrap break-all">{sub.code}</pre>
                            </div>
                        ))}
                    </div>

                </Modal><div className="max-w-[1280px]  mx-auto">
                        <ProblemSec problem={problem} />
                        <BanglaCodeRunner problem={problem} />
                        {/* {problem.submissions?.filter(sub => sub.isCorrect).length
                            && <button className=" text-white  rounded cursor-pointer underline p-2"
                                onClick={() => { setOpen(true); }}>উত্তর দেখুন</button>} */}
                    </div>
                    {/* additional section */}
                    {/* tab bar */}
                    <div className="flex p-2 mb-2  mx-auto max-w-[400px] flex-wrap overflow-x-auto whitespace-nowrap  justify-center items-center rounded-[14px] border-slate-200/60 mt-10 gap-4   text-white ">
                        <button className={`${index === 0 ? 'bg-white text-black ' : ''} px-6 border rounded-[6px] border-white/20 cursor-pointer`} onClick={() => { setindex(0) }}>সমাধান</button>

                    </div>

                    <div className="max-w-6xl mb-8 bg-slate-900/90 mx-auto border border-slate-600 p-4 rounded-2xl">
                        {tabcontent[index]}
                    </div>
                </>
        }

        </>
    );
};

export default ProblemPage;
