import _ from 'lodash'
import * as ApplicationAction from '../actions/applicationAction'
import { convertJarvisError } from './error'

export const withTryCatch = func => {
  return async (dispatch, getState) => {
    try {
      await func(dispatch, getState)
    } catch (error) {
      dispatch(ApplicationAction.hideLoading())
      let _error = error
      if (/JVS/.test(_.get(error, 'code'))) {
        _error = convertJarvisError(error)
      }
      dispatch(ApplicationAction.openError(_error))
    }
  }
}
