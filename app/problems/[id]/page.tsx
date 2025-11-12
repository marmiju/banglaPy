import BanglaCodeRunner from "@/app/components/BanglaCodeRunner";
import ProblemSec from "@/app/components/problemSec/ProblemSec";
import { getProblem } from "@/utils/functions/GetProblem";

interface Props {
    params: { id: string }
}

const Page = async ({ params }: Props) => {
    const { id } = params

    const problem = await getProblem({ id })

    return (
        <div className="max-w-[1280px] mx-auto">
            
            <ProblemSec problem={problem} />
            <BanglaCodeRunner problem={problem} />
        </div>
    )
}

export default Page;
