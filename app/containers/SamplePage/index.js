import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { InputField } from '../../components'
import { isValidForm } from '../../helpers/inputForm'
import createForm from './createForm'
import { bindFormValidation } from 'redux-form-manager'
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
const actions = {}
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
          <div className='D-3'>{renderInputField(formData.title)}</div>
          <div className='D-3'>{renderInputField(formData.gender)}</div>
        </div>
      </div>
    )
  }
}

export default SamplePage
