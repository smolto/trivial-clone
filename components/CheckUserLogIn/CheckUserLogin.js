import { useRouter } from 'next/router'
import { useEffect } from 'react'

export const CheckUserLogin = ({ userLoggedIn, children }) => {
  const router = useRouter()
  useEffect(() => {
    if (userLoggedIn === false) {
      router.push({
        pathname: '/login'
      })
    }
  }, [userLoggedIn])

  return (
    <>
      { children }
    </>
  )
}
