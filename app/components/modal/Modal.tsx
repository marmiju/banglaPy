import React from "react";
interface props {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export default function Modal({ open, onClose, children }: props) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-md  flex items-center justify-center">
            <div className="bg-slate-900 border max-h-[400px] overflow-auto border-slate-300 p-6 rounded-xl shadow-2xl max-w-lg w-full relative">

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
