const initialState = {
  title: '',
  gender: ''
}

const sample = (state = initialState, action) => {
  switch (action.type) {
    case 'SAMPLE/FORM_CHANGE': {
      return {
        ...state,
        [action.key]: action.value
      }
    }
    default: {
      return state
    }
  }
}

export default sample
