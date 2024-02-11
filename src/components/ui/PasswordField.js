import React, { useState } from "react";

const PasswordField = ({ htmlFor, label }) => {
  const [showPass, setShowPass] = useState(false);
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
        />
        <button onClick={() => setShowPass(!showPass)}>
          <i
            className={`fa-regular ${!showPass ? "fa-eye-slash" : "fa-eye"}`}
          />
        </button>
      </div>
    </div>
  );
};

export default PasswordField;
