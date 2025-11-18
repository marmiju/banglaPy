"use client";
import React, { useEffect, useState } from "react";
import LWV from "../components/lwv/LWV";
import { Resources } from "@/utils/types/types";
import { GetRes } from "@/utils/functions/GetRes";

const Page = () => {
  const [resources, setresources] = useState<Resources[] | null>(null);
  const [open, setOpen] = useState(false);
  const [indx, setIndx] = useState(0)

  const handleClick = (id:number) => {
    setIndx(id)
    setOpen(false);
  };

  useEffect(() => {
    const get_res = async () => {
      const res = await GetRes();
      setresources(res);
    };
    get_res();
  }, []);

  return (
    <div className="min-h-screen w-full pb-10 max-w-[1200px] mx-auto px-4">

      {/* ---------- MOBILE MENU BUTTON ---------- */}
      <button
        onClick={() => setOpen(!open)}
        className=" fixed top-12 left-[-5] cursor-pointer z-50 bg-white px-3 py-1 text-black rounded"
      >
        {open ? "✖ Close" : "☰ Menu"}
      </button>

      {/* ---------- SIDEBAR ---------- */}
      <div
        className={`
          fixed  top-10 left-0 h-screen  w-64 
          bg-slate-900 text-white border-r border-slate-600 
          p-4 overflow-y-auto z-40
          transform transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full "}
        `}
      >
        <h2 className="font-bold text-lg mb-4 pt-10  border-b">
          টপিক
        </h2>

        <div className="flex flex-col space-y-1 mt-2">
          {resources &&
            resources.map((res, index) => (
              <button
                key={res.topic}
                className={`
                  px-3 py-2 rounded text-start hover:bg-slate-700 
                  transition-all duration-200 cursor-pointer
                  ${index === indx ? 'bg-white text-black' : ''} 
                `}
                onClick={() => handleClick(index)}
              >
                {res.topic}
              </button>
            ))}
        </div>
      </div>

      {/* ---------- MAIN CONTENT ---------- */}
      <div className="max-w-6xl mx-auto p-4">
        {resources && (
          <LWV
            resources_id={resources[indx].id  || 0}
            explaination={resources[indx].desc}
            source={resources[indx].source}
            code={resources[indx].code}
            quiz={resources[indx].quizs}
          />
        )}
      </div>


    </div>
  );
};

export default Page;
