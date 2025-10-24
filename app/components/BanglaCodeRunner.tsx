"use client";
import { useState } from "react";
import Editor from "@monaco-editor/react";
import { saveLocalStorege } from "@/utilities/SaveCodeInLicalStore";

interface prpos{
  input?: string
}

export default function BanglaCodeRunner({input}:prpos) {
  const [banglaCode, setBanglaCode] = useState(input);
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

    saveLocalStorege(banglaCode!);
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
    <div className=" p-0  text-black/80 flex flex-col items-center max-w-[1280px] mx-auto">

      <div className="w-full flex  flex-col md:flex-row   rounded-xl p-2 gap-4">
        
        {/* ---- Code Editor ---- */}
        <div className=" min-w-1/2 flex flex-col rounded-lg overflow-hidden">
          
          <pre className="text-white bg-slate-600 "> .বাংলা</pre>
          <Editor
          className="border border-slate-400"
          height={window.location.pathname == '/banglapy' ? '400px': '300px'}
            width={"400"}
            defaultLanguage="python"
            language="python"
            theme="vs-dark"
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
           <button disabled={loading} onClick={runCode} className="bg-gradient-to-br from-purple-700 to-cyan-600 text-white px-4 py-2">Run Code</button>
        </div>

        {/* ---- Python Output Section ---- */}
        <div className=" min-w-1/2 border bg-slate-800 rounded text-white">
        {/* python code */}
        <div className="p-4 max-h-64 ">
          <h2 className=" px-2 bg-gray-700 flex justify-between">
           <span>converted python code:</span><p className="bg-black/50 px-2 text-white">copy</p>
          </h2>
          <pre className="bg-gray-600 min-h-40 max-h-52 text-sm p-3 rounded overflow-y-auto whitespace-pre-wrap">
            {pythonCode || "No output yet..."}
          </pre>
        </div>

        {/* output */}
        <div className="p-4 max-h-64 overflow-y-auto">
          <h2 className="bg-slate-700 px-2  text-gray-200">
           Output:
          </h2>
          <pre className={`bg-slate-600 ${stderr ? 'bg-red-200':''}  min-h-20 text-sm p-3 rounded overflow-x-auto whitespace-pre-wrap`}>
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
