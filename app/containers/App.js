import React, { Component } from 'react'
import { Link } from 'react-router'
import Helmet from 'react-helmet'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as ApplicationAction from '../actions/applicationAction'
import { Loading } from '../components'
import { ErrorModal } from '../components/Modal'

const actions = {
  ...ApplicationAction
}

function mapStateToProps(state) {
  return {
    showLoading: state.masterapp.showLoading,
    showError: state.masterapp.showError,
    errorDetail: state.masterapp.errorDetail
  }
}
function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) }
}

@connect(mapStateToProps, mapDispatchToProps)
class App extends Component {
  componentDidMount = () => {
    const { actions } = this.props
    actions.initApplication()
  }
  render() {
    const { showLoading, showError, actions, errorDetail } = this.props
    return (
      <div>
        <Helmet title='React Redux boilerplate' />
        <header className='main-header'>
          <nav>
            <ul className='navigation'>
              <li>
                <Link activeClassName='active' onlyActiveOnIndex to='/'>
                  Home
                </Link>
              </li>
              <li>
                <Link activeClassName='active' to='/form-sample'>
                  Form Sample
                </Link>
              </li>
              <li>
                <Link activeClassName='active' to='/page2'>
                  Page2
                </Link>
              </li>
              <li>
                <Link activeClassName='active' to='/style-guide'>
                  Style Guide
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        {showLoading && <Loading />}
        {showError && <ErrorModal onClose={actions.closeError} errorDetail={errorDetail} />}
        {this.props.children}
      </div>
    )
  }
}

export default App
