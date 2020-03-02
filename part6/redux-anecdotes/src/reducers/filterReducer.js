const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.filter
    default:
      return state
  }
}

export const changeFilter = filter => {
  return {
    type: 'SET_FILTER',
    filter
  }
}

export default filterReducer
