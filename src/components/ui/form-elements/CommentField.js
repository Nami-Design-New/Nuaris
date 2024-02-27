import React from "react";

const CommentField = ({
  htmlFor,
  label,
  placeholder,
  id,
  formData,
  setFormData,
}) => {
  return (
    <div className="input-field">
      <label htmlFor={htmlFor}>{label}</label>
      <textarea
        name={id}
        id={id}
        placeholder={placeholder}
        onChange={(e) => {
          setFormData({ ...formData, [htmlFor]: e.target.value });
        }}
      ></textarea>
    </div>
  );
};

export default CommentField;
