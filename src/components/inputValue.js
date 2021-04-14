import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './inputValue.css';

class InputValue extends Component {
  render() {
    const { fieldFunction, fieldValue } = this.props;
    return (
      <div className="class-value">
        <label
          htmlFor="form-value"
        >
          valor&nbsp;&nbsp;
          <input
            data-testid="value-input"
            name="value"
            id="form-value"
            type="number"
            value={ fieldValue }
            onChange={ fieldFunction }
          />
        </label>
      </div>
    );
  }
}

InputValue.propTypes = {
  fieldValue: PropTypes.number.isRequired,
  fieldFunction: PropTypes.func.isRequired,
};

export default InputValue;