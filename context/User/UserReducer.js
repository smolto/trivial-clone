export default (state, action) => {
  const { payload, type } = action

  switch (type) {
    case 'SET_USER':
      return {
        ...state,
        user: payload
      }
    default:
      return state
  }
}
