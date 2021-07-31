import React, { useReducer } from 'react'

import UserContext from './QuizContext'
import QuizReducer from './QuizReducer'

import { useConfig } from '../../hooks/useConfig'

import { getQuestions } from '../../services/QuestionService'

export default function QuizState (props) {
  const publicRuntimeConfig = useConfig()
  const initialState = {
    category: '',
    questions: [],
    answers: []
  }

  const [state, dispatch] = useReducer(QuizReducer, initialState)

  const setCategory = async (category) => {
    dispatch({ type: 'SET_CATEGORY', payload: category })
  }

  const setQuesions = async () => {
    const res = await getQuestions(publicRuntimeConfig.AUTH0_BASE_URL, state.category)

    if (res !== null && res !== false) {
      dispatch({ type: 'SET_QUESTIONS', payload: res.data })
    }
  }

  return (
    <UserContext.Provider
      value={{
        category: state.category,
        questions: state.questions,
        answers: state.answers,
        setCategory,
        setQuesions
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}
