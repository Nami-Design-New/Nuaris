import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../../../utils/axios";
import SubmitButton from "../../../ui/form-elements/SubmitButton";

export default function EmailForm({
  formData,
  setFormData,
  setResetPasswordStep,
  setOtpFromResponse
}) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await axios.post();
      setResetPasswordStep("s2");
      const message = res.data.message;
      const otp = message.match(/\d{6}$/);
      setOtpFromResponse(otp[0]);
    } catch (error) {
      toast.error("error occurred please try again");
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="email"
        id="email"
        type="email"
        placeholder="EX: mail@mail.com"
        required
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <div className="buttons">
        <Link to="/Login" className="back">
          <i className="fa-light fa-arrow-left" />
        </Link>
        <SubmitButton loading={loading} name="Send Code" />
      </div>
    </form>
  );
}
