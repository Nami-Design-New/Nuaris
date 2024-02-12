import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../../../util/axios";
import SubmitButton from "./../../ui/SubmitButton";

const EmailForm = ({
  formData,
  setFormData,
  setResetPasswordStep,
  setOtpFromResponse
}) => {
  const [loading, setLoading] = useState(false);

  const headersList = {
    Accept: "application/json",
    "Content-Type": "application/json"
  };
  const requestOptions = {
    method: "POST",
    url: "/users/forgot-password/",
    headers: headersList,
    data: formData
  };

  const handleSubmit = async e => {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await axios.request(requestOptions);
      setResetPasswordStep("s2");
      const message = res.data.message;
      const otp = message.match(/\d{6}$/);
      setOtpFromResponse(otp[0]);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.email &&
        error.response.data.email.length > 0
      ) {
        const errorMessage = error.response.data.email[0];
        toast.error(errorMessage);
        setFormData({ ...formData, email: "" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="email"
        id="email"
        type="email"
        placeholder="EX: mail@mail.com"
        required
        value={formData.email}
        onChange={e => setFormData({ ...formData, email: e.target.value })}
      />
      <div className="buttons">
        <Link to="/Login" className="back">
          <i className="fa-light fa-arrow-left" />
        </Link>
        <SubmitButton loading={loading} name="Send Code" />
      </div>
    </form>
  );
};

export default EmailForm;
