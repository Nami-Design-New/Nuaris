import React from "react";
import Modal from "react-bootstrap/Modal";
import axios from "../../../util/axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { removePermissionGroup } from "../../../redux/slices/permissionsGroups";

const DeleteGroupModal = ({ showDeleteModal, setShowDeleteModal, row }) => {
  const dispatch = useDispatch();

  const handelConfirm = async () => {
    if (row) {
      try {
        await axios.delete(`groups/${row.id}/`);
        toast.success(`${row.name} group deleted successfully`);
        dispatch(removePermissionGroup(row.id));
      } catch (error) {
        toast.error("An error occurred while deletion");
      } finally {
        setShowDeleteModal(false);
      }
    }
  };

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
              {`You are about to delete ${row &&
                row.name}. When you continue, you cannot go
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
            <button className="confirm" onClick={handelConfirm}>
              Confirm
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteGroupModal;
