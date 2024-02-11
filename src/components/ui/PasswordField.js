import React, { useState } from "react";

const PasswordField = ({ htmlFor, label, formData, setFormData }) => {
  const [showPass, setShowPass] = useState(false);
  const handleInputType = e => {
    e.preventDefault();
    setShowPass(!showPass);
  };
  return (
    <div className="input-field">
      <label htmlFor={htmlFor}>
        {label}
      </label>
      <div className="pass-group">
        <input
          placeholder="************"
          type={showPass ? "text" : "password"}
          id={htmlFor}
          name={htmlFor}
          onChange={e => {
            setFormData({ ...formData, [htmlFor]: e.target.value });
          }}
        />
        <button onClick={handleInputType}>
          <i
            className={`fa-regular ${!showPass ? "fa-eye-slash" : "fa-eye"}`}
          />
        </button>
      </div>
    </div>
  );
};

export default PasswordField;
