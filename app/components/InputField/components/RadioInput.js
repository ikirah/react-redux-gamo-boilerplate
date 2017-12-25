import React from 'react'
import { isEmpty, pick } from '../../../helpers/inputForm'

export default class RadioInput extends React.PureComponent {
  static defaultProps = {
    name: 'input',
    tabIndex: 0,
    label: '',
    value: '',
    options: [],
    inputProps: {},
    labelProps: {},
    disabled: false,
    focus: false,
    type: 'text'
  }

  renderCustomElement = () => {
    const {
      label,
      value,
      disabled,
      focus,
      options,
      name,
      errorMessage,
      inputProps,
      handleChange,
      handleBlur
    } = this.props

    let classInput = 'form-input'
    if (!isEmpty(errorMessage)) {
      classInput = 'form-input error'
    }
    const inputList = options.map((detail, index) => {
      const getValue = value.value ? value.value : value
      const checked = getValue === detail.value
      const input = (
        <input
          className={classInput}
          type='radio'
          name={name}
          value={detail.value}
          disabled={disabled || detail.disabled}
          checked={checked}
          onChange={() => handleChange(detail.value)}
          onBlur={e => handleBlur(detail.value)}
        />
      )
      return {
        input: input,
        ...detail
      }
    })
    return this.props.customElement(inputList, label, errorMessage)
  }

  render() {
    const {
      label,
      value,
      disabled,
      remark,
      focus,
      options,
      name,
      errorMessage,
      inputProps,
      handleChange,
      handleBlur
    } = this.props

    if (this.props.customElement) {
      return this.renderCustomElement()
    }

    let renderErrorMessage = ''
    let classInput = 'wrap-form-input'
    if (!isEmpty(errorMessage)) {
      classInput = 'wrap-form-input error'
      renderErrorMessage = <div className='error-message'>{errorMessage}</div>
    }
    return (
      <div className='box-form-input'>
        <label className='form-label'>{label}</label>
        <div className={classInput}>
          <div className='form-input-radio inline'>
            {options.map((detail, index) => {
              const getValue = value.value ? value.value : value
              const checked = getValue === detail.value
              return (
                <label key={`${name}-${index}`}>
                  <input
                    type='radio'
                    name={name}
                    disabled={disabled || detail.disabled}
                    checked={checked}
                    value={detail.value}
                    onChange={() => handleChange(detail.value)}
                    onBlur={e => handleBlur(detail.value)}
                  />

                  <label htmlFor={label}>{detail.label}</label>
                  <span className='input' />
                </label>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

// ;<div className='box-form-input'>
//   <label className='form-label'>Text</label>
//   <div className='wrap-form-input error'>
//     <input className='form-input' placeholder='input text' />
//     <div className='validation-label'>Validation message field</div>
//   </div>
// </div>
