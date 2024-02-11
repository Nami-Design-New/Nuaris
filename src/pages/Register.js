import React, { useState } from "react";
import { Link } from "react-router-dom";
import logoH from "../assets/images/logoH.svg";
import regiesterImage from "../assets/images/regiester-image.jpeg";
import RegiestrUserTypeSelection from "../components/auth/register/RegiestrUserTypeSelection";
import HostForm from "../components/auth/register/HostForm";
import AgentForm from "../components/auth/register/AgentForm";
import ServiceProvider from "../components/auth/register/ServiceProvider";

const Register = () => {
  const [formSelecton, setFormSelection] = useState("");

  let title;
  if (formSelecton === "host") {
    title = "Host";
  } else if (formSelecton === "agent") {
    title = "Agent";
  } else if (formSelecton === "service provider") {
    title = "Service Provider";
  } else {
    title = "Register";
  }

  return (
    <section className="auth-section">
      <div className={`left-side ${formSelecton !== "" ? "register" : ""}`}>
        <div className="form-header">
          <div className="logo">
            <img src={logoH} alt="logo" />
            <span />
            <h1>
              {title}
            </h1>
          </div>
          {formSelecton === "" &&
            <h6>
              You already have an Account ? <Link to={"/Login"}>Login</Link>
            </h6>}
        </div>
        {formSelecton === "" &&
          <RegiestrUserTypeSelection setFormSelection={setFormSelection} />}
        {formSelecton === "host" &&
          <HostForm setFormSelection={setFormSelection} />}
        {formSelecton === "agent" &&
          <AgentForm setFormSelection={setFormSelection} />}
        {formSelecton === "service provider" &&
          <ServiceProvider setFormSelection={setFormSelection} />}
      </div>
      <div
        className="right-side"
        style={{ backgroundImage: `url(${regiesterImage})` }}
      />
    </section>
  );
};

export default Register;
