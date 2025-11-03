import BanglaCodeRunner from "@/app/components/BanglaCodeRunner";
import ProblemSec from "@/app/components/problemSec/ProblemSec";
import { Problem_res } from "@/public/data/problems";

interface Props {
    params: { id: string }
}

const Page = ({ params }: Props) => {
    const { id} = params
    const problems = Problem_res
    return <div className="max-w-[1280px] mx-auto">
        <ProblemSec problem={problems[Number(id)]} />
        <BanglaCodeRunner std_input={String(problems[Number(id)].sample.input)} />

    </div>
}

export default Page;
