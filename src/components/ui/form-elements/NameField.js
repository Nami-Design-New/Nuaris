import React from "react";

const NameField = ({ setFormData, formData }) => {
  return (
    <div className="input-field">
      <label htmlFor="firstName">Name</label>
      <div className="d-flex gap-3">
        <input
          placeholder="First Name"
          type="text"
          id="firstName"
          name="firstName"
          required
          onChange={e => {
            setFormData({ ...formData, first_name: e.target.value });
          }}
        />
        <input
          placeholder="Family Name"
          type="text"
          id="lastName"
          name="lastName"
          required
          onChange={e => {
            setFormData({ ...formData, last_name: e.target.value });
          }}
        />
      </div>
    </div>
  );
};

export default NameField;
