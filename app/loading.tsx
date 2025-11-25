import Image from "next/image";

import logo2 from '@/public/logo2.png'


export default function Loading() {
    return (
        <div className="flex items-center justify-center opacity-65 h-[90vh]">
             <Image  src={logo2.src} alt="bangla-Py"
              width={100} height={100}
             />
        </div>
    )
}
