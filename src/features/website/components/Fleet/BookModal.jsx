import { useState } from "react";
import { Modal } from "react-bootstrap";
import InputField from "../../../../ui/form-elements/InputField";
import TextField from "../../../../ui/form-elements/TextField";
import PhoneField from "../../../../ui/form-elements/PhoneField";
import { handleChange, handlePhoneChange } from "../../../../utils/helper";
import SubmitButton from "../../../../ui/form-elements/SubmitButton";

export default function BookModal({ show, setShow }) {
  const [formData, setFormData] = useState({
    name: "",
    company_name: "",
    mobile_number: "",
    whatsapp_number: "",
    email: "",
    more_info: "",
    date_of_booking: "",
  });

  return (
    <Modal show={show} onHide={() => setShow(false)} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Request a Quote</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="form_ui">
          <div className="row">
            <div className="col-12 p-2">
              <InputField
                label="Name"
                name="name"
                id="name"
                required
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => handleChange(e, setFormData)}
              />
            </div>

            <div className="col-lg-6 col-12 p-2">
              <PhoneField
                label="Mobile Number"
                placeholder="0XXXXXXXXX"
                required
                id="mobile_number"
                name="mobile_number"
                value={formData.mobile_number}
                onChange={(e) =>
                  handlePhoneChange(e, "mobile_number", setFormData)
                }
              />
            </div>

            <div className="col-lg-6 col-12 p-2">
              <PhoneField
                label="WhatsApp Number"
                placeholder="0XXXXXXXXX"
                required
                id="whatsapp_number"
                name="whatsapp_number"
                value={formData.whatsapp_number}
                onChange={(e) =>
                  handlePhoneChange(e, "whatsapp_number", setFormData)
                }
              />
            </div>
            <div className="col-lg-6 col-12 p-2">
              <InputField
                label="Email"
                name="email"
                required
                id="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => handleChange(e, setFormData)}
              />
            </div>

            <div className="col-lg-6 col-12 p-2">
              <InputField
                label="Date Of Booking"
                name="date_of_booking"
                required
                id="date_of_booking"
                type="date"
                value={formData.date_of_booking}
                onChange={(e) => handleChange(e, setFormData)}
              />
            </div>

            <div className="col-12 p-2">
              <TextField
                label="More Information"
                name="more_info"
                id="more_info"
                value={formData.more_info}
                onChange={(e) => handleChange(e, setFormData)}
                placeholder="Write Here"
              />
            </div>
            <div className="col-12 p-2 d-flex justify-content-end">
              <SubmitButton name="Send Request" className="fit" />
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
