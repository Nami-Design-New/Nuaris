import React from "react";
import Modal from "react-bootstrap/Modal";
import axios from "../../../util/axios";
import { toast } from "react-toastify";

const DeleteModal = ({
  showDeleteModal,
  setShowDeleteModal,
  row,
  endPoint,
  tableData,
  totalRecords,
  setTotalRecords,
  setTableData
}) => {
  const handelConfirm = async () => {
    if (row) {
      try {
        await axios.delete(`${endPoint}/${row.id}/`);
        toast.success(`${row.name} group deleted successfully`);
        const updatedTableData = tableData.filter((item) => item.id !== row.id);
        setTableData(updatedTableData);
        setTotalRecords(totalRecords - 1);
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
              {`You are about to delete ${
                row && row.name
              }. When you continue, you cannot go
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
            <button className="confirm red" onClick={handelConfirm}>
              Confirm
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteModal;
