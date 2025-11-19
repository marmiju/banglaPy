import React from "react";
import { ImCross } from "react-icons/im";
interface props {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export default function Modal({ open, onClose, children }: props) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[999] bg-black/40   flex items-center justify-center p-8">
            <div className=" border border-white/20  overflow-auto backdrop-blur-[10px] p-4 md:p-10 rounded-xl shadow-2xl   relative">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className=" absolute 
                    z-100 top-2 right-2 cursor-pointer duration-300
                     bg-red-600 p-0 md:p-2 hover:p-0 rounded-full h-6 lg:h-4 hover:h-6 w-6 lg:w-4 hover:w-6 flex justify-center items-center "
                >
                    <ImCross />


                </button>

                {children}
            </div>
        </div>
    );
}
