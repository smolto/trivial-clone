import React, { useReducer } from 'react'

import UserContext from './QuizContext'
import QuizReducer from './QuizReducer'

// import { useConfig } from '../../hooks/useConfig'

export default function QuizState (props) {
  // const publicRuntimeConfig = useConfig()
  const initialState = {
    category: '',
    questions: [],
    answers: []
  }

  const [state, dispatch] = useReducer(QuizReducer, initialState)

  const setCategory = async (category) => {
    dispatch({ type: 'SET_CATEGORY', payload: category })
  }

  return (
    <UserContext.Provider
      value={{
        category: state.category,
        questions: state.questions,
        answers: state.answers,
        setCategory
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}
