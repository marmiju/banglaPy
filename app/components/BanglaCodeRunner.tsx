"use client";
import { useState } from "react";
import Editor from "@monaco-editor/react";
import { saveLocalStorege } from "@/utilities/SaveCodeInLicalStore";

export default function BanglaCodeRunner() {
  const [banglaCode, setBanglaCode] = useState("");
  const [pythonCode, setPythonCode] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [stderr, setstderr] = useState("");

  const runCode = async () => {
    setLoading(true);
    setError("");
    setstderr("");
    setOutput("");
    setPythonCode("");
    console.log("Running code:", process.env.NEXT_PUBLIC_BASE_URL);

    saveLocalStorege(banglaCode);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/toPython`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: banglaCode }),
      });

      const data = await res.json();
      console.log("Response data:", data);

      if (!res.ok) throw new Error(data.error || "Server error");

      setPythonCode(data.pythonCode || "");
      if (data.stderr) {
        setstderr(data.stderr);
        console.log("Stderr:", data.stderr);
      }else{
        setOutput(data.output || "No output");
      }

    } catch (err) {
      console.error("err",err);
      setError("Something went wrong while running the code.");
    }finally {
    setLoading(false);
    }
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
        <div className="p-4 max-h-64 overflow-y-auto">
          <h2 className="text-black px-2 bg-gray-200 flex justify-between">
           <span>converted python code:</span><p className="bg-black/50 px-2 text-white">copy</p>
          </h2>
          <pre className="bg-gray-100 min-h-20 text-sm p-3 rounded overflow-x-auto whitespace-pre-wrap">
            {pythonCode || "No output yet..."}
          </pre>
        </div>

        {/* output */}
        <div className="p-4 max-h-64 overflow-y-auto">
          <h2 className="text-black px-2  bg-gray-200">
           Output:
          </h2>
          <pre className={`bg-gray-100 ${stderr ? 'bg-red-200':''}  min-h-20 text-sm p-3 rounded overflow-x-auto whitespace-pre-wrap`}>
            {stderr || output || "কোড রান করুন"}
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
