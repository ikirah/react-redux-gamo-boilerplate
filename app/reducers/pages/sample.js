import moment from 'moment'

const initialState = {
  title: '',
  firstname: '',
  middlename: '',
  lastname: '',
  gender: '',
  certificateId: ''
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
