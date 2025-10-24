import React from 'react'
import LWV from '../components/lwv/LWV'
import { resources } from '@/public/data/teching'

const page = () => {
  return (
    <div className='max-w-6xl mx-auto p-2'>
      {
        resources.map((res,index)=>(
          <LWV key={index} topic={res.topic} desc={res.desc} source={res.source} code={res.code} />
        ))
      }
        
    </div>
  )
}

export default page