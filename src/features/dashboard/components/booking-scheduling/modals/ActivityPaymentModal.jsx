import { useState } from "react";
import { useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import SubmitButton from "../../../../../ui/form-elements/SubmitButton";
import PaymetContainer from "../cards/PaymetContainer";
import axiosInstance from "../../../../../utils/axiosInstance";
import useGetPriceData from "./../../../../../hooks/dashboard/useGetPriceData";
import ActivityBookingInfo from "../cards/ActivityBookingInfo";
import BookedActivities from "../cards/BookedActivities";

function ActivityPaymentModal({
  showModal,
  setShowModal,
  setScreenView,
  setBooking,
  booking,
}) {
  const currency = useSelector((state) => state?.authedUser?.currency) || "SAR";

  const [paymentType, setPaymentType] = useState("cash");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    booking_id: booking?.id,
    payment_type: 1,
    amount_paid: "",
    otp: "",
  });

  const price = booking?.booked_activities.reduce(
    (total, ac) =>
      total +
      (ac?.price?.period?.type !== 6
        ? ac?.price?.price * ac?.quantity
        : ac?.price?.price * ac?.seats_count),
    0
  );

  const { data: priceData } = useGetPriceData(booking?.id, price);

  const handlePayment = async () => {
    setLoading(true);

    const payload = {
      booking_id: booking?.id,
      item_type: "ACTIVITY",
      amount_paid: formData.amount_paid || null,
    };

    if (paymentType === "cash") {
      payload.otp = formData.otp;
      payload.payment_type = 1;
    }

    if (paymentType === "card") {
      payload.payment_type = 2;
    }

    try {
      const response = await axiosInstance.post(
        paymentType === "cash"
          ? "/finance/confirm_cash_payment"
          : "/finance/process_card_payment",
        payload
      );
      if (response.status === 200 || response.status === 201) {
        setShowModal(false);
        setBooking({});
        setFormData({
          booking_id: "",
          payment_type: 1,
          amount_paid: "",
          otp: "",
        });
        setScreenView("main");
        toast.success("Payment successful");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      show={showModal}
      size="lg"
      backdrop="static"
      centered
      onHide={() => setShowModal(false)}
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton>
        <h6>Payment</h6>
      </Modal.Header>
      <Modal.Body className="booking_modal form_ui">
        <ActivityBookingInfo booking={booking} priceData={priceData} />
        <BookedActivities booking={booking} />

        <h2 className="total_priceee">
          Total Price With Vat: {Number(priceData?.total_sum_after_vat)}
          {currency}
        </h2>

        <PaymetContainer
          formData={formData}
          setFormData={setFormData}
          booking={booking}
          paymentType={paymentType}
          setPaymentType={setPaymentType}
        />

        <SubmitButton
          event={handlePayment}
          loading={loading}
          name="Confirm & Save"
        />
      </Modal.Body>
    </Modal>
  );
}

export default ActivityPaymentModal;
