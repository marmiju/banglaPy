import React from "react";
interface props {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export default function Modal({ open, onClose, children }: props) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-sm  flex items-center justify-center p-8">
            <div className="   overflow-auto p-6 rounded-xl shadow-2xl  w-full relative">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-xl hover:text-red-500"
                >
                    ✕
                </button>

                {children}
            </div>
        </div>
    );
}
