import React, { PropTypes } from 'react';
import { isEmpty, pick } from '../../../helpers/inputForm'

export default class PasswordInput extends React.PureComponent {

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
    type: 'text',
  }

  renderCustomElement = () => {
    const { label, value, disabled, focus, placeholder, name, errorMessage, inputProps, tabIndex, handleChange, handleKeyCode, handleBlur } = this.props;
    let classInput = 'form-input';
    if (!isEmpty(errorMessage)) {
      classInput = 'form-input error';
    }
    const input = (<input
      ref={(input) => {
        if (input != null && focus) {
          input.focus();
        }
      } }
      className={classInput}
      type="password"
      name={name}
      value={value}
      maxLength={this.props.maxLength}
      placeholder={placeholder}
      disabled={disabled}
      onKeyUp={(e) => handleKeyCode(e)}
      onChange={(e) => handleChange(e.target.value)}
      onBlur={(e) => handleBlur(e.target.value)}
      />);
    return this.props.customElement(input, label, errorMessage);
  }

  render() {
    const { label, value, disabled, remark, focus, placeholder, name, errorMessage, inputProps, tabIndex, handleChange, handleKeyCode, handleBlur } = this.props;

    if (this.props.customElement) {
      return this.renderCustomElement();
    }

    let renderErrorMessage = '';
    let classInput = 'form-input';
    if (!isEmpty(errorMessage)) {
      classInput = 'form-input error';
      renderErrorMessage = (<div className="error-message">{errorMessage}</div>);
    }

    return (
      <div className={inputProps.className ? inputProps.className : 'field-group'}>
        <label htmlFor={label}>{label} {!isEmpty(remark) && (<span className="remark">{remark}</span>)}</label>
        <div className="box-input">
          <input
            ref={(input) => {
              if (input != null && focus) {
                input.focus();
              }
            } }
            className={classInput}
            type="password"
            name={name}
            value={value}
            maxLength={this.props.maxLength}
            placeholder={placeholder}
            disabled={disabled}
            onKeyUp={(e) => handleKeyCode(e)}
            onChange={(e) => handleChange(e.target.value)}
            onBlur={(e) => handleBlur(e.target.value)}
          />
          {renderErrorMessage}
        </div>
        {this.props.children}
      </div>
    );
  }
}
