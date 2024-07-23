import axios from "../../../utils/axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import SubmitButton from "../../../ui/form-elements/SubmitButton";

export default function NewPassword({ formData, setFormData }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await axios.post("/users/reset_password/", formData);
      if (res?.status === 200) {
        toast.success("Password Reset Successful");
        navigate("/Login");
      } else {
        toast.error("error occurred please try again");
      }
    } catch (error) {
      toast.error("error occurred please try again");
      throw new Error(error);
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
}
