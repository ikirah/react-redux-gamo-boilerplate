import React from 'react'
import { isEmpty, verifyField, pick, remove, validateSpecialCharacter } from '../../helpers/inputForm'
import {
  NumberInput,
  SelectInput,
  TextareaInput,
  TextInput,
  CheckboxInput,
  RadioInput,
  PasswordInput,
  TextInputWithoutError,
  SwitchInput
} from './components'

export default class Index extends React.Component {
  static defaultProps = {
    name: 'input',
    label: '',
    value: '',
    disabled: false,
    focus: false,
    placeholder: '',
    tabIndex: 1,
    remark: '',
    type: 'text'
  }

  state = {
    value: '',
    errorMessage: '',
    editValue: false
  }

  componentWillMount() {
    const { value } = this.props
    const errorMessage = this.handleValidation(value)
    this.setState(() => {
      return {
        value: value,
        errorMessage: errorMessage,
        editValue: false
      }
    })
    if (!isEmpty(errorMessage) && !this.props.errorMessage) {
      this.handleUpdateValue(value)
    }
  }

  componentWillUpdate(nextProps, nextState) {
    const { editValue } = nextState
    if (!editValue) {
      const valueState = nextState.value
      const { value, name } = nextProps

      const keys = ['value', 'rules']
      const checkProps = pick(keys, { ...this.props, value: valueState })
      const checkNextProps = pick(keys, nextProps)
      if (JSON.stringify(checkProps) !== JSON.stringify(checkNextProps)) {
        const errorMessage = this.handleValidation(value)
        this.setState(() => {
          return {
            value: value,
            errorMessage: errorMessage,
            editValue: false
          }
        })
        if (this.props.onPropsChange) {
          this.props.onPropsChange(value, name, errorMessage)
        }
      }
    }
  }

  handleValidation = value => {
    const { rules } = this.props
    let validation = ''
    if (this.props.handleVerify) {
      validation = this.props.handleVerify(value, rules)
    } else {
      validation = verifyField(value, rules)
    }
    return this.props.errorMessage ? this.props.errorMessage : validation
  }

  handleUpdateValue = value => {
    const errorMessage = this.handleValidation(value)
    const { name } = this.props
    if (this.props.onChange) {
      this.props.onChange(value, name, errorMessage)
    } else if (this.props.onBlue) {
      this.props.onBlue(value, name, errorMessage)
    }
  }

  handleChange = value => {
    const { name, onChange, type } = this.props
    const errorMessage = this.handleValidation(value)
    try {
      if (type === 'text' || type === 'text-without-error') {
        if (value === '' || validateSpecialCharacter(value)) {
          this.setState(() => {
            return {
              value: value,
              errorMessage: errorMessage,
              editValue: !onChange
            }
          })
          if (onChange) onChange(value, name, errorMessage)
        }
      } else {
        this.setState(() => {
          return {
            value: value,
            errorMessage: errorMessage,
            editValue: !onChange
          }
        })
        if (onChange) onChange(value, name, errorMessage)
      }
    } catch (err) {
      console.error(err)
    }
  }

  handleBlur = value => {
    const { name, onBlur, type } = this.props
    try {
      if (onBlur) {
        const errorMessage = this.handleValidation(value)
        this.setState(() => {
          return {
            value: value,
            errorMessage: errorMessage,
            editValue: false
          }
        })
        onBlur(value, name, errorMessage)
      } else {
        switch (type) {
          case 'number': {
            this.handleChange(value)
            break
          }
          default:
            break
        }
      }
    } catch (err) {
      console.error(err)
    }
  }

  handleKeyCode = e => {
    const { value } = this.state
    const { name } = this.props
    const keyCode = e.keyCode || e.which
    if (this.props.onKeyCode) this.props.onKeyCode(keyCode, value, name, e)
  }

  render() {
    const { type } = this.props
    const { value, errorMessage, editValue } = this.state
    const propsForm = {
      ...remove(
        ['onChange', 'value', 'onBlur', 'onKeyCode', 'handleVerify', 'renderComponent', 'children'],
        this.props
      ),
      value: editValue ? value : this.props.value,
      errorMessage: this.props.errorMessage || this.props.errorMessage === '' ? this.props.errorMessage : errorMessage,
      handleChange: this.handleChange,
      handleBlur: this.handleBlur,
      handleKeyCode: this.handleKeyCode
    }

    switch (type) {
      case 'text': {
        if (this.props.children) {
          return (
            <div className='text-input'>
              <TextInput {...propsForm}>{this.props.children}</TextInput>
            </div>
          )
        }
        return (
          <div className='text-input'>
            <TextInput {...propsForm} />
          </div>
        )
      }
      case 'text-without-error': {
        if (this.props.children) {
          return (
            <div className='text-input'>
              <TextInputWithoutError {...propsForm}>{this.props.children}</TextInputWithoutError>
            </div>
          )
        }
        return (
          <div className='text-input'>
            <TextInputWithoutError {...propsForm} />
          </div>
        )
      }
      case 'number': {
        if (this.props.children) {
          return (
            <div className='number-input'>
              <NumberInput {...propsForm}>{this.props.children}</NumberInput>
            </div>
          )
        }
        return (
          <div className='number-input'>
            <NumberInput {...propsForm} />
          </div>
        )
      }
      case 'select': {
        if (this.props.children) {
          return (
            <div className='select-input'>
              <SelectInput {...propsForm}>{this.props.children}</SelectInput>
            </div>
          )
        }
        return (
          <div className='select-input'>
            <SelectInput {...propsForm} />
          </div>
        )
      }
      case 'password': {
        if (this.props.children) {
          return (
            <div className='password-input'>
              <PasswordInput {...propsForm}>{this.props.children}</PasswordInput>
            </div>
          )
        }
        return (
          <div className='password-input'>
            <PasswordInput {...propsForm} />
          </div>
        )
      }
      case 'textarea': {
        if (this.props.children) {
          return (
            <div className='textarea-input'>
              <TextareaInput {...propsForm}>{this.props.children}</TextareaInput>
            </div>
          )
        }
        return (
          <div className='textarea-input'>
            <TextareaInput {...propsForm} />
          </div>
        )
      }
      case 'radio': {
        if (this.props.children) {
          return (
            <div className='radio-input'>
              <RadioInput {...propsForm}>{this.props.children}</RadioInput>
            </div>
          )
        }
        return (
          <div className='radio-input'>
            <RadioInput {...propsForm} />
          </div>
        )
      }
      case 'checkbox': {
        if (this.props.children) {
          return (
            <div className='checkbox-input'>
              <CheckboxInput {...propsForm}>{this.props.children}</CheckboxInput>
            </div>
          )
        }
        return (
          <div className='checkbox-input'>
            <CheckboxInput {...propsForm} />
          </div>
        )
      }
      case 'switch': {
        if (this.props.children) {
          return (
            <div className='switch-input'>
              <SwitchInput {...propsForm}>{this.props.children}</SwitchInput>
            </div>
          )
        }
        return (
          <div className='switch-input'>
            <SwitchInput {...propsForm} />
          </div>
        )
      }
      case 'custom': {
        return this.props.renderComponent ? this.props.renderComponent(propsForm) : ''
      }
      default:
        if (this.props.children) {
          return (
            <div className='text-input'>
              <TextInput {...propsForm}>{this.props.children}</TextInput>
            </div>
          )
        }
        return (
          <div className='text-input'>
            <TextInput {...propsForm} />
          </div>
        )
    }
  }
}
