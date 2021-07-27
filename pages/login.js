import { useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import UserContext from '../context/User/UserContext'

import { useUser } from '@auth0/nextjs-auth0'

import styles from './../styles/Home.module.css'

import { Layout } from '../components/Layout/Layout'
import { Toolbar } from '../components/Toolbar/Toolbar'
import { Alert } from '../components/Alert/Alert'

export default function Login ({ userLoggedIn, setUserLoggedIn }) {
  const { user } = useUser()
  const router = useRouter()
  const { setUser } = useContext(UserContext)
  const [isLogin, setIsLogin] = useState(true)
  const [username, setUsername] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const [alertMsg, setAlertMsg] = useState('')
  const [typeAlert, setTypeAlert] = useState('')

  const resetState = () => {
    setUserEmail('')
    setUsername('')
    setShowAlert(false)
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    const body = {
      email: userEmail
    }

    if (isLogin === true) {
      const settings = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      }
      const res = await fetch(
        'http://localhost:3000/api/graphql/getUser',
        settings
      )

      if (res.status === 400) {
        setAlertMsg(`Invalid email! ${userEmail} does not exist 🤯`)
        setShowAlert(true)
        setTypeAlert('danger')
      } else if (res.status === 200) {
        setAlertMsg('Perfect! User logged in successfully 😁')
        setShowAlert(true)
        setTypeAlert('success')

        localStorage.setItem('userLoggedIn', JSON.stringify(true))
        localStorage.setItem('userEmail', JSON.stringify(userEmail))
        const response = await res.json()
        setUser(response.data.queryUser[0])
        setUserLoggedIn(true)
        router.push({
          pathname: '/'
        })
      }

      //
    }
  }

  const checkIfUserAlreadyExist = async () => {
    const body = {
      email: user.email
    }
    const settings = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }
    const res = await fetch(
      'http://localhost:3000/api/graphql/getUser',
      settings
    )

    console.log(res)

    if (res.status === 200) {
      await updateUser()
    } else if (res.status === 400) {
      await createUser()
    } else {
      console.log('Hay algo jodido en la matrix')
    }
  }

  const createUser = async () => {
    const body = {
      email: user.email,
      username: user.nickname,
      image: user.picture
    }
    const settings = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }
    const res = await fetch(
      'http://localhost:3000/api/graphql/createUser',
      settings
    )
    if (res.status === 200) {
      localStorage.setItem('userLoggedIn', JSON.stringify(true))
      localStorage.setItem('userEmail', JSON.stringify(user.email))
      setUser(body)
      setUserLoggedIn(true)
      router.push({
        pathname: '/'
      })
    } else {
      setAlertMsg('Server internal error!! 🤯')
      setShowAlert(true)
      setTypeAlert('dander')
    }
  }

  const updateUser = async () => {
    const body = {
      email: user.email,
      username: user.nickname,
      image: user.picture
    }
    const settings = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }
    const res = await fetch(
      'http://localhost:3000/api/graphql/updateUser',
      settings
    )
    if (res.status === 200) {
      console.log(user)
      localStorage.setItem('userLoggedIn', JSON.stringify(true))
      localStorage.setItem('userEmail', JSON.stringify(user.email))
      setUser(body)
      setUserLoggedIn(true)
      router.push({
        pathname: '/'
      })
    } else {
      setAlertMsg('Server internal error!! 🤯')
      setShowAlert(true)
      setTypeAlert('dander')
    }
  }

  useEffect(() => {
    console.log(user)
    if (user !== undefined || userLoggedIn === true) {
      checkIfUserAlreadyExist()
    }
  }, [user])

  return (
    <Layout>
      <header>
        <Toolbar>
          <div className={styles['quiz-title']}>
            <img src="/logo.svg" alt="logo" height="30" />
            <span>S-quiz</span>
          </div>
        </Toolbar>
      </header>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles['form-title']}>Welcome to S-quiz! 😊</h2>
          <div className={styles['type-form-selectors']}>
            {isLogin === true
              ? (
              <>
                <span className={styles['span-selected']}>Log In</span>
                <span
                  className={styles['span-not-selected']}
                  onClick={() => {
                    resetState()
                    setIsLogin(false)
                  }}
                >
                  Sign Up
                </span>
              </>
                )
              : (
              <>
                <span
                  className={styles['span-not-selected']}
                  onClick={() => {
                    resetState()
                    setIsLogin(true)
                  }}
                >
                  Log In
                </span>
                <span className={styles['span-selected']}>Sign Up</span>
              </>
                )}
          </div>
          <div className="form-login">
            <form onSubmit={onSubmit}>
              {isLogin === false
                ? (
                <div className={styles['form-login__item']}>
                  <label>Username: </label>
                  <input
                    type="text"
                    className="input"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                  )
                : null}

              {showAlert === true
                ? (
                <div className={styles['form-login__item-alert']}>
                  <Alert text={alertMsg} type={typeAlert} />
                </div>
                  )
                : null}
              <div className={styles['form-login__item']}>
                <label>Email: </label>
                <input
                  type="email"
                  className="input"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                />
              </div>
              <div className={styles['form-login__submit']}>
                {isLogin === true
                  ? (
                  <button className="btn btn_primary">Log in</button>
                    )
                  : (
                  <button className="btn btn_primary">Sign up</button>
                    )}
              </div>
            </form>
          </div>
          <hr />
          <button
            className="btn btn_primary"
            onClick={() => router.push('/api/auth/login')}
          >
            <div className={styles['auth0-button']}>
              <img src="/auth0-logo.svg" alt="auth0-logo" height="20" />
              Continue with Auth0
            </div>
          </button>
        </div>
      </div>
    </Layout>
  )
}