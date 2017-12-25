import { combineReducers } from 'redux'
import masterdata from './masterdata'
import masterapp from './masterapp'
import pages from './pages'

export default combineReducers({
  masterdata,
  masterapp,
  pages
})
