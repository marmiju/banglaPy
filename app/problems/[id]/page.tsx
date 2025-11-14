import BanglaCodeRunner from "@/app/components/BanglaCodeRunner";
import ProblemSec from "@/app/components/problemSec/ProblemSec";
import { getProblem } from "@/utils/functions/GetProblem";
import { Suspense } from "react";

interface Props {
    params: { id: string }
}

const Page = async ({ params }: Props) => {
    const { id } = params

    const problem = await getProblem({ id })

    return (
        <Suspense fallback={<p className="text-center py-10 text-gray-400">Loading...</p>}>

            <div className="max-w-[1280px] mx-auto">

                <ProblemSec problem={problem} />
                <BanglaCodeRunner problem={problem} />
            </div>
        </Suspense>
    )
}

export default Page;
