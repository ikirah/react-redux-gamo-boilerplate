import MasterdataSelector from '../../selectors/masterdata'

const createForm = state => {
  const sampleState = state.pages.sample
  const masterDataState = state.masterdata
  const titleOptions = MasterdataSelector.getTitleOptions(masterDataState)
  return {
    title: {
      label: 'คำนำหน้า',
      type: 'select',
      key: 'title',
      name: 'title',
      value: sampleState.title,
      options: titleOptions,
      rules: {
        required: 'กรุณาเลือก'
      }
    },
    gender: {
      label: 'เพศ',
      type: 'radio',
      key: 'gender',
      name: 'gender',
      value: sampleState.gender,
      options: masterDataState.genderOptions,
      rules: {
        required: 'กรุณาเลือก'
      }
    }
  }
}

export default createForm
