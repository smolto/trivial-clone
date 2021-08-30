import { useEffect, useContext } from 'react'

import UserContext from '../../context/User/UserContext'

import { getUserByEmail } from '../../services/UserService'
import { useConfig } from '../../hooks/useConfig'

export const CheckUserSet = ({ children }) => {
  const publicRuntimeConfig = useConfig()
  const { setUser } = useContext(UserContext)

  useEffect(() => {
    async function getUser (_email) {
      const res = await getUserByEmail(
        publicRuntimeConfig.AUTH0_BASE_URL,
        _email
      )

      setUser(res)
    }
    const email = JSON.parse(localStorage.getItem('userEmail'))
    if (email !== null) {
      getUser(email)
    }
  }, [])

  return (
    <>
      { children }
    </>
  )
}
