import React from 'react'
import Markdown from '../markdown/Markdown'
import { Problem } from '@/utils/types/userInterface'


const ProblemSec = ({ problem }: { problem: Problem }) => {
   console.log(problem);
   return (

      <div className='pt-4  p-4'>
         <h3 className='text-2xl font-bold w-full border-b'>{problem.title}</h3>
         <Markdown content={problem.description} />
      </div>

   )
}

export default ProblemSec