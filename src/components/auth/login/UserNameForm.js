import React, { useState, useRef } from "react";
import axios from "../../../util/axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import SubmitButton from "./../../ui/form-elements/SubmitButton";
import FormBackButton from "../../ui/form-elements/FormBackButton";
import { useDispatch } from "react-redux";
import {
  setUser,
  setToken,
} from "../../../redux/slices/authenticatedUserSlice";

const UserNameForm = ({ setShowLoginForm, userTypeSelected }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [, setCookie] = useCookies(["token"]);
  const form = useRef(null);

  const handleBackButtonClick = (e) => {
    e.preventDefault();
    setShowLoginForm(false);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const headersList = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  const requestOptions = {
    method: "POST",
    url: "/users/login/",
    headers: headersList,
    data: formData,
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await axios.request(requestOptions);
      // set user data in state
      dispatch(setUser(res.data.user));

      // fetch access token using the refresh token from the first request
      const token = await axios.request({
        ...requestOptions,
        url: "/users/token/refresh/",
        // NOTE: access_token should be named (refresh_token)
        data: { refresh: res.data.access_token },
      });

      // set access token in state
      dispatch(setToken(token.data.access));

      // set refresh token in cookies
      setCookie("refreshToken", res.data.access_token, {
        path: "/",
        expires: new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
        secure: true,
      });

      // TODO: Remove in future when refresh token works
      setCookie("token", token.data.access, {
        path: "/",
        expires: new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
        secure: true,
      });

      toast.success(`Welcome Back ${res.data.user.first_name}`);
      navigate("/dashboard");
    } catch (error) {
      toast.error("Incorrect username or password");
      form.current.reset();
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} ref={form}>
      <input
        required
        type="text"
        name="userName"
        placeholder="Username"
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        required
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <Link to={"/reset-password"}>Forget Password ?</Link>
      <div className="buttons">
        <FormBackButton onClick={handleBackButtonClick} />
        <SubmitButton loading={loading} name="Login" />
      </div>
    </form>
  );
};

export default UserNameForm;
