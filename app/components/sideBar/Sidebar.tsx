'use client';

import { useEffect, useState } from 'react'
import { MdContentCopy, MdFileCopy } from 'react-icons/md';

const Sidebar = () => {
  const [history, setHistory] = useState<string[] | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  useEffect(() => {
    const savedCodes = localStorage.getItem("banglaCode");
    const parsed = savedCodes ? JSON.parse(savedCodes) as string[] : [];
    setHistory(parsed.reverse());
  }, []);

  const handleCopy = async (code: string, index: number) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 1500); // reset after 1.5s
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className="p-2">
      {
        history?.map((code, index) => (
          <div key={index} className="p-4 m-2 border border-gray-300 rounded-lg shadow-sm bg-gray-50 relative group transition hover:shadow-md">
            <button
              onClick={() => handleCopy(code, index)}
              className="absolute top-2 right-2 text-sm px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 transition"
            >
              {copiedIndex === index ? <MdFileCopy /> : <MdContentCopy />}
            </button>
            <pre className="bg-gray-100 p-2 rounded overflow-x-auto whitespace-pre-wrap text-sm font-mono">
              {code}
            </pre>
          </div>
        ))
      }
    </div>
  )
}

export default Sidebar;
