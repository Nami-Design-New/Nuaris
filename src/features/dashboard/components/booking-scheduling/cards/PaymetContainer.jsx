import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import InputField from "../../../../../ui/form-elements/InputField";
import SubmitButton from "../../../../../ui/form-elements/SubmitButton";
import axiosInstance from "../../../../../utils/axiosInstance";

const PaymetContainer = ({
  formData,
  setFormData,
  booking,
  paymentType,
  setPaymentType,
}) => {
  const [timer, setTimer] = useState(180);
  const [loading, setLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);

  const [resendDisabled, setResendDisabled] = useState(true);
  const [advancePayment, setAdvancePayment] = useState(false);

  const handleSendOtp = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        "/finance/generate_receive_cash_otp",
        {
          booking_id: booking?.id,
        }
      );
      if (response.status === 200 || response.status === 201) {
        toast.success("OTP sent successfully");
        setResendDisabled(true);
        setTimer(180);
        setShowOtp(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else {
      setResendDisabled(false);
    }
  }, [timer]);

  return (
    <div className="strocked_wrapper form-ui">
      <div className="row">
        <div className="col-12 p-2">
          <h6 className="title">Payment</h6>
        </div>

        <div className="col-12 p-2">
          <div className="require_id_wrapper">
            <Form.Check
              onChange={() => setAdvancePayment(!advancePayment)}
              checked={advancePayment}
              type="switch"
              label="Advanced Payment"
              id="require_id"
            />
            {advancePayment && (
              <InputField
                id="amount_paid"
                name="amount_paid"
                placeholder="Enter amount paid (minimum 50%)"
                value={formData.amount_paid}
                required
                min={booking?.total_price * 0.5}
                onChange={(e) =>
                  setFormData({ ...formData, amount_paid: e.target.value })
                }
              />
            )}
          </div>
        </div>

        <div className="col-12 p-2">
          <div className="payment_tabs">
            <span className={`activeTab ${paymentType}`} />
            <div
              className={`tab ${paymentType === "cash" ? "active" : ""}`}
              onClick={() => setPaymentType("cash")}
            >
              <h6>Cash</h6>
            </div>
            <div
              className={`tab ${paymentType === "card" ? "active" : ""}`}
              onClick={() => setPaymentType("card")}
            >
              <h6>Card</h6>
            </div>
          </div>
        </div>

        <div className="col-12 p-2">
          {paymentType === "cash" ? (
            <div className="require_id_wrapper">
              <div className="d-flex flex-column gap-2">
                <h2 className="otp_title">OTP Code</h2>
                <p className="otp_description">
                  A verification code (OTP) will be sent to your number{" "}
                  {booking?.user?.phone} to confirm the cash payment.
                </p>
                {!showOtp ? (
                  <SubmitButton
                    name={"Send OTP"}
                    loading={loading}
                    className={"otp_btn"}
                    event={handleSendOtp}
                  />
                ) : (
                  <div className="d-flex align-items-center gap-2">
                    <InputField
                      id="otp"
                      name="otp"
                      placeholder="Enter OTP Code"
                      value={formData.otp}
                      required
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          otp: e.target.value,
                        })
                      }
                    />
                    <SubmitButton
                      className={`resend ${resendDisabled ? "disabled" : ""}`}
                      name={
                        resendDisabled
                          ? `Resend ${Math.floor(timer / 60)
                              .toString()
                              .padStart(2, "0")} : ${(timer % 60)
                              .toString()
                              .padStart(2, "0")}`
                          : "Resend"
                      }
                      event={handleSendOtp}
                      loading={loading}
                    />
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="input-field">
              <label>Send Payment link to</label>
              <div className="media">
                <div className="checkField">
                  <input type="checkbox" name="media" id="email" />
                  <label htmlFor="email">Email</label>
                </div>
                <div className="checkField">
                  <input type="checkbox" name="media" id="phone" />
                  <label htmlFor="phone">Phone number</label>
                </div>
                <div className="checkField">
                  <input type="checkbox" name="media" id="whatsApp" />
                  <label htmlFor="whatsApp">WhatsApp</label>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="col-12 p-2 mt-3">
          <div className="note">
            {paymentType === "cash" && (
              <h6 className="m-0">
                Note: By Verifying this OTP you Confirm receiving the Cash
                amount paid and agreed to the terms & conditions of Nuaris
                TechServices fees.
              </h6>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymetContainer;
