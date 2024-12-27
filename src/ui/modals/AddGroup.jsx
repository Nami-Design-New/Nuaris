import { Modal } from "react-bootstrap";
import InputField from "../form-elements/InputField";
import SubmitButton from "../form-elements/SubmitButton";
import SelectField from "../form-elements/SelectField";

export default function AddGroup({ showModal, setShowModal }) {
  return (
    <Modal
      centered
      size="lg"
      show={showModal}
      onHide={() => setShowModal(false)}
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton>
        <h6>Add New Group</h6>
      </Modal.Header>
      <Modal.Body>
        <form className="form_ui">
          <div className="row">
            <div className="col-12 p-2">
              <InputField label="Group Name" placeholder="Group Name" />
            </div>
            <div className="col-12 p-2">
              <div className="group_row">
                <SelectField
                  label="Condition"
                  options={[
                    { name: "Condition 1", value: "condition1" },
                    { name: "Condition 2", value: "condition2" },
                  ]}
                />
                <InputField label="Less than" placeholder="Less than" />
                <InputField label="Less than" placeholder="Less than" />
                <button>
                  <img src="/public/images/icons/addRow.svg" alt="delete" />
                </button>
              </div>
            </div>
            <div className="col-12 p-2 d-flex justify-content-end">
              <SubmitButton name="Save" className={"mt-3 w-25"} />
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
