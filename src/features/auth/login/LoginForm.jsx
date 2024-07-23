import { useState } from "react";
import handWave from "../../../assets/images/icons/waving-hand.svg";
import UserNameForm from "./UserNameForm";
import EmailForm from "./EmailForm";
import PhoneForm from "./PhoneForm";

export default function LoginForm({
  userTypeSelected,
  setShowLoginForm,
  SetShowOtpForm,
  formData,
  setFormData
}) {
  const [formType, setFormType] = useState("userNameAndPassword");

  return (
    <div className="form">
      <h2 className="head">
        Welcome Back ! <img src={handWave} alt="hand-wave" />
      </h2>
      <p className="sub-head">
        Please enter the email address or phone number registered with us as an{" "}
        <span>{userTypeSelected}</span>.
      </p>
      <div className="tabs">
        <button
          className={formType === "userNameAndPassword" ? "active" : ""}
          onClick={() => setFormType("userNameAndPassword")}
        >
          Username
        </button>
        <button
          className={formType === "email" ? "active" : ""}
          onClick={() => setFormType("email")}
        >
          Email
        </button>
        <button
          className={formType === "phone" ? "active" : ""}
          onClick={() => setFormType("phone")}
        >
          Phone Number
        </button>
      </div>
      {formType === "userNameAndPassword" && (
        <UserNameForm
          setShowLoginForm={setShowLoginForm}
          userTypeSelected={userTypeSelected}
        />
      )}
      {formType === "email" && (
        <EmailForm
          userTypeSelected={userTypeSelected}
          setShowLoginForm={setShowLoginForm}
          SetShowOtpForm={SetShowOtpForm}
          formData={formData}
          setFormData={setFormData}
        />
      )}
      {formType === "phone" && (
        <PhoneForm
          setShowLoginForm={setShowLoginForm}
          SetShowOtpForm={SetShowOtpForm}
          formData={formData}
          setFormData={setFormData}
        />
      )}
    </div>
  );
}
