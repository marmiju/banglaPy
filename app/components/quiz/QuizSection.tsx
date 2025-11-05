'use client'
import React, { useState } from 'react'

interface Quiz {
  question: string
  options: string[]
  correctAnswer: string
}

const QuizSection = ({ quiz }: { quiz: Quiz[] }) => {
  const [answers, setAnswers] = useState<{ [key: number]: string }>({})
  const [submitted, setSubmitted] = useState(false)

  const handleSelect = (index: number, option: string) => {
    if (!submitted) {
      setAnswers(prev => ({ ...prev, [index]: option }))
    }
  }

  const handleSubmit = () => {
    setSubmitted(true)
  }

  return (
    <div className="mt-6 bg-slate-900 text-white p-4 rounded-2xl shadow">
      {quiz.map((q, i) => (
        <div key={i} className="mb-4">
          <p className="font-medium mb-2">{i + 1}. {q.question}</p>
          {q.options.map((opt, j) => {
            const isCorrect = submitted && opt === q.correctAnswer
            const isWrong = submitted && answers[i] === opt && opt !== q.correctAnswer
            return (
              <button
                key={j}
                onClick={() => handleSelect(i, opt)}
                className={`block w-full text-left p-2 rounded-md border mb-2
                  ${answers[i] === opt ? 'bg-white text-black' : 'bg-slate-800'}
                  ${isCorrect ? 'border-green-500 bg-green-800' : ''}
                  ${isWrong ? 'border-red-500 bg-red-800' : ''}
                `}
              >
                {opt}
              </button>
            )
          })}
        </div>
      ))}
      {!submitted && (
        <button
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
        >
          সাবমিট করুন
        </button>
      )}
      {submitted && (
        <p className="mt-4 text-green-400 font-medium">
          ✅ কুইজ শেষ! সঠিক উত্তরগুলো সবুজ রঙে দেখানো হয়েছে।
        </p>
      )}
    </div>
  )
}

export default QuizSection
