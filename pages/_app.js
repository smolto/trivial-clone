import { useEffect, useState } from 'react'

import { UserProvider } from '@auth0/nextjs-auth0'
import UserState from '../context/User/UserState'
import QuizState from '../context/Quiz/QuizState'

import '../styles/global/globals.css'
import '../styles/global/button.css'
import '../styles/global/input.css'

function MyApp ({ Component, pageProps }) {
  const [userLoggedIn, setUserLoggedIn] = useState(null)
  useEffect(() => {
    if (localStorage.getItem('userLoggedIn') === null) {
      setUserLoggedIn(false)
    } else {
      if (localStorage.getItem('userEmail') === null) {
        setUserLoggedIn(false)
      } else {
        setUserLoggedIn(true)
      }
    }
  }, [])
  return (
    <UserState>
      <QuizState>
        <UserProvider>
          <Component
            {...pageProps}
            userLoggedIn={userLoggedIn}
            setUserLoggedIn={setUserLoggedIn}
          />
        </UserProvider>
      </QuizState>
    </UserState>
  )
}

export default MyApp
