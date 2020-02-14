import React, { Component } from "react";

class Input extends Component {
  render() {
    const { type, name, label, onChange, value, errors } = this.props;
    return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <input
          onChange={onChange}
          value={value}
          name={name}
          type={type}
          id={name}
          className="form-control"
        />
        {errors && <div className="alert alert-danger">{errors}</div>}
      </div>
    );
  }
}

export default Input;
