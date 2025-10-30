'use client';
import React, { useState } from 'react';

export default function RobotGame() {
  const [robotPos, setRobotPos] = useState({ x: 0, y: 0 });
  const [log, setLog] = useState<string[]>([]);
  const [commands, setCommands] = useState('');

  const size = 5; // 5x5 গ্রিড
  const goal = { x: 4, y: 4 };

  const runCode = () => {
    const lines = commands.split('\n').map(l => l.trim());
    let pos = { ...robotPos };
    const newLog: string[] = [];

    for (let line of lines) {
      if (line === 'আগাও()' && pos.x < size - 1) pos.x++;
      else if (line === 'পিছাও()' && pos.x > 0) pos.x--;
      else if (line === 'উপরে()' && pos.y > 0) pos.y--;
      else if (line === 'নিচে()' && pos.y < size - 1) pos.y++;
      else newLog.push(`⚠️ অজানা কমান্ড: ${line}`);
    }

    setRobotPos(pos);
    if (pos.x === goal.x && pos.y === goal.y) {
      newLog.push('🎉 রোবট ঘরে পৌঁছে গেছে!');
    } else {
      newLog.push(`📍 রোবট এখন অবস্থান করছে (${pos.x}, ${pos.y})`);
    }
    setLog(newLog);
  };

  return (
    <div className="p-6 max-w-lg mx-auto text-center text-black">
      <h1 className="text-2xl font-bold mb-4">🤖 রোবটকে ঘরে ফেরাও</h1>

      {/* গ্রিড */}
      <div className="grid grid-cols-5 gap-1 w-fit mx-auto mb-4">
        {[...Array(size * size)].map((_, i) => {
          const x = i % size;
          const y = Math.floor(i / size);
          const isRobot = x === robotPos.x && y === robotPos.y;
          const isGoal = x === goal.x && y === goal.y;
          return (
            <div
              key={i}
              className={`w-12 h-12 flex text-black items-center justify-center rounded
              ${isRobot ? 'bg-blue-500 text-white' : isGoal ? 'bg-green-400' : 'bg-gray-200'}`}
            >
              {isRobot ? '🤖' : isGoal ? '🏠' : ''}
            </div>
          );
        })}
      </div>


      <textarea
        className="w-full h-32 border rounded p-2 mb-2 text-sm font-mono"
        placeholder={`লিখো কমান্ড:\nআগাও()\nনিচে()\nনিচে()\nআগাও()`}
        value={commands}
        onChange={e => setCommands(e.target.value)}
      />

      <button
        onClick={runCode}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded"
      >
        ▶️ রান করো
      </button>


      <div className="mt-3 text-left bg-slate-400 text-black border rounded p-2 font-mono">
        {log.map((l, i) => (
          <div key={i}>{l}</div>
        ))}
      </div>
    </div>
  );
}
