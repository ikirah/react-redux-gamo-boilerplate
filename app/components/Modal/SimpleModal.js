import 'react-responsive-modal/lib/react-responsive-modal.css'
import Modal from 'react-responsive-modal/lib/css'
import React, { Component } from 'react'
import _ from 'lodash'

export default class SimpleModal extends Component {
  render() {
    const { options, onClose, open } = this.props
    return (
      <Modal open={open} little onClose={onClose} closeOnEsc={false}>
        <h3>{_.get(options, 'title', '')}</h3>
        <div className='row'>
          <div className='D-12'>{_.get(options, 'description', '')}</div>
        </div>
        {this.props.children}
      </Modal>
    )
  }
}
