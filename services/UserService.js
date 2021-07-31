/**
 *
 * @param {String} _url
 * @param {String} _email
 * @returns {User Object} ==> User found
 * @returns {} ==> User not found
 * @returns null ==> Server Down
 */
export const getUserByEmail = async (_url, _email) => {
  const body = {
    email: _email
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
    `${_url}/api/graphql/getUser`,
    settings
  )

  if (res.status === 200) {
    const result = await res.json()
    return result.data.queryUser[0]
  } else if (res.status === 0) {
    return null
  } else {
    return false
  }
}

/**
 *
 * @param {String} _url
 * @param {String} _email
 * @param {String} _username
 * @param {String} _image
 * @returns request status
 */
export const createUser = async (_url, _email, _username, _image) => {
  const body = {
    email: _email,
    username: _username,
    image: _image
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
    `${_url}/api/graphql/createUser`,
    settings
  )

  return res.status
}

/**
 *
 * @param {String} _url
 * @param {String} _email
 * @param {String} _username
 * @param {String} _image
 * @returns request status
 */
export const updateUser = async (_url, _email, _username, _image) => {
  const body = {
    email: _email,
    username: _username,
    image: _image
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
    `${_url}/api/graphql/updateUser`,
    settings
  )

  return res.status
}
