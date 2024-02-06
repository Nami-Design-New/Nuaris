import React, { useState } from "react";
import { Link } from "react-router-dom";

const UserNameForm = ({ setShowLoginForm }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});

  const handleBackButtonClick = e => {
    e.preventDefault();
    setShowLoginForm(false);
  };

  return (
    <form>
      <input
        required
        type="text"
        name="userName"
        placeholder="Username"
        onChange={e => setFormData({ ...formData, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        required
        onChange={e => setFormData({ ...formData, email: e.target.value })}
      />
      <Link to={"/reset-password"}>Forget Password ?</Link>
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

export default UserNameForm;
