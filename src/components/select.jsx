import React, { Component } from "react";
class Select extends Component {
  render() {
    const {
      idProperty,
      textProperty,
      name,
      label,
      options,
      error,
      ...rest
    } = this.props;

    return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <select name={name} id={name} {...rest} className="form-control">
          <option value="" />
          {options.map(option => (
            <option key={option[idProperty]} value={option[idProperty]}>
              {option[textProperty]}
            </option>
          ))}
        </select>
        {error && <div className=" alert aler-danger">{error}</div>}
      </div>
    );
  }
}

Select.defaultProps = {
  textProperty: "name",
  idProperty: "_id"
};
export default Select;
