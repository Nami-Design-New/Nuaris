import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "../../../util/axios";
import SubmitButton from "./../../ui/form-elements/SubmitButton";

const EmailForm = ({
  setShowLoginForm,
  SetShowOtpForm,
  formData,
  setFormData,
}) => {
  const [loading, setLoading] = useState(false);

  const handleBackButtonClick = (e) => {
    e.preventDefault();
    setShowLoginForm(false);
    setFormData({});
  };

  const headersList = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  const requestOptions = {
    method: "POST",
    url: "/users/send-otp/",
    headers: headersList,
    data: formData,
  };
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      await axios.request(requestOptions);
      SetShowOtpForm(true);
      setShowLoginForm(false);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.email &&
        error.response.data.email.length > 0
      ) {
        const errorMessage = error.response.data.email[0];
        setFormData({ ...formData, email: "" });
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        id="email"
        placeholder="EX: mail@mail.com"
        value={formData.email}
        required
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <div className="buttons">
        <button className="back" onClick={handleBackButtonClick}>
          <i className="fa-light fa-arrow-left" />
        </button>
        <SubmitButton loading={loading} name="Login" />
      </div>
    </form>
  );
};

export default EmailForm;
