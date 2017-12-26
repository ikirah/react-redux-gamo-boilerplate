import React from 'react'

export default class SwitchInput extends React.PureComponent {
  static propTypes = {}

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
    placeholder: '',
    type: 'text'
  }

  handleClickSwitch = value => {
    const { name, options, onChange } = this.props
    const selectedOption = options.find((option) => option.value === value)
    onChange(selectedOption || {})
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
      errorMessage,
      options,
      inputProps,
      tabIndex,
      handleBlur,
      handleKeyCode,
      linkUrl,
      handleChange
    } = this.props

    if (this.props.customElement) {
      return this.renderCustomElement()
    }

    const renderOptions = []

    for (var key in options) {
      const getValue = value.value ? value.value : value
      const val = options[key].value
      const active = getValue === val ? 'active' : ''
      renderOptions.push(
        <a
          href={options[key].linkUrl}
          onClick={() => handleChange(val)}
          value={val}
          className={`button-outline red ` + active}
          key={key}
        >
          {options[key].label}
        </a>
      )
    }

    return (
      <div className='box-form-input'>
        <label className='form-label' htmlFor={name}>
          {label}
        </label>
        <div className='button-group'>{renderOptions}</div>
        {this.props.children}
      </div>
    )
  }
}
