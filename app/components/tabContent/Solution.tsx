import { Problem } from '@/utils/types/types'
import Image from 'next/image'
import React from 'react'
import logo2 from '../../../public/logo2.png'
interface Props {
    prob: Problem
}

const Solution = ({ prob }: Props) => {
    return (
        <div className='space-y-4'>
            {
                prob.submissions?.filter(sub => sub.isCorrect).map((sub) => (
                    <div key={sub.id} className='grid bg-slate-800 p-2 rounded'>
                        <div className='flex h-10 items-center mb-1'>
                            <Image className='rounded' width={40} height={40} src={sub.user?.profile_picture || logo2} alt={'banglapy'} />
                            <span className='text-white ml-2'>{sub.user?.username || 'অজানা ব্যবহারকারী'}</span>
                        </div>
                        <pre className='p-2 bg-slate-600 rounded'>{sub.code}</pre>

                    </div>
                ))
            }

        </div>
    )
}

export default Solution