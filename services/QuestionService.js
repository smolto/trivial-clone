/**
 *
 * @param {String} _url
 * @param {String} _email
 * @returns {User Object} ==> User found
 * @returns {} ==> User not found
 * @returns null ==> Server Down
 */
export const getQuestions = async (_url, _category) => {
  const body = {
    category: _category
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
    `${_url}/api/graphql/getQuestions`,
    settings
  )

  if (res.status === 200) {
    const result = await res.json()
    return result
  } else if (res.status === 0) {
    return null
  } else {
    return false
  }
}
