import React, { Component } from 'react'
import _ from 'lodash'
import 'react-responsive-modal/lib/react-responsive-modal.css'
import Modal from 'react-responsive-modal/lib/css'

export default class ErrorModal extends Component {
  state = {
    showTechnicalError: false
  }

  handleClickTechnicalError = () => {
    const { showTechnicalError } = this.state
    this.setState({
      showTechnicalError: !showTechnicalError
    })
  }

  render() {
    const { showTechnicalError } = this.state
    const { onClose, errorDetail } = this.props
    const { displayMessages } = errorDetail
    let iconClass = 'fa-plus-square'
    if (showTechnicalError) {
      iconClass = 'fa-minus-square'
    }
    const errorType = _.get(displayMessages, 'type', 'ERROR')
    let errorTypeIconColor = 'text-red'
    if (errorType !== 'ERROR') {
      errorTypeIconColor = 'text-yellow'
    }
    return (
      <Modal open onClose={onClose} little closeOnEsc={false} closeOnOverlayClick={false}>
        <h3>
          <i className={`fa fa-exclamation-circle ${errorTypeIconColor}`} /> ERROR
        </h3>
        <h4>{_.get(displayMessages, 'message', '')}</h4>
        <p>TH: {_.get(displayMessages, 'th-message', '')}</p>
        <p>EN: {_.get(displayMessages, 'en-message', '')}</p>
        <a onClick={() => this.handleClickTechnicalError()} className='text-link'>
          <i className={`fa text-red + ${iconClass}`} /> Technical Error
        </a>
        {showTechnicalError && (
          <div>
            <p>{_.get(displayMessages, 'trxId', '') === '' ? '' : `trxId: ${_.get(displayMessages, 'trxId', '')}`}</p>
            <p>{_.get(displayMessages, 'technical-message', 'ERROR')}</p>
          </div>
        )}
      </Modal>
    )
  }
}
