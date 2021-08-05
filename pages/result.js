import { useContext } from 'react'
import moment from 'moment'

import styles from './../styles/Result.module.css'

import UserContext from '../context/User/UserContext'
import QuizContext from '../context/Quiz/QuizContext'

import { Layout } from '../components/Layout/Layout'
import { Toolbar } from '../components/Toolbar/Toolbar'
import { UserToolbar } from '../components/UserToolbar/UserToolbar'
import { CheckUserLogin } from '../components/CheckUserLogIn/CheckUserLogin'

export default function Game ({ userLoggedIn }) {
  const { user } = useContext(UserContext)
  const { result, questions, startDate, endDate } = useContext(QuizContext)

  console.log(startDate)
  console.log(endDate)

  console.log()
  return (
    <CheckUserLogin userLoggedIn={userLoggedIn}>
      <Layout title="Home">
        <Toolbar>
          <UserToolbar user={user} />
        </Toolbar>
        <div className={styles['score-container']}>
          <div className={styles['score-content']}>
            <div className={styles['score-title']}>
              <p className={styles['score-first-title']}>Quiz is over</p>
              <p className={styles['score-second-title']}>I hope you enjoyed</p>
            </div>
            <div className={styles['user-score']}>
              <p className={styles['user-score-label']}>Your score:</p>
              <p className={styles['user-score-obtained']}>
                <span className={styles['user-correct-answers']}>{result}</span> / {questions.length}
              </p>
              <p>Duration: {moment.utc(moment(endDate, 'DD/MM/YYYY HH:mm:ss').diff(moment(startDate, 'DD/MM/YYYY HH:mm:ss'))).format('HH:mm:ss')}</p>
            </div>
          </div>
        </div>
      </Layout>
    </CheckUserLogin>
  )
}
