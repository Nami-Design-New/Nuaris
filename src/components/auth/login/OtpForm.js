import React, { useState } from "react";
import handWave from "../../../assets/images/waving-hand.svg";
import axios from "../../../util/axios";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import Otpcontainer from "../../../shared/Otpcontainer";
import SubmitButton from "./../../ui/form-elements/SubmitButton";
import FormBackButton from "../../ui/form-elements/FormBackButton";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../../redux/slices/authenticatedUserSlice";
import { useDispatch } from "react-redux";

const OtpForm = ({
  formData,
  setFormData,
  SetShowOtpForm,
  userTypeSelected,
  setShowLoginForm,
}) => {
  const [loading, setLoading] = useState(false);
  const [, setCookie] = useCookies();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleBackButtonClick = (e) => {
    e.preventDefault();
    setShowLoginForm(true);
    SetShowOtpForm(false);
    setFormData({});
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await axios.post("/users/login-otp/", {
        ...formData,
        role: userTypeSelected,
      });

      if (res.status === 200) {
        setCookie("refreshToken", res.data.refresh_token, {
          path: "/",
          expires: new Date(new Date().getTime() + 20 * 60 * 60 * 1000),
          secure: true,
        });

        dispatch(setUser(res.data.user));
        toast.success(`Welcome Back @${res.data.user.username}`);
        navigate("/dashboard");
      }
      if (res?.response?.data?.role) {
        toast.error(res.response.data.role[0]);
        return;
      }
      if (res?.response?.data?.otp) {
        toast.error(res.response.data.otp[0]);
        return;
      }
    } catch (error) {
      if (error?.response?.data?.otp?.length > 0) {
        const errorMessage = error.response.data.otp[0];
        toast.error(errorMessage);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2 className="head">
          Welcome Back ! <img src={handWave} alt="hand-wave" />
        </h2>
        <p className="sub-head">
          Please enter the verification code sent to{" "}
          <span>{formData.email}</span>.
        </p>
        <Otpcontainer formData={formData} setFormData={setFormData} />
        <div className="resend">
          <p>00:48</p>
          <h6>Resend the code</h6>
        </div>
        <div className="buttons">
          <FormBackButton onClick={handleBackButtonClick} />
          <SubmitButton loading={loading} name="Confirm" />
        </div>
      </form>
    </div>
  );
};

export default OtpForm;
