import React from 'react'
import _ from 'lodash'
import { isEmpty } from '../../../helpers/inputForm'
import 'rc-calendar/assets/index.css'
import PropTypes from 'prop-types'
import Calendar from 'rc-calendar'
import DatePicker from 'rc-calendar/lib/Picker'
import thLocale from 'rc-calendar/lib/locale/th_TH'

import moment from 'moment'
import 'moment/locale/th'

const now = moment()

now.locale('th')

const defaultCalendarValue = now.clone()

const disabledDate = current => {
  if (!current) {
    // allow empty select
    return false
  }
  const date = moment()
  date.hour(0)
  date.minute(0)
  date.second(0)
  return current.valueOf() < date.valueOf() // can not select days before today
}

export default class DateInput extends React.Component {
  static propTypes = {
    defaultValue: PropTypes.object
  }

  state = {
    showTime: false,
    showDateInput: true,
    disabled: false,
    value: this.props.defaultValue
  }

  getFormat = () => {
    const { format } = this.props
    return format || 'DD/MM/YYYY'
  }

  onChange = value => {
    this.setState({
      value
    })
    if (value) {
      this.props.handleChange(value)
    }
  }

  onShowDateInputChange = e => {
    this.setState({
      showDateInput: e.target.checked
    })
  }
  render() {
    const { label, value, disabled, remark, placeholder, name, errorMessage, rules } = this.props
    const allowSelectPreviousDate = _.get(rules, 'allowSelectPreviousDate', true) ? null : disabledDate

    const calendar = (
      <Calendar
        locale={thLocale}
        style={{ zIndex: 1000 }}
        dateInputPlaceholder={placeholder}
        disabledTime={null}
        defaultValue={defaultCalendarValue}
        showDateInput
        disabledDate={allowSelectPreviousDate}
        selectedValue={value}
      />
    )

    let renderErrorMessage = ''
    let requiredLabel = ''
    let classInput = 'wrap-form-input'
    if (errorMessage !== '') {
      classInput = 'wrap-form-input error'
      renderErrorMessage = <div className='error-message'>{errorMessage}</div>
    }

    if (!isEmpty(rules)) {
      if (!isEmpty(rules.required)) {
        requiredLabel = 'imp'
      }
    }

    return (
      <div className={`box-form-input ` + requiredLabel}>
        <label htmlFor={name} className='form-label'>
          {label} {!isEmpty(remark) && <span className='remark'>{remark}</span>}
        </label>
        <div className={classInput}>
          <DatePicker
            animation='slide-up'
            disabled={disabled}
            calendar={calendar}
            value={value}
            onChange={this.onChange}
          >
            {({ value }) => {
              return (
                <span tabIndex='0'>
                  <input
                    placeholder={placeholder}
                    disabled={disabled}
                    readOnly
                    tabIndex='-1'
                    className='form-input'
                    value={(value && value.format(this.getFormat())) || ''}
                  />
                </span>
              )
            }}
          </DatePicker>
          {renderErrorMessage !== '' && <div className='validation-label'>{renderErrorMessage}</div>}
        </div>
      </div>
    )
  }
}
