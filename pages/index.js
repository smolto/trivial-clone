import { useUser } from '@auth0/nextjs-auth0'

export default function Home () {
  const { user, error, isLoading } = useUser()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>

  if (user) {
    return (
      user && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <a href="/api/auth/logout">Logout</a>
      </div>
      )
    )
  }

  return (
    <a href="/api/auth/login">Login</a>
  )
}
