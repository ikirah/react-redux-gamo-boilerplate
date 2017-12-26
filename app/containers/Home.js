import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { SimpleModal, ConfirmModal } from '../components/Modal'
import * as ApplicationAction from '../actions/applicationAction'

function mapStateToProps(state) {
  return {}
}

// Action
const actions = {
  ...ApplicationAction
}
function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Home extends React.Component {
  state = {
    isOpenModal: false,
    isOpenConfirmModal: false
  }

  onClickOpenModal = () => {
    this.setState({
      isOpenModal: true
    })
  }

  onCloseModal = () => {
    this.setState({
      isOpenModal: false
    })
  }

  onClickOpenConfirmModal = () => {
    this.setState({
      isOpenConfirmModal: true
    })
  }

  onCloseConfirmModal = () => {
    this.setState({
      isOpenConfirmModal: false
    })
  }

  render() {
    const confirmModalOptions = {
      confirmText: 'ตกลง'
    }
    const informationModalOptions = {
      title: 'Simple Information Modal',
      description: `this is modal description`
    }
    const { isOpenModal, isOpenConfirmModal } = this.state
    return (
      <div className='_center'>
        <br />
        <h1>Hello, I am React</h1>
        <div className='button-inline'>
          <a href='#' onClick={() => this.onClickOpenConfirmModal()} className='button green'>
            Confirm Modal
          </a>
          <a href='#' onClick={() => this.onClickOpenModal()} className='button blue'>
            Information Modal
          </a>
          <ConfirmModal open={isOpenConfirmModal} onClose={this.onCloseConfirmModal} options={confirmModalOptions} />
          <SimpleModal open={isOpenModal} options={informationModalOptions} onClose={this.onCloseModal}>
            <div className='row'>
              <div className='D-12'>
                this is children of information modal<br />
                <button className='button blue'>Dummy Button</button>
              </div>
            </div>
          </SimpleModal>
        </div>
      </div>
    )
  }
}
