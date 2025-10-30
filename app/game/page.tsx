'use client'
import { useState } from "react";
import RobotGame from "../components/games/RobotGame";
import VariableBoxGame from "../components/games/VariableBoxGame";
import bg from '@/public/bg.png'

export default function KidsCodingGames() {
    const games = [<VariableBoxGame key="variable-box" />, <RobotGame key={'robot-game'}/>]
    const [gameIndex, setGameIndex] = useState(0);

    return (
        <div key={gameIndex} style={
            {
                background: `url(${bg.src}) center bottom / cover no-repeat`,
            }
        } className="w-full backdrop-blur-2xl  mx-auto p-5 h-[87vh]">
            {games[gameIndex]}

            <div className="flex justify-between mt-6">
                <button
                    className="bg-slate-700 text-white   px-3 py-1 rounded"
                    onClick={() => setGameIndex((gameIndex - 1 + games.length) % games.length)}
                >
                    ⬅️ আগের গেম
                </button>

                <button
                    className="bg-gray-900 sticky right-5 text-white px-3 py-1 rounded"
                    onClick={() => setGameIndex((gameIndex + 1) % games.length)}
                >
                    পরের গেম ➡️
                </button>
            </div>
        </div>
    );
}