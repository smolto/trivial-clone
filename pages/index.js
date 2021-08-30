import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'

import UserContext from '../context/User/UserContext'
import QuizContext from '../context/Quiz/QuizContext'

import styles from './../styles/Home.module.css'

import { Layout } from '../components/Layout/Layout'
import { Toolbar } from '../components/Toolbar/Toolbar'
import { UserToolbar } from '../components/UserToolbar/UserToolbar'
import { CheckUserLogin } from '../components/CheckUserLogIn/CheckUserLogin'
import { CheckUserSet } from '../components/CheckUserSet/CheckUserSet'

import { getCurrentDate } from '../services/date'

export default function Home ({ userLoggedIn }) {
  const router = useRouter()
  const { user } = useContext(UserContext)
  const {
    category,
    questions,
    setCategory,
    setQuesions,
    selectCategoryAgain,
    setSelectCategoryAgain,
    resetAnswers,
    setStartDate,
    setResult
  } = useContext(QuizContext)

  const selectCategory = (_category) => {
    setResult(0)
    setCategory(_category)
    setSelectCategoryAgain(false)
  }

  useEffect(() => {
    if (questions.length > 0 && selectCategoryAgain === false) {
      resetAnswers()
      setStartDate(getCurrentDate())
      router.push({
        pathname: '/game'
      })
    }
  }, [questions, selectCategoryAgain])

  useEffect(() => {
    if (category !== '') {
      setQuesions()
    }
  }, [category])

  return (
    <CheckUserLogin userLoggedIn={userLoggedIn}>
      <CheckUserSet>
        <Layout title="Home">
          <Toolbar>
            <UserToolbar user={user} />
          </Toolbar>
          <div className="content">
            <div className={styles['quiz-header']}>
              <h1>Categories</h1>
              <p>
                Feel free to choose which category you feel most comfortable
                in!😋
              </p>
            </div>
            <div className={styles['category-grid']}>
              <div
                className={`${styles['category-item']} ${styles.geography}`}
                onClick={() => selectCategory('Geography')}
              >
                <span>Geography</span>
              </div>
              <div
                className={`${styles['category-item']} ${styles.sports}`}
                onClick={() => selectCategory('Sports')}
              >
                <span>Sports</span>
              </div>
              <div
                className={`${styles['category-item']} ${styles.science}`}
                onClick={() => selectCategory('Science')}
              >
                <span>Science</span>
              </div>
              <div
                className={`${styles['category-item']} ${styles.entertainment}`}
                onClick={() => selectCategory('Entertainment')}
              >
                <span>Entertainment</span>
              </div>
            </div>
          </div>
        </Layout>
      </CheckUserSet>
    </CheckUserLogin>
  )
}
