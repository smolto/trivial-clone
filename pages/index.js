import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import UserContext from '../context/User/UserContext'

import styles from './../styles/Home.module.css'

import { Layout } from '../components/Layout/Layout'
import { Toolbar } from '../components/Toolbar/Toolbar'
import { CheckUserLogin } from '../components/CheckUserLogIn/CheckUserLogin'

export default function Home ({ userLoggedIn, setUserLoggedIn }) {
  const router = useRouter()
  const { user, setUserByEmail } = useContext(UserContext)

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
          <div className={styles['quiz-title']} onClick={() => {
            localStorage.removeItem('userLoggedIn')
            localStorage.removeItem('userEmail')
            router.push({
              pathname: '/api/auth/logout'
            })
          }}>
            <img src='/logout.svg' alt="logo" height="30" />
          </div>
        </Toolbar>
      </Layout>
    </CheckUserLogin>
  )
}
