import { extractResponseData } from '../helpers/api'
import * as MasterdataAPI from '../apis/masterdata'

export const getCustomerType = () => {
  return dispatch => {
    const data = extractResponseData(MasterdataAPI.getCustomerType())
    dispatch({
      type: 'MASTERDATA/GET/CUSTOMERTYPE',
      data
    })
  }
}

export const getCustomerTitle = () => {
  return dispatch => {
    const data = extractResponseData(MasterdataAPI.getCustomerTitle())
    dispatch({
      type: 'MASTERDATA/GET/CUSTOMERTITLE',
      data
    })
  }
}
