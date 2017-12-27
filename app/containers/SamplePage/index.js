import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { InputField } from '../../components'
import { isValidForm } from '../../helpers/inputForm'
import createForm from './createForm'
import { bindFormValidation } from 'redux-form-manager'
import * as ApplicationAction from '../../actions/applicationAction'
import * as SampleAction from '../../actions/sampleAction'
// ======================================================
// Components
// ======================================================

// ======================================================
// Containers
// ======================================================

// ======================================================
// Actions
// ======================================================

// State
function mapStateToProps(state) {
  return {}
}

// Action
const actions = {
  ...ApplicationAction,
  ...SampleAction
}
function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) }
}

const mapStateToValidationPriority = state => {
  return []
}

const afterFieldChange = (dispatch, state) => {
  return {}
}

const options = {
  actionType: 'SAMPLE/FORM_CHANGE',
  formData: state => createForm(state),
  renderUIInputField: (fieldData, updateValue) => {
    return <InputField {...fieldData} onChange={updateValue} />
  }
}

@bindFormValidation(options, afterFieldChange, mapStateToValidationPriority)
@connect(mapStateToProps, mapDispatchToProps)
class SamplePage extends Component {
  render() {
    const { formData, renderInputField, firstError } = this.props
    return (
      <div className='container'>
        <h1>Form Example</h1>
        <div className='row'>
          <div className='D-2'>{renderInputField(formData.certificateId)}</div>
          <div className='D-3'>{renderInputField(formData.gender)}</div>
        </div>
        <div className='row'>
          <div className='D-2'>{renderInputField(formData.title)}</div>
          <div className='D-3'>{renderInputField(formData.firstname)}</div>
          <div className='D-2'>{renderInputField(formData.middlename)}</div>
          <div className='D-3'>{renderInputField(formData.lastname)}</div>
        </div>
        <div className='row'>
          <div className='D-6'>
            <div className='font-desc red'>{firstError}</div>
            <div className='button-inline'>
              <button className='button gray' onClick={() => this.props.actions.goToPage('/')}>
                ยกเลิก
              </button>
              <button
                className='button green'
                onClick={() => this.props.actions.submitForm()}
                disabled={isValidForm(firstError)}
              >
                ยืนยัน
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SamplePage
