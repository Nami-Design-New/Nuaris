import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import Id from "../cards/Id";
import Addons from "../cards/Addons";
import PaymentContainer from "../cards/PaymetContainer";
import useGetYachtBooking from "../../../../../hooks/yacht/useGetYachtBooking";
import SubmitButton from "../../../../../ui/form-elements/SubmitButton";
import axiosInstance from "../../../../../utils/axiosInstance";
import useGetPriceData from "../../../../../hooks/dashboard/useGetPriceData";
import YachtBookingInfo from "../cards/YachtBookingInfo";

const YachtPaymentModal = ({
  showModal,
  setBooking,
  setShowModal,
  bookingId,
  setScreenView,
}) => {
  const currency = useSelector((state) => state?.authedUser?.currency) || "SAR";
  const queryClient = useQueryClient();
  const [paymentType, setPaymentType] = useState("cash");

  const { data: booking } = useGetYachtBooking(
    bookingId,
    bookingId && showModal
  );

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    booking_id: booking?.id,
    payment_type: 1,
    amount_paid: "",
    otp: "",
  });

  useEffect(() => {
    if (booking) {
      setFormData((prev) => ({ ...prev, booking_id: booking?.id }));
    }
  }, [booking]);

  const handlePayment = async () => {
    setLoading(true);

    const payload = {
      booking_id: booking?.id,
      item_type: "FLEET",
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
        queryClient.invalidateQueries({ queryKey: ["bookings"] });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const price =
    Number(booking?.total_price) +
    booking?.addons?.reduce((a, b) => a + b?.quantity * b?.price, 0);

  const { data: priceData } = useGetPriceData(bookingId, price);

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
        <YachtBookingInfo booking={booking} priceData={priceData} />
        {booking?.clients?.length > 0 && <Id booking={booking} />}
        {booking?.addons?.length > 0 && <Addons booking={booking} />}

        <h2 className="total_priceee">
          Total Price With Vat: {Number(priceData?.total_sum_after_vat)}
          {currency}
        </h2>

        <PaymentContainer
          booking={booking}
          formData={formData}
          setFormData={setFormData}
          paymentType={paymentType}
          setPaymentType={setPaymentType}
        />

        <SubmitButton
          name="Confirm & Save"
          loading={loading}
          event={handlePayment}
        />
      </Modal.Body>
    </Modal>
  );
};

export default YachtPaymentModal;
