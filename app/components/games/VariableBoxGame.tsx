"use client";
import React, { useState } from "react";

const VariableBoxGame: React.FC = () => {
  const [magicBox, setMagicBox] = useState<string>("");
  const [output, setOutput] = useState<string>("");

  const storeValue = () => {
    const inputValue = (document.getElementById("value") as HTMLInputElement).value;
    setMagicBox(inputValue);
    setOutput("✅ বাক্সে রাখা হয়েছে!");
  };

  const showValue = () => {
    if (magicBox === "") {
      setOutput("❗ প্রথমে কিছু রাখো!");
    } else {
      setOutput(`🎉 বাক্সে আছে: ${magicBox}`);
    }
  };

  return (
    <div className="flex flex-col font-bold text-center pt-2 text-black bg-white/50 p-4 backdrop-blur-2xl  justify-center items-center text-2xl min-h-[75vh]">
      <p>বাক্সে মান রাখো, <br/> তারপর  জাদু  করে দেখাও!</p>

      <div className="w-44 h-44  backdrop-blur-3xl text items-center border border-white bg-purple-600 justify-center flex text-4xl"
      >
        📦
      </div>

      <input
        id="value"
        placeholder="বাক্সে মান রাখো"
        className="w-44  borderp-2 border-white bg-purple-600 p-2 backdrop-blur-2xl text-white text-xl"
        
      />

      <br />

      <button
        onClick={storeValue}
        style={{
          marginTop: "15px",
          padding: "10px 20px",
          fontSize: "18px",
          background: "#7a57d1",
          color: "white",
          border: "none",
          borderRadius: "12px",
          cursor: "pointer",
        }}
      >
        বাক্সে রাখো 📥
      </button>

      <button
        onClick={showValue}
        style={{
          marginLeft: "10px",
          marginTop: "15px",
          padding: "10px 20px",
          fontSize: "18px",
          background: "#7a57d1",
          color: "white",
          border: "none",
          borderRadius: "12px",
          cursor: "pointer",
        }}
      >
        জাদু করো ✨
      </button>

      <div style={{ fontSize: "26px", marginTop: "20px", fontWeight: "bold" }}>
        {output}
      </div>
    </div>
  );
};

export default VariableBoxGame;
