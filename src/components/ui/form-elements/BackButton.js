const BackButton = ({ setFormSelection }) => {
  const handleBackButtonClick = (e) => {
    e.preventDefault();
    setFormSelection("");
  };
  return (
    <button className="back" type="button" onClick={handleBackButtonClick}>
      <i className="fa-light fa-arrow-left" />
    </button>
  );
};

export default BackButton;
