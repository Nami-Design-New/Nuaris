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
        defaultValue="select"
        value={formData[htmlFor]}
        onChange={e => {
          setFormData({ ...formData, [htmlFor]: e.target.value });
        }}
      >
        <option value="select" disabled>
          select
        </option>
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
