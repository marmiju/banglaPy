'use client';
import React, { Suspense } from 'react'
import BanglaCodeRunner from '../BanglaCodeRunner'

import ReactMarkdown from 'react-markdown';

interface props {
    explaination: string
    source?: string
    code?: string
}

const LWV = ({ source, code, explaination }: props) => {
    return (
        <div>
            <div className="markdown-body">
                <ReactMarkdown>{explaination}</ReactMarkdown>
            </div>

            <div className='flex flex-col md:flex-row mt-4 gap-2  '>
                <Suspense fallback={<div className='w-64 h-6d'>Waiting for Video</div>}>
                    {source && (
                        <iframe
                            className='w-full object-contain rounded h-80 md:h-96 md:w-full bg-slate-600 p-2'
                            src={`https://www.youtube.com/embed/${source}`}
                            allow="accelerometer; clipboard-write; encrypted-media; gyroscope;"
                            allowFullScreen
                        ></iframe>
                    )}
                </Suspense>
                {code && <BanglaCodeRunner input={code} />}
            </div>
        </div>
    )
}

export default LWV
