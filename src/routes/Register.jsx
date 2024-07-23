import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logoH from "../assets/images/logoH.svg";
import regiesterImage from "../assets/images/regiester-image.jpeg";
import UserTypeSelection from "../features/auth/register/UserTypeSelection";
import HostForm from "./../features/auth/register/HostForm";
import AgentForm from "../features/auth/register/AgentForm";
import ServiceProviderForm from "../features/auth/register/ServiceProviderForm";

export default function Register() {
  const [formSelecton, setFormSelection] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (formSelecton === "host") {
      setTitle("Host");
    } else if (formSelecton === "agent") {
      setTitle("Agent");
    } else if (formSelecton === "service provider") {
      setTitle("Service Provider");
    } else {
      setTitle("Register");
    }
  }, [formSelecton]);

  return (
    <section className="auth_section">
      <div className={`form_wrapper ${formSelecton !== "" ? "register" : ""}`}>
        <div className="form_container">
          <div className="form-header">
            <div className="logo">
              <img src={logoH} alt="logo" />
              <span />
              <h1>{title}</h1>
            </div>
            {formSelecton === "" && (
              <h6>
                You already have an Account ? <Link to={"/Login"}>Login</Link>
              </h6>
            )}
          </div>
          {formSelecton === "" && (
            <UserTypeSelection setFormSelection={setFormSelection} />
          )}
          {formSelecton === "host" && (
            <HostForm setFormSelection={setFormSelection} />
          )}
          {formSelecton === "agent" && (
            <AgentForm setFormSelection={setFormSelection} />
          )}
          {formSelecton === "service provider" && (
            <ServiceProviderForm setFormSelection={setFormSelection} />
          )}
        </div>
      </div>
      <div
        className="image_wrapper"
        style={{
          backgroundImage: `url(${regiesterImage})`,
          backgroundPosition: "50% 72%"
        }}
      />
    </section>
  );
}
