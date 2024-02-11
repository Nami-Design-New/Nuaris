import React from "react";

const SelectField = ({ htmlFor, label, options }) => {
  return (
    <div className="input-field">
      <label htmlFor={htmlFor}>{label}</label>
      <select name={htmlFor} id={htmlFor}>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
