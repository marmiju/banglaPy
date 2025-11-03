import React from 'react'
import BanglaCodeRunner from '../components/BanglaCodeRunner'
import ProblemSec from '../components/problemSec/ProblemSec'
import { Problem_res } from '@/public/data/problems'
import Link from 'next/link'

const page = () => {
    const problem = Problem_res
    return (
        <div className='max-w-[90%] mx-auto'>
            <p className='text-2xl'>{`সমস্যার তালিকাঃ`}</p>
            {
                problem.map((prob,index)=> {
                    return <div key={prob.title} className='m-4'>
                        <Link href={`problems/${index}`}
                        >
                        <p  className='bg-white rounded w-full p-2 text-black'> {prob.title}</p>
                        </Link>
                    </div>
                })
            }
        </div>
    )
}

export default page

{/* <ProblemSec problem={prob} />
                        <BanglaCodeRunner std_input={String(prob.sample.input)}/> */}