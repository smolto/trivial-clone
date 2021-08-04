import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import UserContext from '../context/User/UserContext'
import QuizContext from '../context/Quiz/QuizContext'

import { Layout } from '../components/Layout/Layout'
import { Toolbar } from '../components/Toolbar/Toolbar'
import { UserToolbar } from '../components/UserToolbar/UserToolbar'
import { CheckUserLogin } from '../components/CheckUserLogIn/CheckUserLogin'
import { Question } from '../components/Question/Question'

export default function Game ({ userLoggedIn }) {
  const { user } = useContext(UserContext)
  const { questions, setSelectCategoryAgain, addAnswer, answers, result, setResult } = useContext(QuizContext)
  const router = useRouter()

  const [selectedQuestion, setSelectedQuestion] = useState(questions[0])
  const [selectedQuestionNumber, setSelectedQuestionNumber] = useState(0)
  const [isFirst, setIsFirst] = useState(true)
  const [, setEndQuiz] = useState(false)

  useEffect(() => {
    setSelectCategoryAgain(true)
    setIsFirst(true)
    setEndQuiz(false)
    setSelectedQuestion(questions[0])
    setSelectedQuestionNumber(0)
  }, [questions])

  useEffect(() => {
    if (!isFirst) {
      if (answers.length === 10) {
        setEndQuiz(true)
        router.push({
          pathname: '/result'
        })
      } else {
        setSelectedQuestion(questions[selectedQuestionNumber + 1])
        setSelectedQuestionNumber(selectedQuestionNumber + 1)
      }
    } else {
      setSelectedQuestion(questions[0])
      setSelectedQuestionNumber(0)
    }
  }, [answers])

  const answerSelected = (_answer, id) => {
    addAnswer(_answer)
    _answer === selectedQuestion.correct ? setResult(result + 1) : setResult(result)
    setIsFirst(false)
  }

  return (
    <CheckUserLogin userLoggedIn={userLoggedIn}>
      <Layout title="Home">
        <Toolbar>
          <UserToolbar user={user} />
        </Toolbar>
        {
          selectedQuestion !== undefined
            ? <Question
                question={selectedQuestion}
                questionNumber={selectedQuestionNumber}
                action={answerSelected}
              />
            : null
        }

      </Layout>
    </CheckUserLogin>
  )
}
