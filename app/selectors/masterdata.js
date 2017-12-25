import { createSelector } from 'reselect'
import _ from 'lodash'

const getCustomerTitle = state => state.customerTitle

const getTitleOptions = createSelector([getCustomerTitle], titles => {
  return _.map(titles.configurationItems, title => {
    return {
      label: _.get(title, 'thDescription'),
      value: _.get(title, 'value')
    }
  })
})

export default {
  getTitleOptions
}
