export default function QuizReducer (state, action) {
  const { payload, type } = action

  switch (type) {
    case 'SET_CATEGORY':
      return {
        ...state,
        category: payload
      }
    case 'SET_QUESTIONS':
      return {
        ...state,
        questions: payload
      }
    default:
      return state
  }
}
