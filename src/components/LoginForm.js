import { useState } from "react";
import fav from "../assets/images/fav.svg";
import axios from "../util/axios";
import { toast } from "react-toastify";

const LoginForm = ({ setShowOtp, formData, setFormData }) => {
  const [loading, setLoading] = useState(false);
  const headersList = {
    Accept: "application/json",
    "Content-Type": "application/json"
  };
  const requestOptions = {
    method: "POST",
    url: "/users/send-otp/",
    headers: headersList,
    data: formData
  };
  const handleSubmit = async e => {
    setLoading(true);
    e.preventDefault();
    await axios
      .request(requestOptions)
      .then(() => {
        setShowOtp(true);
      })
      .catch(err => {
        if (
          err.response &&
          err.response.data &&
          err.response.data.email &&
          err.response.data.email.length > 0
        ) {
          const errorMessage = err.response.data.email[0];
          toast.error(errorMessage);
        }
      })
      .finally(() => setLoading(false));
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="head">
        <img src={fav} alt="logoFav" loading="lazy" />
        <h1>Welcome back to Nuaris</h1>
      </div>
      <div className="form_group">
        <div className="input_field">
          <label htmlFor="email">
            <i className="fa-sharp fa-light fa-envelope" /> Email Address
          </label>
          <input
            required
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email address"
            onChange={e => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
      </div>
      <button
        style={{ opacity: loading ? 0.7 : 1 }}
        disabled={loading}
        type="submit"
      >
        Login <i className={loading ? "fa-solid fa-spinner fa-spin" : ""} />
      </button>
    </form>
  );
};

export default LoginForm;
