import React from "react";

const SubmitButton = ({ loading, name, className, fileLoading }) => {
  return (
    <button
      style={{ opacity: loading || fileLoading ? 0.7 : 1 }}
      disabled={loading || fileLoading}
      type="submit"
      className={`log ${className && className}`}
    >
      {fileLoading ? "Wait File Uploading..." : name}{" "}
      <i
        className={loading || fileLoading ? "fa-solid fa-spinner fa-spin" : ""}
      />
    </button>
  );
};

export default SubmitButton;
