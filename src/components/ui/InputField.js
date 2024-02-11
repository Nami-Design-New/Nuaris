import React from "react";

const InputField = ({ htmlFor, label, placeholder, type = "text", id }) => {
  return (
    <div className="input-field">
      <label htmlFor={htmlFor}>
        {label}
      </label>
      <input placeholder={placeholder} type={type} id={id} name={id} />
    </div>
  );
};

export default InputField;
