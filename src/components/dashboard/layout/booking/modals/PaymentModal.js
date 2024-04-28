import React from "react";
import { Modal } from "react-bootstrap";
import BookingInfo from "../../scheduling/modals/BookingInfo";
import Id from "../../scheduling/modals/Id";
import PaymentContainer from "./PaymetContainer";

const PaymentModal = ({ showModal, setShowModal }) => {
  return (
    <Modal
      show={showModal}
      size="lg"
      onHide={() => setShowModal(false)}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <h6>Payment</h6>
      </Modal.Header>
      <Modal.Body className="booking_modal form-ui">
        <BookingInfo />
        <Id />
        <PaymentContainer />
        <button>Confirm & Save</button>
      </Modal.Body>
    </Modal>
  );
};

export default PaymentModal;
