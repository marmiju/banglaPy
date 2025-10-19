"use client";
import { useState } from "react";
import Editor from "@monaco-editor/react";

export default function BanglaCodeRunner() {
  const [banglaCode, setBanglaCode] = useState("");
  const [pythonCode, setPythonCode] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const runCode = async () => {
    setLoading(true);
    setError("");
    setOutput("");
    setPythonCode("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/toPython`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: banglaCode }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Server error");

      setPythonCode(data.pythonCode || "");
      setOutput(data.output || "");
    } catch (err) {
      console.error(err);
      setError("Something went wrong while running the code.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen p-0 md:p-4 text-black/80 flex flex-col items-center max-w-[1280px] mx-auto">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          banglaPy
        </h1>
      <div className="w-full flex  flex-col md:flex-row   rounded-xl p-2 gap-4">
        
        {/* ---- Code Editor ---- */}
        <div className="border min-w-1/2 flex flex-col border-gray-300 rounded-lg overflow-hidden">
          
          <pre className="text-black bg-slate-200 m-2"> banglapy</pre>
          <Editor
            height="400px"
            width={"400"}
            defaultLanguage="python"
            language="python"
            theme="vs-light"
            value={banglaCode}
            onChange={(value) => setBanglaCode(value || "")}
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              wordWrap: "on",
              automaticLayout: true,
            }}
          />
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
           <button disabled={loading} onClick={runCode} className="bg-gray-900 text-white px-4 py-2">Run Code</button>
        </div>

        {/* ---- Python Output Section ---- */}
        <div className="ml-0 md:ml-4 lg:ml-6 min-w-1/2 p-2">
        {/* python code */}
        <div className="p-4">
          <h2 className="text-black px-2 bg-gray-200">
           converted python code:
          </h2>
          <pre className="bg-gray-100 min-h-20 text-sm p-3 rounded overflow-x-auto whitespace-pre-wrap">
            {pythonCode || "No output yet..."}
          </pre>
        </div>

        {/* output */}
        <div className="p-4">
          <h2 className="text-black px-2 bg-gray-200">
           Output:
          </h2>
          <pre className="bg-gray-100 min-h-20 text-sm p-3 rounded overflow-x-auto whitespace-pre-wrap">
            {output || error || "No output yet..."}
          </pre>
        </div>
        </div>
      </div>

      <footer className="text-gray-500 text-sm mt-6">
        Made with ❤️ in Bangladesh
      </footer>
    </div>
  );
}
