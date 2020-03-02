const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    default:
      return state
  }
}

let timeoutID = null

export const setNotification = (notification, duration) => {
  return dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification
    })
    if (timeoutID) {
      clearTimeout(timeoutID)
    }
    timeoutID = setTimeout(() => {
      dispatch({
        type: 'SET_NOTIFICATION',
        notification: null
      })
      timeoutID = null
    }, duration * 1000)
  }
}

export default notificationReducer
