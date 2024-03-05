import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logoH from "../assets/images/logoH.svg";
import loginImage from "../assets/images/login-image.png";
import LoginForm from "../components/auth/login/LoginForm";
import UserTypeSelection from "../components/auth/login/UserTypeSelection";
import OtpForm from "./../components/auth/login/OtpForm";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/authenticatedUserSlice";
import { useCookies } from "react-cookie";
import axios from "../util/axios";

const Login = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showOtpForm, SetShowOtpForm] = useState(false);
  const [formData, setFormData] = useState({});
  const [userTypeSelected, setUserTypeSelected] = useState("host");
  const dispatch = useDispatch();
  const [, , removeCookie] = useCookies();

  useEffect(() => {
    dispatch(logout());
    removeCookie("refreshToken");
    axios.defaults.headers.common.Authorization = null;
  }, [dispatch, removeCookie]);

  return (
    <section className="auth-section">
      <div className="left-side">
        <div className="form-header">
          <div className="logo">
            <img src={logoH} alt="logo" />
            <span />
            <h1>Login</h1>
          </div>
          <h6>
            You don’t have an Account ?{" "}
            <Link to={"/register"}>Create Account</Link>
          </h6>
        </div>
        {!showLoginForm && !showOtpForm && (
          <UserTypeSelection
            setShowLoginForm={setShowLoginForm}
            setUserTypeSelected={setUserTypeSelected}
          />
        )}
        {showLoginForm && !showOtpForm && (
          <LoginForm
            userTypeSelected={userTypeSelected}
            setShowLoginForm={setShowLoginForm}
            SetShowOtpForm={SetShowOtpForm}
            formData={formData}
            setFormData={setFormData}
          />
        )}
        {showOtpForm && (
          <OtpForm
            formData={formData}
            setFormData={setFormData}
            userTypeSelected={userTypeSelected}
            setShowLoginForm={setShowLoginForm}
            SetShowOtpForm={SetShowOtpForm}
          />
        )}
      </div>
      <div
        className="right-side"
        style={{ backgroundImage: `url(${loginImage})` }}
      />
    </section>
  );
};

export default Login;
