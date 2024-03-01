import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import axios from "../../../util/axios";
import SubmitButton from "./../../ui/form-elements/SubmitButton";

const PhoneForm = ({
  setShowLoginForm,
  SetShowOtpForm,
  formData,
  setFormData,
}) => {
  const [loading, setLoading] = useState(false);

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
      const response = await axios.request(requestOptions);
      console.log("Response:", response);
      SetShowOtpForm(true);
      setShowLoginForm(false);
    } catch (error) {
      console.error("Error:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.email &&
        error.response.data.email.length > 0
      ) {
        const errorMessage = error.response.data.email[0];
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="tel"
        placeholder="EX: +455 567888 555"
        required
        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
      />
      <div className="buttons">
        <Link to="/Login" className="back">
          <i className="fa-light fa-arrow-left" />
        </Link>
        <SubmitButton loading={loading} name="Login" />
      </div>
    </form>
  );
};

export default PhoneForm;
