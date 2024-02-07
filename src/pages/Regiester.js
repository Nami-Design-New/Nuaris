import React, { useState } from "react";
import { Link } from "react-router-dom";
import logoH from "../assets/images/logoH.svg";
import regiesterImage from "../assets/images/regiester-image.jpeg";
import RegiestrUserTypeSelection from "../components/auth/register/RegiestrUserTypeSelection";
import HostForm from "./../components/auth/register/HostForm";

const Regiester = () => {
  const [userTypeSelected, setUserTypeSelected] = useState("host");
  const [formSelecton, setFormSelection] = useState("");

  return (
    <div className="auth-section">
      <div className="left-side">
        <div className="form-header">
          <div className="logo">
            <img src={logoH} alt="logo" />
            <span />
            <h1>Register</h1>
          </div>
          <h6>
            You already have an Account ? <Link to={"/Login"}>Login</Link>
          </h6>
        </div>
        {formSelecton === "" &&
          <RegiestrUserTypeSelection
            setUserTypeSelected={setUserTypeSelected}
          />}
        {formSelecton === "host" && <HostForm />}
      </div>
      <div
        className="right-side"
        style={{ backgroundImage: `url(${regiesterImage})` }}
      />
    </div>
  );
};

export default Regiester;
