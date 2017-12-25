export const withTryCatch = func => {
  return async (dispatch, getState) => {
    try {
      await func(dispatch, getState)
    } catch (error) {
      openAlertMessage(error)
      closeLoading()
    }
  }
}

export const openAlertMessage = messages => {
  return {}
}

export const closeLoading = () => {
  return {
    type: 'COMMON/LOADING/CLOSE'
  }
}
