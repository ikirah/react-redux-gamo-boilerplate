import * as ApplicationAction from './applicationAction'
import * as SampleAPI from '../apis/sample'
import { withTryCatch } from '../helpers/api'
import SampleSelector from '../selectors/sample'

export const submitForm = () => {
  return withTryCatch(async (dispatch, getState) => {
    const sampleState = getState().pages.sample
    dispatch(ApplicationAction.showLoading())
    const formData = SampleSelector.getFormDataToSubmit(sampleState)
    await SampleAPI.submitForm(formData)
    dispatch(ApplicationAction.hideLoading())
  })
}

export const searchCustomer = (certificateId) => {
  return withTryCatch((dispatch, getState) => {
    console.log('searchCustomer', certificateId)
  })
}
