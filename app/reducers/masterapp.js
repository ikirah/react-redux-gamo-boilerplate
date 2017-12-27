const getInitialState = () => {
  return {
    showLoading: false,
    showError: false,
    errorDetail: {
      thMessage: '',
      enMessage: '',
      technicalMessage: ''
    }
  }
}

const masterapp = (state = getInitialState(), action) => {
  switch (action.type) {
    case 'APPLICATION/LOADING/SHOW': {
      return {
        ...state,
        showLoading: true
      }
    }
    case 'APPLICATION/LOADING/HIDE': {
      return {
        ...state,
        showLoading: false
      }
    }
    case 'APPLCATION/ERROR/SHOW': {
      return {
        ...state,
        showError: true,
        errorDetail: { ...action.error }
      }
    }
    case 'APPLCATION/ERROR/HIDE': {
      return {
        ...state,
        showError: false
      }
    }
    default: {
      return state
    }
  }
}

export default masterapp
