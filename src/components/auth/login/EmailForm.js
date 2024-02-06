import React, { useState } from "react";

const EmailForm = ({ setShowLoginForm }) => {
  const [loading, setLoading] = useState(false);

  const handleBackButtonClick = e => {
    e.preventDefault();
    setShowLoginForm(false);
  };
  return (
    <form>
      <input type="email" placeholder="EX: mail@mail.com" />
      <div className="buttons">
        <button className="back" onClick={handleBackButtonClick}>
          <i className="fa-light fa-arrow-left" />
        </button>
        <button
          style={{ opacity: loading ? 0.7 : 1 }}
          disabled={loading}
          type="submit"
          className="log"
        >
          Login <i className={loading ? "fa-solid fa-spinner fa-spin" : ""} />
        </button>
      </div>
    </form>
  );
};

export default EmailForm;
