import 'react-responsive-modal/lib/react-responsive-modal.css'
import Modal from 'react-responsive-modal/lib/css'
import React, { Component } from 'react'
import _ from 'lodash'

export default class ConfirmModal extends Component {
  render() {
    const { options, onClose, open } = this.props
    const _description = _.get(options, 'description', '')
    return (
      <Modal open={open} little showCloseIcon={false} closeOnEsc={false} closeOnOverlayClick={false} onClose={onClose}>
        <h3>{_.get(options, 'title', 'ยืนยันการทำรายการใช่หรือไม่')}</h3>
        <div className='row'>
          <div className='D-12'>{_description}</div>
        </div>
        {_description !== '' && <br />}
        <div className='row'>
          <div className='D-12 _right'>
            <div className='button-inline'>
              <a href='#' className={`button ${_.get(options, 'cancelColor', 'red')}`} onClick={onClose}>
                {_.get(options, 'cancelText', 'ยกเลิก')}
              </a>
              <a href='#' className={`button ${_.get(options, 'confirmColor', 'green')}`}>
                {_.get(options, 'confirmText', 'ยืนยัน')}
              </a>
            </div>
          </div>
        </div>
      </Modal>
    )
  }
}
