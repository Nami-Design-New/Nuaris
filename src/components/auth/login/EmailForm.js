import React, { useState } from "react";
import { toast } from "react-toastify";
import SubmitButton from "./../../ui/form-elements/SubmitButton";
import FormBackButton from "../../ui/form-elements/FormBackButton";
import axios from "../../../util/axios";

const EmailForm = ({
  setShowLoginForm,
  SetShowOtpForm,
  formData,
  setFormData,
  userTypeSelected,
}) => {
  const [loading, setLoading] = useState(false);

  const handleBackButtonClick = (e) => {
    e.preventDefault();
    setShowLoginForm(false);
    setFormData({});
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await axios.post(
        "/users/send-otp/",
        { ...formData },
        {
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            Authorization: null,
          },
        }
      );

      if (res.status === 200) {
        SetShowOtpForm(true);
        setShowLoginForm(false);
      } else if (res.response.data.email) {
        toast.error(res.response.data.email[0]);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      if (error?.response?.data?.email?.length > 0) {
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
        <FormBackButton onClick={handleBackButtonClick} />
        <SubmitButton loading={loading} name="Login" />
      </div>
    </form>
  );
};

export default EmailForm;
