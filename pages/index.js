import { useState } from 'react'
import { useRouter } from 'next/router'

import { useUser } from '@auth0/nextjs-auth0'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

import styles from './../styles/Home.module.css'

import { Layout } from '../components/Layout/Layout'
import { Toolbar } from '../components/Toolbar/Toolbar'

export default function Home ({ questions }) {
  const router = useRouter()
  const { user, error, isLoading } = useUser()
  const [isLogin, setIsLogin] = useState(true)

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>

  if (user) {
    return (
      <Layout>
        <Toolbar img={user.picture} nickname={user.nickname} />
        <button onClick={() => router.push('/api/auth/logout')}>Cerrar</button>
      </Layout>
    )
  }

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
                  onClick={() => setIsLogin(false)}
                >
                  Sign Up
                </span>
              </>
                )
              : (
              <>
                <span
                  className={styles['span-not-selected']}
                  onClick={() => setIsLogin(true)}
                >
                  Log In
                </span>
                <span className={styles['span-selected']}>Sign Up</span>
              </>
                )}
          </div>
          <div className="form-login">
            <div className={styles['form-login__item']}>
              <label>Username: </label>
              <input type="text" className="input" />
            </div>
            <div className={styles['form-login__item']}>
              <label>Email: </label>
              <input type="text" className="input" />
            </div>
            <div className={styles['form-login__submit']}>
              {isLogin === true
                ? (
                <button className="btn btn_primary">
                  <div className={styles['auth0-button']}>Log in</div>
                </button>
                  )
                : (
                <button className="btn btn_primary">
                  <div className={styles['auth0-button']}>Sign up</div>
                </button>
                  )}
            </div>
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

export async function getStaticProps () {
  const client = new ApolloClient({
    uri: process.env.API_URL,
    cache: new InMemoryCache()
  })

  const data = await client.query({
    query: gql`
      query MyQuery {
        queryQuestions {
          answers
          correct
          difficulty
          question
        }
      }
    `
  })
  return {
    props: {
      questions: data.data.queryQuestions
    }
  }
}
