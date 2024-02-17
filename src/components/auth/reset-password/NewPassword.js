import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../../../util/axios";
import { useNavigate } from "react-router";
import SubmitButton from "./../../ui/form-elements/SubmitButton";

const NewPassword = ({ formData, setFormData }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const headersList = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  const requestOptions = {
    method: "POST",
    url: "/users/password-reset/",
    headers: headersList,
    data: formData,
  };
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      await axios.request(requestOptions);
      toast.success("Password Reset Successful");
      navigate("/Login");
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.email &&
        error.response.data.email.length > 0
      ) {
        const errorMessage = error.response.data.message;
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-form">
      <form onSubmit={handleSubmit}>
        <input
          name="password"
          id="password"
          type="password"
          placeholder="New Password"
          required
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <div className="buttons">
          <Link to="/Login" className="back">
            <i className="fa-light fa-arrow-left" />
          </Link>
          <SubmitButton loading={loading} name="Reset Password" />
        </div>
      </form>
    </div>
  );
};

export default NewPassword;
