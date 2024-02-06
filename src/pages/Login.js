import React, { useState } from "react";
import { Link } from "react-router-dom";
import logoH from "../assets/images/logoH.svg";
import loginImage from "../assets/images/login-image.png";

import LoginForm from "../components/auth/login/LoginForm";
import UserTypeSelection from "../components/auth/login/UserTypeSelection";

const Login = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [userTypeSelected, setUserTypeSelected] = useState("host");

  return (
    <div className="auth_section">
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
        {!showLoginForm
          ? <UserTypeSelection
              setShowLoginForm={setShowLoginForm}
              setUserTypeSelected={setUserTypeSelected}
            />
          : <LoginForm
              userTypeSelected={userTypeSelected}
              setShowLoginForm={setShowLoginForm}
            />}
      </div>
      <div className="right_side" style={{ backgroundImage: `url(${loginImage})` }} />
    </div>
  );
};

export default Login;
