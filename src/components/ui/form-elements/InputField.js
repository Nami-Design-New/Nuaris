import React from "react";

const InputField = ({
  htmlFor,
  label,
  placeholder,
  type = "text",
  id,
  hint,
  formData,
  setFormData,
}) => {
  return (
    <div className="input-field">
      <label htmlFor={htmlFor}>
        {label} {hint && <span className="hint">{hint}</span>}
      </label>
      <input
        placeholder={placeholder}
        type={type}
        id={id}
        name={id}
        required
        onChange={(e) => {
          setFormData({ ...formData, [htmlFor]: e.target.value });
        }}
      />
    </div>
  );
};

export default InputField;
