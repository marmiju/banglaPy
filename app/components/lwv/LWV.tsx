import React from 'react'
import BanglaCodeRunner from '../BanglaCodeRunner'
interface props {
    topic:string,
    desc:string,
    source?: string,
    code?: string
}

const LWV = ({ source, code,desc,topic }: props) => {
    return (
        <div className=''>
            <h3 className='text-xl text-red-400'>{topic}</h3>
            <p className=''>{desc}</p>
            <div className='flex flex-col md:flex-row'>
               {source &&  <iframe className='w-full object-contain rounded h-80 md:h-96 md:w-1/2' src={`https://www.youtube.com/embed/${source}`} title="Moner majhe acho tomi।  Islamic song। kalarab song।  2017।" allow="accelerometer;  clipboard-write; encrypted-media; gyroscope;" allowFullScreen></iframe>}
                {code && <BanglaCodeRunner input={code} />}
            </div>
        </div>
    )
}

export default LWV