import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "../../../util/axios";

const EmailForm = ({ setShowLoginForm }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});

  const handleBackButtonClick = e => {
    e.preventDefault();
    setShowLoginForm(false);
  };

  const headersList = {
    Accept: "application/json",
    "Content-Type": "application/json"
  };
  const requestOptions = {
    method: "POST",
    url: "/users/send-otp/",
    headers: headersList,
    data: formData
  };
  const handleSubmit = async e => {
    setLoading(true);
    e.preventDefault();
    await axios
      .request(requestOptions)
      .then(() => {})
      .catch(err => {
        if (
          err.response &&
          err.response.data &&
          err.response.data.email &&
          err.response.data.email.length > 0
        ) {
          const errorMessage = err.response.data.email[0];
          toast.error(errorMessage);
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <form onSubmit={() => handleSubmit()}>
      <input
        type="email"
        placeholder="EX: mail@mail.com"
        required
        onChange={e => setFormData({ ...formData, username: e.target.value })}
      />
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
