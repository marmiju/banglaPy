import React from 'react'

import Link from 'next/link'
import { getProblems } from '@/utils/functions/getProblems'

const page = async () => {
    // const problem = Problem_res

    const problems = await getProblems()
    console.log("problems in page:", problems);


    return (
        <div className='max-w-[90%] mx-auto  flex flex-col'>
            <p className='text-2xl my-6'>{`সমস্যার তালিকাঃ`}</p>
            {
                problems.map((prob, index) => {
                    return <div key={prob.title} className=''>
                        <Link className={`flex justify-between  hover:bg-slate-800  w-full px-4 py-2  text-white ${index % 2 == 0 ? 'bg-slate-600' : 'bg-slate-700'}`} href={`problems/${prob.id}`}
                        >
                            <p className=''> {prob.title}</p>
                            <p className='text-sm text-gray-500'>{prob.submissions?.length}</p>
                        </Link>
                    </div>
                })
            }
        </div>
    )
}

export default page
