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
      },
      placeholder: 'กรุณาเลือก'
    },
    certificateId: {
      label: 'เลขประจำตัวประชาชน',
      type: 'text',
      key: 'certificateId',
      name: 'certificateId',
      value: sampleState.certificateId,
      rules: {
        required: 'กรุณาระบุเลขประจำตัวประชาชน'
      },
      buttonOption: {
        color: 'blue',
        text: 'ตรวจสอบ'
      }
    },
    firstname: {
      label: 'ชื่อ',
      type: 'text',
      key: 'firstname',
      name: 'firstname',
      value: sampleState.firstname,
      rules: {
        required: 'กรุณากรอกชื่อ'
      }
    },
    middlename: {
      label: 'ชื่อกลาง',
      type: 'text',
      key: 'middlename',
      name: 'middlename',
      value: sampleState.middlename
    },
    lastname: {
      label: 'นามสกุล',
      type: 'text',
      key: 'lastname',
      name: 'lastname',
      value: sampleState.lastname,
      rules: {
        required: 'กรุณากรอกนามสกุล'
      }
    },
    gender: {
      label: 'เพศ',
      type: 'switch',
      key: 'gender',
      name: 'gender',
      value: sampleState.gender,
      options: masterDataState.genderOptions,
      rules: {
        required: 'กรุณาเลือก'
      }
    },
    birthDate: {
      label: 'วันเกิด',
      type: 'date',
      key: 'birthDate',
      name: 'birthDate',
      value: sampleState.birthDate,
      rules: {
        required: 'กรุณาระบุวันเกิด',
        allowSelectPreviousDate: true
      }
    }
  }
}

export default createForm
