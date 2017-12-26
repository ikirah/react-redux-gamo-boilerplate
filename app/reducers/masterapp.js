const getInitialState = () => {
  return {
    showLoading: false
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
    default: {
      return state
    }
  }
}

export default masterapp
