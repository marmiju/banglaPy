"use client";
import { useState } from "react";
import Editor from "@monaco-editor/react";
import { saveLocalStorege } from "@/utils/SaveCodeInLicalStore";
import { useUserContext } from "./hooks/provider/ContextApi";
import { Problem } from "@/utils/types/userInterface";
import { toast, ToastContainer } from "react-toastify";

interface prpos {
  src_code?: string
  problem?: Problem
  height?: string
  problemId?: string
}

export default function BanglaCodeRunner({ src_code, problem, height }: prpos) {
  const [banglaCode, setBanglaCode] = useState(src_code);
  const [pythonCode, setPythonCode] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [stderr, setstderr] = useState("");

  const { user } = useUserContext()

  const [copied, setCopied] = useState(false)

  const submitcode = async () => {
    setLoading(true);
    setError("");
    setstderr("");
    setOutput("");
    setPythonCode("");


    try {
      if (!user) return setError("প্রথমে লগইন করুন")

      if (!banglaCode || !problem || !problem.id) return
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/submitcode`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: banglaCode, input: problem?.sampleInput, userId: user.id, problemId: problem?.id }),
      });



      const data = await res.json();
      if (data.isCorrect) {
        toast.success(data.msg,);
      } else {
        toast.error(data.msg);
      }

      if (!res.ok) throw new Error(data.error || "Server error");
      saveLocalStorege(banglaCode!);
      setPythonCode(data.pythonCode || "");
      if (data.stderr) {
        setstderr(data.stderr);
        console.log("Stderr:", data.stderr);
      } else {
        setOutput(data.output || "No output");
      }

    } catch (err) {
      console.error("err", err);
      setError("মনে হচ্ছে কিছু সমস্যা আছে");
    } finally {
      setLoading(false);
    }
  };

  const runCode = async () => {
    setLoading(true);
    setError("");
    setstderr("");
    setOutput("");
    setPythonCode("");
    console.log("Running code:", process.env.NEXT_PUBLIC_BASE_URL);


    try {

      if (!banglaCode) return


      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/runcode`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: banglaCode, input: problem?.sampleInput }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Server error");
      saveLocalStorege(banglaCode!);
      setPythonCode(data.pythonCode || "");
      if (data.stderr) {
        setstderr(data.stderr);
        console.log("Stderr:", data.stderr);
      } else {
        setOutput(data.output || "No output");
      }

    } catch (err) {
      console.error("err", err);
      setError("মনে হচ্ছে কিছু সমস্যা আছে");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500); // reset after 1.5s
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className=" p-0  mb-10 text-black/80  flex flex-col lg:flex-row gap-4  w-full max-w-[1280px] mx-auto">
      <ToastContainer />
      {/* ---- Code Editor ---- */}
      <div className=" min-w-1/2 w-full flex flex-col rounded-lg overflow-hidden">

        <pre className="text-white bg-slate-600 "> .বাংলা</pre>
        <Editor
          className="border border-slate-400"
          height={height || '300px'}
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
        {error && <p className="text-red-500 text-center bg-slate-300 z-10 mt-[-10px]">{error}</p>}
        {
          loading ? <div className="text-center text-black bg-white/80  p-2">আপেক্ষা করুন</div>
            : <div className="w-full flex flex-col md:flex-row ">
              <button disabled={loading} onClick={runCode} className={`bg-gradient-to-br w-full bg-white text-black px-4 cursor-pointer py-2 `}>কোড রান করুন</button>
             {problem && <button disabled={loading} onClick={submitcode} className={`bg-gradient-to-br w-full bg-green-600 text-white px-4 cursor-pointer py-2 `}>সাবমিট করুন</button>}

            </div>
        }
      </div>

      {/* ---- Python and  Output SeCtion ---- */}
      <div className="flex-col  w-full  rounded bg-slate-900 p-1 text-white  space-y-4">
        {/* python code */}
        <div className=" max-h-64 w-full ">
          <h2 className=" px-2 w-full bg-gray-700 flex justify-between">
            <span>পাইথন কোড:</span><button onClick={() => handleCopy(pythonCode)} className="bg-black/50 px-2 cursor-pointer text-white">{copied ? 'কপি হয়েছে' : `কপি করুন`}</button>
          </h2>
          <pre className="bg-gray-600 min-h-40 max-h-52 text-sm p-3 rounded overflow-y-auto whitespace-pre-wrap">
            {pythonCode || "No output yet..."}
          </pre>
        </div>

        {/* output */}
        <div className="">
          <h2 className="">
            রেজাল্ট:
          </h2>
          <p className={`bg-slate-600 ${stderr ? 'bg-red-200' : ''}  min-h-20 text-sm p-3 rounded overflow-x-auto whitespace-pre-wrap`}>
            {stderr || output || "কোড রান করুন"}
          </p>
        </div>
      </div>


    </div>
  );
}
