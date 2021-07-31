import { useRouter } from 'next/router'
import styles from './UserToolbar.module.css'

export const UserToolbar = ({ user }) => {
  const router = useRouter()
  return (
    <>
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
    </>
  )
}
