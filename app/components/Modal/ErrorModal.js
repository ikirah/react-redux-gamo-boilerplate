import 'react-responsive-modal/lib/react-responsive-modal.css'
import Modal from 'react-responsive-modal/lib/css'
import React, { Component } from 'react'

export default class ErrorModal extends Component {
  render() {
    return (
      <Modal open onClose={this.onCloseModal} little>
        <h2>Simple centered modal</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus hendrerit venenatis.
          Pellentesque sit amet hendrerit risus, sed porttitor quam.
        </p>
      </Modal>
    )
  }
}
