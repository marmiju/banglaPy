import React from 'react'
import BanglaCodeRunner from '../components/BanglaCodeRunner'
import ProblemSec from '../components/problemSec/ProblemSec'
import { Problem_res } from '@/public/data/problems'

const page = () => {
    const problem = Problem_res
    return (
        <div className='max-w-[90%] mx-auto'>
            {
                problem.map(prob => {
                    return <div key={prob.title}>
                        <ProblemSec problem={prob} />
                        <BanglaCodeRunner std_input={String(prob.sample.input)}/>
                    </div>
                })
            }
        </div>
    )
}

export default page