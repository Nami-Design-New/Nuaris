import { useState } from "react";
import { toast } from "react-toastify";
import axios from "../../../utils/axios";
import SubmitButton from "../../../ui/form-elements/SubmitButton";
import BackButton from "../../../ui/form-elements/BackButton";

export default function EmailForm({
  setShowLoginForm,
  SetShowOtpForm,
  formData,
  setFormData
}) {
  const [loading, setLoading] = useState(false);

  const handleBackButtonClick = (e) => {
    e.preventDefault();
    setShowLoginForm(false);
    setFormData({});
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await axios.post("/users/send-otp/", formData);
      if (res.status === 200) {
        SetShowOtpForm(true);
        setShowLoginForm(false);
      } else {
        toast.error("Email address not registered");
      }
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
        type="email"
        name="email"
        id="email"
        placeholder="EX: mail@mail.com"
        value={formData.email}
        required
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <div className="buttons">
        <BackButton onClick={handleBackButtonClick} />
        <SubmitButton loading={loading} name="Login" />
      </div>
    </form>
  );
}
