import React from "react";

const InputField = ({
  htmlFor,
  label,
  placeholder,
  type = "text",
  id,
  formData,
  setFormData
}) => {
  return (
    <div className="input-field">
      <label htmlFor={htmlFor}>
        {label}
      </label>
      <input
        placeholder={placeholder}
        type={type}
        id={id}
        name={id}
        required
        onChange={e => {
          setFormData({ ...formData, [htmlFor]: e.target.value }); 
        }}
      />
    </div>
  );
};

export default InputField;
