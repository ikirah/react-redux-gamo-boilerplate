import React, { Component } from 'react'
import _ from 'lodash'

export default class InputWithButton extends Component {
  handleKeyCode = keycode => {
    const ENTER_KEYCODE = 13
    if (keycode === ENTER_KEYCODE) {
      this.props.onClick()
    }
  }

  render() {
    const { fieldData, onChange, onClick } = this.props
    let isEmptyString = true
    if (fieldData.value !== '') {
      isEmptyString = false
    }
    return (
      <div>
        <label className='form-label' htmlFor={fieldData.key}>{fieldData.label}</label>
        <div className='box-input-with-button'>
          <div className='wrap-form-input'>
            <input
              type='text'
              className='form-input'
              placeholder={fieldData.placeholder}
              onChange={e => onChange(e.target.value, fieldData.key)}
              value={fieldData.value}
              disabled={fieldData.disabled}
              onKeyUp={e => this.handleKeyCode(e.keyCode)}
            />
          </div>
          <span className='input-group-button'>
            <button
              className={`button small ` + _.get(fieldData, 'buttonColor', 'red')}
              type='button'
              onClick={() => onClick()}
              disabled={isEmptyString || fieldData.disabled}
            >
              {_.get(fieldData, 'buttonText', 'ค้นหา')}
            </button>
          </span>
        </div>
      </div>
    )
  }
}
