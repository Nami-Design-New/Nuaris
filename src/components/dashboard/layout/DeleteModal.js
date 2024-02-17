import React from "react";
import Modal from "react-bootstrap/Modal";

const DeleteModal = ({ showDeleteModal, setShowDeleteModal }) => {
  return (
    <Modal
      show={showDeleteModal}
      onHide={() => setShowDeleteModal(false)}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <div className="row m-0">
          <div className="col-12 p-0"></div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteModal;
