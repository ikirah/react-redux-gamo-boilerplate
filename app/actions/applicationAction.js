import { push } from 'react-router-redux'
import { withTryCatch } from '../helpers/common'
import * as MasterdataAction from './masterdataAction'

export const goToPage = path => dispatch => dispatch(push(`/${path}`))

export const initApplication = () => {
  return withTryCatch((dispatch, getState) => {
    dispatch(showLoading())
    dispatch(MasterdataAction.getCustomerType())
    dispatch(MasterdataAction.getCustomerTitle())
    dispatch(hideLoading())
  })
}

export const showLoading = () => {
  return {
    type: 'APPLICATION/LOADING/SHOW'
  }
}

export const hideLoading = () => {
  return {
    type: 'APPLICATION/LOADING/HIDE'
  }
}

export const openError = error => {
  return {
    type: 'APPLCATION/ERROR/SHOW',
    error
  }
}

export const closeError = () => {
  return {
    type: 'APPLCATION/ERROR/HIDE'
  }
}
