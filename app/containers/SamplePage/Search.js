import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as ApplicationAction from '../../actions/applicationAction'
import * as SampleAction from '../../actions/sampleAction'
// ======================================================
// Components
// ======================================================
import { InputWithButton } from '../../components'
// ======================================================
// Containers
// ======================================================

// ======================================================
// Actions
// ======================================================

// State
function mapStateToProps(state) {
  const samplePageState = state.pages.sample
  return {
    certificateId: samplePageState.certificateId
  }
}

// Action
const actions = {
  ...ApplicationAction,
  ...SampleAction
}
function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) }
}

@connect(mapStateToProps, mapDispatchToProps)
class Search extends Component {
  renderInputWithButton = (fieldData, updateValue) => {
    const { certificateId, actions } = this.props
    return (
      <InputWithButton
        fieldData={fieldData}
        onChange={updateValue}
        onClick={() => actions.searchCustomer(certificateId)}
      />
    )
  }

  render() {
    const { formData, renderInputField } = this.props
    return (
      <div className='row'>
        <div className='D-3'>{renderInputField(formData.certificateId, this.renderInputWithButton)}</div>
      </div>
    )
  }
}

export default Search
