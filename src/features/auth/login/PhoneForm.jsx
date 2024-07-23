import { useState } from "react";
import { toast } from "react-toastify";
import axios from "../../../utils/axios";
import SubmitButton from "../../../ui/form-elements/SubmitButton";
import BackButton from "../../../ui/form-elements/BackButton";

export default function PhoneForm({
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
        toast.error("phone number not registered");
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
        type="tel"
        placeholder="EX: +455 567888 555"
        required
        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
      />
      <div className="buttons">
        <BackButton onClick={handleBackButtonClick} />
        <SubmitButton loading={loading} name="Login" />
      </div>
    </form>
  );
}
