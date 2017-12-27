import { createSelector } from 'reselect'

const getState = state => state

const getFormDataToSubmit = createSelector([getState], formData => {
  return {
    certificateId: formData.certificateId,
    firstname: formData.firstname,
    middlename: formData.middlename,
    lastname: formData.lastname,
    gender: formData.gender,
    title: formData.title.value
  }
})

export default {
  getFormDataToSubmit
}
