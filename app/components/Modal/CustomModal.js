import 'react-responsive-modal/lib/react-responsive-modal.css'
import Modal from 'react-responsive-modal/lib/css'
import React, { Component } from 'react'

export default class ConfirmModal extends Component {
  render() {
    const { options, onClose } = this.props
    const { description, title } = options
    return (
      <Modal open little onClose={onClose}>
        <h3>{title}</h3>
        <div className='row'>
          <div className='D-12'>{description}</div>
        </div>
      </Modal>
    )
  }
}
