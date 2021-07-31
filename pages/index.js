import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'

import UserContext from '../context/User/UserContext'
import QuizContext from '../context/Quiz/QuizContext'

import styles from './../styles/Home.module.css'

import { Layout } from '../components/Layout/Layout'
import { Toolbar } from '../components/Toolbar/Toolbar'
import { CheckUserLogin } from '../components/CheckUserLogIn/CheckUserLogin'

export default function Home ({ userLoggedIn, setUserLoggedIn }) {
  const router = useRouter()
  const { user, setUserByEmail } = useContext(UserContext)
  const { setCategory } = useContext(QuizContext)

  const selectCategory = (_category) => {
    setCategory(_category)
  }

  useEffect(() => {
    const email = JSON.parse(localStorage.getItem('userEmail'))
    if (email !== null) {
      setUserByEmail(email)
    }
  }, [])

  return (
    <CheckUserLogin userLoggedIn={userLoggedIn}>
      <Layout>
        <Toolbar>
          <div className={styles['quiz-title']}>
            <img src={user.image} alt="logo" height="60" />
            <span>{user.username}</span>
          </div>
          <div
            className={styles['quiz-title']}
            onClick={() => {
              localStorage.removeItem('userLoggedIn')
              localStorage.removeItem('userEmail')
              router.push({
                pathname: '/api/auth/logout'
              })
            }}
          >
            <img src="/logout.svg" alt="logo" height="30" />
          </div>
        </Toolbar>
        <div className="content">
          <div className={styles['quiz-header']}>
            <h1>Categories</h1>
            <p>
              Feel free to choose which category you feel most comfortable in!😋
            </p>
          </div>
          <div className={styles['category-grid']}>
            <div className={`${styles['category-item']} ${styles.geography}`} onClick={() => selectCategory('Geography')}>
              <span>Geography</span>
            </div>
            <div className={`${styles['category-item']} ${styles.sports}`} onClick={() => selectCategory('Sports')}>
              <span>Sports</span>
            </div>
            <div className={`${styles['category-item']} ${styles.science}`} onClick={() => selectCategory('Science')}>
              <span>Science</span>
            </div>
            <div className={`${styles['category-item']} ${styles.entertainment}`} onClick={() => selectCategory('Entertainment')}>
              <span>Entertainment</span>
            </div>
          </div>
        </div>
      </Layout>
    </CheckUserLogin>
  )
}
