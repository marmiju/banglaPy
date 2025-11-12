import BanglaCodeRunner from "@/app/components/BanglaCodeRunner";
import ProblemSec from "@/app/components/problemSec/ProblemSec";
import { Problem_res } from "@/public/data/problems";
import { getProblem } from "@/utils/functions/GetProblem";
import { Suspense } from "react";

interface Props {
    params: { id: string }
}

const Page = async ({ params }: Props) => {
    const { id } = params

    const problem = await getProblem({ id })

    return (
        <div className="max-w-[1280px] mx-auto">
            <ProblemSec problem={problem} />
            <BanglaCodeRunner std_input={problem.sampleInput} />
        </div>
    )
}

export default Page;
