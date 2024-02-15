import React from "react";

const BackButton = ({ setFormSelection }) => {
  const handleBackButtonClick = e => {
    e.preventDefault();
    setFormSelection("");
  };
  return (
    <button className="back" onClick={handleBackButtonClick}>
      <i className="fa-light fa-arrow-left" />
    </button>
  );
};

export default BackButton;
