import { useState } from "react";
import { Link } from "react-router-dom";
import logoH from "../assets/images/logoH.svg";
import loginImage from "../assets/images/login-image.png";
import LoginForm from "../features/auth/login/LoginForm";
import UserTypeSelection from "./../features/auth/login/UserTypeSelection";
import OtpForm from "../features/auth/login/OtpForm";

export default function Login() {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showOtpForm, SetShowOtpForm] = useState(false);
  const [userTypeSelected, setUserTypeSelected] = useState("host");
  const [formData, setFormData] = useState({});

  return (
    <section className="auth_section">
      <div className="form_wrapper">
        <div className="form_container">
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
              userTypeSelected={userTypeSelected}
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
      </div>
      <div
        className="image_wrapper"
        style={{ backgroundImage: `url(${loginImage})` }}
      />
    </section>
  );
}
