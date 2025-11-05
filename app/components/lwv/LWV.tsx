'use client';
import React, { Suspense } from 'react'
import BanglaCodeRunner from '../BanglaCodeRunner'

import { Quiz } from '@/public/data/teching';
import QuizSection from '../quiz/QuizSection';
import Markdown from '../markdown/Markdown';

interface props {
    explaination: string
    source?: string
    code?: string
    quiz:Quiz[]
}


const LWV = ({ source, code, explaination, quiz }: props) => {
  return (
    <div>
      <Markdown content={explaination}/>

      <div className='flex flex-col md:flex-row mt-4 gap-2'>
        <Suspense fallback={<div>Waiting for Video</div>}>
          {source && (
            <iframe
            className='w-full rounded h-80 md:h-96 bg-slate-600 p-2'
            src={`https://www.youtube.com/embed/${source}`}
            allowFullScreen
            ></iframe>
          )}
        </Suspense>
        {code && <BanglaCodeRunner src_code={code} />}
      </div>
        {quiz && <QuizSection quiz={quiz} />} 
    </div>
  )
}


export default LWV
