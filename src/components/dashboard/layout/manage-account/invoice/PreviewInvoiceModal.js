import React from "react";
import { Modal } from "react-bootstrap";
import InvoiceTemplate1 from "./InvoiceTemplate1";

const PreviewInvoiceModal = ({ show, setShow }) => {
  return (
    <Modal
      show={show}
      size="lg"
      onHide={() => setShow(false)}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <h6>Invoice Preview</h6>
      </Modal.Header>
      <Modal.Body>
        <InvoiceTemplate1 />
      </Modal.Body>
    </Modal>
  );
};

export default PreviewInvoiceModal;
