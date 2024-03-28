import React from "react";
import Modal from "react-bootstrap/Modal";

const DeleteModal = ({
  showDeleteModal,
  setShowDeleteModal,
  onConfirm,
  DeletionTarget
}) => {
  return (
    <Modal
      show={showDeleteModal}
      onHide={() => setShowDeleteModal(false)}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <div className="row m-0 deleteModal">
          <div className="col-12 p-2">
            <p>
              {`You are about to remove `} <span>{DeletionTarget}</span>{" "}
              {`. When you continue, you cannot go
              back. Do you want to confirm the deletion?`}
            </p>
          </div>
          <div className="col-12 p-2 d-flex gap-2">
            <button
              className="cancel"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </button>
            <button className="confirm red" onClick={onConfirm}>
              Confirm
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteModal;
