'use client'
import { Quiz } from '@/utils/types/types'
import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'



type Result = {
  resId: number
  question: string
  selected: string | null
  correctAnswer: string
  isCorrect: boolean
}

const LOCAL_STORAGE_KEY = 'quiz-answers'

/**
 * QuizSection
 * - shows immediate feedback for the user's selected option (Correct / Incorrect)
 * - does NOT reveal the correct option when the user selects a wrong answer
 * - allows reselection until the user submits
 * - stores answers in localStorage and POSTs results to an API on submit
 */
const QuizSection = ({ quiz, res_id }: { quiz: Quiz[], apiEndpoint?: string, res_id: number }) => {
  const [answers, setAnswers] = useState<{ [key: number]: string }>(() => {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY)
      return raw ? JSON.parse(raw) : {}
    } catch {
      return {}
    }
  })

  const [submitting, setSubmitting] = useState(false)

  const persist = (newAnswers: { [key: number]: string }) => {
    try { localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newAnswers)) } catch { }
  }

  const handleSelect = (index: number, option: string) => {
    setAnswers(prev => {
      const next = { ...prev, [index]: option }
      persist(next)
      return next
    })
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    const results: Result[] = quiz.map((q, i) => ({
      resId: res_id,
      question: q.question,
      selected: answers[i] || null,
      correctAnswer: q.correctAnswer,
      isCorrect: answers[i] === q.correctAnswer
    }))

    console.log('USER QUIZ RESULT:', results)

    // POST results to backend
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/learing`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ resId: res_id })
    })
    setSubmitting(false)

    const result = await res.json()

    toast(result.msg)

  }


  return (
    <div className="mt-6 bg-slate-900 text-white p-4 rounded-2xl shadow">
      <ToastContainer/>
      {quiz.map((q, i) => (
        <div key={i} className="mb-4">
          <p className="font-medium mb-2">{i + 1}. {q.question}</p>
          {q.options.map((opt, j) => {
            const isSelected = answers[i] === opt
            const isCorrectSelection = isSelected && opt === q.correctAnswer
            const isWrongSelection = isSelected && opt !== q.correctAnswer
            return (
              <div key={j} className="mb-2">
                <button
                  type="button"
                  onClick={() => handleSelect(i, opt)}
                  className={`w-full text-left p-2 rounded-md border flex items-center justify-between
                    ${isCorrectSelection ? ' text-green-500' : ''}
                    ${isWrongSelection ? ' text-red-500' : ''}
                  `}
                >
                  <span>{opt}</span>
                  <span className="ml-2">
                    {isCorrectSelection && (
                      <span className="text-green-300 font-medium">✓ সঠিক</span>
                    )}
                    {isWrongSelection && (
                      <span className="text-red-300 font-medium">✕ ভুল</span>
                    )}
                  </span>
                </button>
              </div>
            )
          })}
        </div>
      ))}

      {quiz && (
        <div className="mt-4">
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded disabled:opacity-50"
          >
            {submitting ? 'সাবমিট হচ্ছে...' : 'সাবমিট'}
          </button>
        </div>
      )}

    </div>
  )
}

export default QuizSection
