const initialState = {
  customerType: {},
  customerTitle: {},
  genderOptions: [
    {
      label: 'ชาย',
      value: 'gentleman'
    },
    {
      label: 'หญิง',
      value: 'lady'
    }
  ]
}

const masterdata = (state = initialState, action) => {
  switch (action.type) {
    case 'MASTERDATA/GET/CUSTOMERTYPE': {
      return {
        ...state,
        customerType: action.data
      }
    }
    case 'MASTERDATA/GET/CUSTOMERTITLE': {
      return {
        ...state,
        customerTitle: action.data
      }
    }
    default: {
      return state
    }
  }
}

export default masterdata
