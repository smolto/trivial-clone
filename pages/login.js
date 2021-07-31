import { useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import UserContext from '../context/User/UserContext'

import { useUser } from '@auth0/nextjs-auth0'

import styles from './../styles/Login.module.css'

import { Layout } from '../components/Layout/Layout'
import { Toolbar } from '../components/Toolbar/Toolbar'
import { Alert } from '../components/Alert/Alert'

import { useConfig } from '../hooks/useConfig'

import {
  getUserByEmail,
  createUser,
  updateUser
} from './../services/UserService'

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
  const publicRuntimeConfig = useConfig()

  const resetState = () => {
    setUserEmail('')
    setUsername('')
    setShowAlert(false)
  }

  const getUser = async (_email) => {
    const res = await getUserByEmail(
      publicRuntimeConfig.AUTH0_BASE_URL,
      _email
    )

    if (res === null) {
      return null
    } else if (res === false) {
      return false
    } else {
      return res
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    console.log(isLogin)

    if (isLogin === true) {
      const res = await getUser(userEmail)

      if (res === null) {
        setAlertMsg('Server internal error!! 🤯')
        setShowAlert(true)
        setTypeAlert('dander')
      } else if (res === false) {
        setAlertMsg(`Invalid email! ${userEmail} does not exist 🤯`)
        setShowAlert(true)
        setTypeAlert('danger')
      } else {
        setAlertMsg('Perfect! User logged in successfully 😁')
        setShowAlert(true)
        setTypeAlert('success')

        localStorage.setItem('userLoggedIn', JSON.stringify(true))
        localStorage.setItem('userEmail', JSON.stringify(userEmail))
        setUser(res)
        setUserLoggedIn(true)
        router.push({
          pathname: '/'
        })
      }
    } else {
      const res = await getUser(userEmail)

      if (res === null) {
        setAlertMsg('Server internal error!! 🤯')
        setShowAlert(true)
        setTypeAlert('dander')
      } else if (res === false) {
        const res = await createUser(
          publicRuntimeConfig.AUTH0_BASE_URL,
          userEmail,
          username,
          '/user-img.svg'
        )
        if (res === 200) {
          localStorage.setItem('userLoggedIn', JSON.stringify(true))
          localStorage.setItem('userEmail', JSON.stringify(userEmail))

          setUser({
            email: userEmail,
            username: username,
            image: '/user-img.svg'
          })
          setUserLoggedIn(true)
          router.push({
            pathname: '/'
          })
        } else {
          setAlertMsg('Server internal error!! 🤯')
          setShowAlert(true)
          setTypeAlert('dander')
        }
      } else {
        setAlertMsg(`Invalid email! ${userEmail} already exists 🤯`)
        setShowAlert(true)
        setTypeAlert('danger')
      }
    }
  }

  const checkIfUserAlreadyExist = async () => {
    let isOk = false
    const res = await getUserByEmail(
      publicRuntimeConfig.AUTH0_BASE_URL,
      user.email
    )

    if (res === null) {
      setAlertMsg('Server internal error!! 🤯')
      setShowAlert(true)
      setTypeAlert('dander')
    } else if (res === false) {
      const res = await createUser(
        publicRuntimeConfig.AUTH0_BASE_URL,
        user.email,
        user.nickname,
        user.picture
      )
      if (res === 200) {
        isOk = true
      } else {
        setAlertMsg('Server internal error!! 🤯')
        setShowAlert(true)
        setTypeAlert('dander')
      }
    } else {
      const res = await updateUser(
        publicRuntimeConfig.AUTH0_BASE_URL,
        user.email,
        user.nickname,
        user.picture
      )

      if (res === 200) {
        isOk = true
      } else {
        setAlertMsg('Server internal error!! 🤯')
        setShowAlert(true)
        setTypeAlert('dander')
      }
    }

    if (isOk === true) {
      localStorage.setItem('userLoggedIn', JSON.stringify(true))
      localStorage.setItem('userEmail', JSON.stringify(user.email))

      setUser({
        email: user.email,
        username: user.nickname,
        image: user.picture
      })
      setUserLoggedIn(true)
      router.push({
        pathname: '/'
      })
    }
  }

  useEffect(() => {
    if (user !== undefined || userLoggedIn === true) {
      checkIfUserAlreadyExist()
    }
  }, [user])

  return (
    <Layout
      title='Login'
    >
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
              {showAlert === true
                ? (
                <div className={styles['form-login__item-alert']}>
                  <Alert text={alertMsg} type={typeAlert} />
                </div>
                  )
                : null}
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
