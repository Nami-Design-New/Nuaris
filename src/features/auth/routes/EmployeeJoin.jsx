import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../../../utils/axiosInstance";
import InputField from "./../../../ui/form-elements/InputField";
import PasswordField from "../../../ui/form-elements/PasswordField";
import SubmitButton from "../../../ui/form-elements/SubmitButton";

export default function EmployeeJoin() {
  const [searchParams] = useSearchParams();
  const qs = searchParams.get("qs");

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    query_string: qs,
    username: "",
    password: "",
    re_password: "",
  });

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await axiosInstance.post(
        "/employee_auth/verify_employee",
        formData
      );
      if (res?.status === 200 || res?.status === 201) {
        toast.success("Welcome To Nuaris");
        console.log(res.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth_section">
      <div className="form_wrapper">
        <div className="form_container">
          <div className="form-header">
            <div className="logo">
              <img src="/images/logo.svg" alt="logo" />
              <span />
              <h1>Employee</h1>
            </div>
          </div>
          <form className="form_ui" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-12 p-2">
                <InputField
                  label={"Username"}
                  placeholder="Enter Username"
                  name="username"
                  id="username"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                />
              </div>
              <div className="col-12 p-2">
                <PasswordField
                  label={"Password"}
                  placeholder="Enter Password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
              <div className="col-12 p-2">
                <PasswordField
                  label={"Confirm Password"}
                  placeholder="Password"
                  name="password"
                  id="password"
                  value={formData.re_password}
                  onChange={(e) =>
                    setFormData({ ...formData, re_password: e.target.value })
                  }
                />
              </div>
              <div className="col-12 p-2 mt-3">
                <SubmitButton loading={loading} name="Login" />
              </div>
            </div>
          </form>
        </div>
      </div>
      <div
        className="image_wrapper"
        style={{
          backgroundImage: "url(/images/epmloyee-join.jpg)",
          backgroundPosition: "50% 30%",
        }}
      />
    </section>
  );
}
