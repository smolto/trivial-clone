import React, { useReducer } from 'react'

import UserContext from './UserContext'
import UserReducer from './UserReducer'

import { useConfig } from '../../hooks/useConfig'

const UserState = (props) => {
  const publicRuntimeConfig = useConfig()
  const initialState = {
    user: {}
  }

  const [state, dispatch] = useReducer(UserReducer, initialState)

  const setUserByEmail = async (email) => {
    try {
      const body = {
        email
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
        `${publicRuntimeConfig.AUTH0_BASE_URL}/api/graphql/getUser`,
        settings
      )
      const response = await res.json()
      dispatch({ type: 'SET_USER', payload: response.data.queryUser[0] })
    } catch (error) {
      console.error(error)
    }
  }

  const setUser = async (user) => {
    try {
      console.log(user)
      dispatch({ type: 'SET_USER', payload: user })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        setUserByEmail,
        setUser
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}

export default UserState
