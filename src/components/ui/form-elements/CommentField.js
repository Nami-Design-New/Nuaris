import React from "react";

const CommentField = ({
  htmlFor,
  label,
  placeholder,
  id,
  value,
  hint,
  formData,
  setFormData
}) => {
  return (
    <div className="input-field">
      <label htmlFor={htmlFor}>
        {label} <span>{hint}</span>
      </label>
      <textarea
        name={id}
        value={value}
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
