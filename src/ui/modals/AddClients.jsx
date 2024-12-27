import { Modal } from "react-bootstrap";
import SelectField from "../form-elements/SelectField";
import InputField from "../form-elements/InputField";
import PhoneField from "../form-elements/PhoneField";
import SubmitButton from "../form-elements/SubmitButton";

export default function AddClients({ showModal, setShowModal }) {
  return (
    <Modal
      centered
      size="lg"
      show={showModal}
      onHide={() => setShowModal(false)}
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton>
        <h6>Add New Client</h6>
      </Modal.Header>
      <Modal.Body>
        <form className="form_ui">
          <div className="row">
            <div className="col-12 p-2">
              <SelectField
                label="choose a group"
                options={[
                  { name: "Group 1", value: "group1" },
                  { name: "Group 2", value: "group2" },
                ]}
              />
            </div>
            <div className="col-lg-6 col-12 p-2">
              <InputField label="First name" placeholder="First Name" />
            </div>
            <div className="col-lg-6 col-12 p-2">
              <InputField label="Last name" placeholder="Last Name" />
            </div>
            <div className="col-lg-6 col-12 p-2">
              <PhoneField label="Mobile" placeholder="Mobile" />
            </div>
            <div className="col-lg-6 col-12 p-2">
              <InputField label="Email" placeholder="Email" />
            </div>
            <div className="col-lg-6 col-12 p-2">
              <SelectField
                label="Gender"
                options={[
                  { name: "Male", value: "male" },
                  { name: "Female", value: "female" },
                ]}
              />
            </div>
            <div className="col-lg-6 col-12 p-2">
              <InputField label="Date Of Birth" type="date" />
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
