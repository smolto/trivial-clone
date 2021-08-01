import React, { useReducer } from 'react'

import UserContext from './QuizContext'
import QuizReducer from './QuizReducer'

import { useConfig } from '../../hooks/useConfig'

import { getQuestions } from '../../services/QuestionService'

export default function QuizState (props) {
  const publicRuntimeConfig = useConfig()
  const initialState = {
    category: '',
    selectCategoryAgain: true,
    questions: [],
    answers: [],
    result: 0
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

  const setSelectCategoryAgain = (value) => {
    dispatch({ type: 'SET_SELECT_CATEGORY_AGAIN', payload: value })
  }

  const addAnswer = (answer) => {
    dispatch({ type: 'ADD_ANSWER', payload: answer })
  }

  const resetAnswers = () => {
    dispatch({ type: 'RESET_ANSWER', payload: [] })
  }

  const setResult = (result) => {
    dispatch({ type: 'SET_RESULT', payload: result })
  }

  return (
    <UserContext.Provider
      value={{
        category: state.category,
        questions: state.questions,
        answers: state.answers,
        selectCategoryAgain: state.selectCategoryAgain,
        result: state.result,
        setCategory,
        setQuesions,
        setSelectCategoryAgain,
        addAnswer,
        resetAnswers,
        setResult
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}
