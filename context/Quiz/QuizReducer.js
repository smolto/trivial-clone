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
    case 'SET_SELECT_CATEGORY_AGAIN':
      return {
        ...state,
        selectCategoryAgain: payload
      }
    case 'ADD_ANSWER':
      return {
        ...state,
        answers: [...state.answers, payload]
      }
    case 'RESET_ANSWER':
      return {
        ...state,
        answers: []
      }
    case 'SET_RESULT':
      return {
        ...state,
        result: payload
      }
    case 'SET_START_DATE':
      return {
        ...state,
        startDate: payload
      }
    case 'SET_END_DATE':
      return {
        ...state,
        endDate: payload
      }
    default:
      return state
  }
}
