import Link from 'next/link'
import React from 'react'
import { FaArrowAltCircleUp } from 'react-icons/fa'

const FloatingButton = () => {
  return (
    <div className='fixed bottom-10  right-10 z-100 text-4xl'>
        <Link href={'#'}> <FaArrowAltCircleUp /></Link>
    </div>
  )
}

export default FloatingButton