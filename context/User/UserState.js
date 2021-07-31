import React, { useReducer } from 'react'

import UserContext from './UserContext'
import UserReducer from './UserReducer'

export default function UserState (props) {
  const initialState = {
    user: {}
  }

  const [state, dispatch] = useReducer(UserReducer, initialState)

  const setUser = async (user) => {
    try {
      dispatch({ type: 'SET_USER', payload: user })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        setUser
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}
