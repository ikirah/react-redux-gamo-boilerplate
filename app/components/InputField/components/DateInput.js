import React from 'react'
import { isEmpty, pick } from '../../../helpers/inputForm'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css'
import moment from 'moment'
import _ from 'lodash'

import MomentLocaleUtils, { formatDate, parseDate } from 'react-day-picker/moment'

import 'moment/locale/th'

export default class DateInput extends React.PureComponent {
  static defaultProps = {
    name: 'input',
    tabIndex: 0,
    label: '',
    value: '',
    inputProps: {},
    labelProps: {},
    disabled: false,
    focus: false,
    placeholder: '',
    type: 'text'
  }

  renderCustomElement = () => {
    const {
      label,
      value,
      disabled,
      focus,
      placeholder,
      name,
      errorMessage,
      handleChange,
      handleKeyCode,
      handleBlur
    } = this.props
    let classInput = 'form-input'
    if (errorMessage !== '') {
      classInput = 'form-input error'
    }
    const input = (
      <input
        ref={input => {
          if (input != null && focus) {
            input.focus()
          }
        }}
        className={classInput}
        type='text'
        name={name}
        value={value}
        maxLength={this.props.maxLength}
        placeholder={placeholder}
        disabled={disabled}
        onKeyUp={e => handleKeyCode(e)}
        onChange={e => handleChange(e.target.value)}
        onBlur={e => handleBlur(e.target.value)}
      />
    )
    return this.props.customElement(input, label, errorMessage)
  }
  onChange = value => {
    if (value) {
      const dateValue = moment(value, 'llll')
        .format('DD/MM/YYYY')
        .toString()
      this.props.handleChange(dateValue)
    } else {
      this.props.handleChange('')
    }
  }

  render() {
    const {
      label,
      value,
      disabled,
      remark,
      focus,
      placeholder,
      name,
      errorMessage,
      handleChange,
      handleKeyCode,
      handleBlur,
      rules,
      format
    } = this.props

    if (this.props.customElement) {
      return this.renderCustomElement()
    }

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
    const _format = _.get(this.props, 'format', 'DD/MM/YYYY')
    return (
      <div className={`box-form-input ` + requiredLabel}>
        <label htmlFor={label} className='form-label'>
          {label} {!isEmpty(remark) && <span className='remark'>{remark}</span>}
        </label>
        <div className={classInput}>
          <DayPickerInput
            formatDate={formatDate}
            parseDate={parseDate}
            format={_format}
            placeholder={placeholder || `${formatDate(new Date(), _format, 'th')}`}
            dayPickerProps={{
              locale: 'th',
              localeUtils: MomentLocaleUtils
            }}
            onDayChange={this.onChange}
          />
          {renderErrorMessage !== '' && <div className='validation-label'>{renderErrorMessage}</div>}
        </div>
      </div>
    )
  }
}
