import React from "react";

const SelectField = ({ htmlFor, label, options, formData, setFormData }) => {
  return (
    <div className="input-field">
      <label htmlFor={htmlFor}>
        {label}
      </label>
      <select
        name={htmlFor}
        id={htmlFor}
        required
        onChange={e => {
          setFormData({ ...formData, [htmlFor]: e.target.value });
        }}
      >
        {options.map((option, index) =>
          <option key={index} value={option}>
            {option}
          </option>
        )}
      </select>
    </div>
  );
};

export default SelectField;
