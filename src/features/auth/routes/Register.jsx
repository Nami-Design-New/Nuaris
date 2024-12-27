import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserTypeSelection from "../register/UserTypeSelection";
import HostForm from "../register/HostForm";
import AgentForm from "../register/AgentForm";
import ServiceProviderForm from "../register/ServiceProviderForm";
import OtpForm from "../reset-password/OtpForm";

export default function Register() {
  const [formSelecton, setFormSelection] = useState("host");
  const [title, setTitle] = useState("");
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [formData, setFormData] = useState({
    role: formSelecton,
    logo: "",
    first_name: "",
    last_name: "",
    email: "",
    mobile_number: "",
    username: "",
    password: "",
    commercial_name: "",
    registration_type: "company",
    registration_number: "",
    licence_number: "",
    business_lines: "",
    business_core: "",
    country: "",
    city: "",
    lat: 24.7136,
    lng: 46.6753,
    location_on_map: "",
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      role: formSelecton,
    }));
  }, [formSelecton]);

  useEffect(() => {
    if (formSelecton === "host" && showRegisterForm) {
      setTitle("Host");
    } else if (formSelecton === "agent" && showRegisterForm) {
      setTitle("Agent");
    } else if (formSelecton === "service provider" && showRegisterForm) {
      setTitle("Service Provider");
    } else {
      setTitle("Register");
    }
  }, [formSelecton, showRegisterForm]);

  return (
    <section className="auth_section">
      <div
        className={`form_wrapper ${
          formSelecton !== "" && showRegisterForm && !showOtpForm
            ? "register"
            : ""
        }`}
      >
        <div className="form_container">
          <div className="form-header">
            <div className="logo">
              <Link to="/">
                <img src="/images/logo.svg" alt="logo" />
              </Link>
              <span />
              <h1>{title}</h1>
            </div>
            {!showOtpForm && !showRegisterForm && (
              <h6>
                You already have an Account ? <Link to={"/Login"}>Login</Link>
              </h6>
            )}
          </div>
          {!showRegisterForm && !showOtpForm && (
            <UserTypeSelection
              setFormSelection={setFormSelection}
              setShowRegisterForm={setShowRegisterForm}
            />
          )}
          {showRegisterForm && !showOtpForm && formSelecton === "host" && (
            <HostForm
              formData={formData}
              setFormData={setFormData}
              setShowOtpForm={setShowOtpForm}
              setShowRegisterForm={setShowRegisterForm}
            />
          )}
          {showRegisterForm && !showOtpForm && formSelecton === "agent" && (
            <AgentForm
              formData={formData}
              setFormData={setFormData}
              setShowOtpForm={setShowOtpForm}
              setShowRegisterForm={setShowRegisterForm}
            />
          )}
          {showRegisterForm &&
            !showOtpForm &&
            formSelecton === "service provider" && (
              <ServiceProviderForm
                formData={formData}
                setFormData={setFormData}
                setShowOtpForm={setShowOtpForm}
                setShowRegisterForm={setShowRegisterForm}
              />
            )}
          {showOtpForm && (
            <OtpForm email={formData.email} setShowOtpForm={setShowOtpForm} />
          )}
        </div>
      </div>
      <div
        className="image_wrapper"
        style={{
          backgroundImage: "url(/images/regiester-image.jpeg)",
          backgroundPosition: "50% 72%",
        }}
      />
    </section>
  );
}
