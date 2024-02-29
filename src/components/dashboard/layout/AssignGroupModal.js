import React from "react";
import Modal from "react-bootstrap/Modal";
import axios from "../../../util/axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const AssignGroupModal = ({
  showDeleteModal,
  setShowDeleteModal,
  formData,
  ivitedUserId,
}) => {
  const groups = useSelector(
    (state) => state.permissionsGroups.permissionsGroups
  );
  const group = groups.find((group) => group.id === formData.id);
  console.log(groups);
  const handleConfirm = async () => {
    try {
      await axios.post(`/users/${ivitedUserId}/assign_group/`, formData);
      toast.success("Group assigned successfully");
      setShowDeleteModal(false);
    } catch (error) {
      console.log("error =>", error);
      toast.error("An error occurred while assign the group");
      setShowDeleteModal(false);
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
              {`Are you sure you want to invite thes user ( as an ${group?.name} )`}
            </p>
          </div>
          <div className="col-12 p-2 d-flex gap-2">
            <button
              className="cancel"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </button>
            <button className="confirm" onClick={() => handleConfirm()}>
              Confirm
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AssignGroupModal;
