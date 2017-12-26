import React, { PropTypes } from 'react'
import { size, isEmpty, toNumber, toNumeral, pick, checkNumberFormat } from '../../../helpers/inputForm'

export default class NumberInput extends React.PureComponent {
  static defaultProps = {
    name: 'input',
    format: '',
    tabIndex: 0,
    label: '',
    value: '',
    inputProps: {},
    labelProps: {},
    disabled: false,
    type: 'text'
  }

  componentDidMount() {
    const { value, format, handleBlur } = this.props
    const numberValue = Number(toNumber(value))
    if (!isEmpty(value) && !isEmpty(format) && isFinite(toNumber(value))) {
      handleBlur(this.getValueFormat(toNumeral(numberValue.toString(), format)))
    }
  }

  getValueFormat = value => {
    const { format } = this.props
    const valueTopNumber = toNumber(value)
    const splitFormat = format.split('.')
    const splitValue = valueTopNumber.split('.')
    const decimalFormat = splitFormat[1] ? splitFormat[1] : ''
    const decimalValue = splitValue[1] ? splitValue[1] : ''
    if (decimalFormat !== '' && decimalFormat.length !== decimalValue.length) {
      let decimal = decimalValue
      for (let i = 1; i <= decimalFormat.length - decimalValue.length; i++) decimal += '0'
      return isEmpty(value) ? '' : `${splitValue[0]}.${decimal}`
    } else {
      return valueTopNumber
    }
  }

  onInputChange = value => {
    const { handleChange, format } = this.props
    const valueToNumber = toNumber(value)
    const emptyValue = value === ''
    if (emptyValue) {
      handleChange(value)
    } else if (checkNumberFormat(valueToNumber, format)) {
      handleChange(valueToNumber)
    } else if (/^-?\d+(\.)?(\d+)?$/.test(value)) {
      handleChange(valueToNumber)
    } else if (size(valueToNumber) < size(this.props.value)) {
      handleChange(valueToNumber)
    }
  }

  handleOnBlur = value => {
    const { handleBlur } = this.props
    if (handleBlur) handleBlur(this.getValueFormat(value))
  }

  renderCustomElement = () => {
    const {
      label,
      value,
      disabled,
      focus,
      format,
      placeholder,
      name,
      errorMessage,
      inputProps,
      tabIndex,
      handleChange,
      handleKeyCode,
      handleBlur
    } = this.props
    let classInput = 'form-input'
    if (!isEmpty(errorMessage)) {
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
        value={!isEmpty(format) ? toNumeral(value, format) : value}
        placeholder={placeholder}
        disabled={disabled}
        maxLength={this.props.maxLength}
        onKeyUp={e => handleKeyCode(e)}
        onChange={e => this.onInputChange(e.target.value)}
        onBlur={e => this.handleOnBlur(e.target.value)}
      />
    )
    return this.props.customElement(input, label, errorMessage)
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
      format,
      tabIndex,
      errorMessage,
      inputProps,
      handleChange,
      handleKeyCode,
      rules
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

    return (
      <div className={`box-form-input ` + requiredLabel}>
        <label htmlFor={label} className='form-label'>
          {label} {!isEmpty(remark) && <span className='remark'>{remark}</span>}
        </label>
        <div className={classInput}>
          <input
            ref={input => {
              if (input != null && focus) {
                input.focus()
              }
            }}
            className='form-input'
            type='text'
            name={name}
            value={!isEmpty(format) ? toNumeral(value, format) : value}
            placeholder={placeholder}
            disabled={disabled}
            maxLength={this.props.maxLength}
            onKeyUp={e => handleKeyCode(e)}
            onChange={e => this.onInputChange(e.target.value)}
            onBlur={e => this.handleOnBlur(e.target.value)}
          />
          {renderErrorMessage !== '' && <div className='validation-label'>{renderErrorMessage}</div>}
        </div>
        {this.props.children}
      </div>
    )
  }
}
