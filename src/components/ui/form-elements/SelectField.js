import React from "react";

const SelectField = ({
  htmlFor,
  className,
  label,
  options,
  formData,
  setFormData,
  value
}) => {
  console.log(value);
  return (
    <div className="input-field">
      <label htmlFor={htmlFor}>{label}</label>
      <select
        name={htmlFor}
        className={className}
        id={htmlFor}
        required
        value={value}
        onChange={(e) => {
          setFormData({ ...formData, [htmlFor]: e.target.value });
        }}
      >
        <option value="select" disabled>
          Select
        </option>
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
