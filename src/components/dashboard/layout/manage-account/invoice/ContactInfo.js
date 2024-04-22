import React from "react";
import { Form } from "react-bootstrap";

const ContactInfo = () => {
  return (
    <div className="bg_white_card">
      <div className="row m-0">
        <div className="col-12 p-2">
          <h6 className="form_title">Company & contact Info</h6>
        </div>
        <div className="col-12 p-2">
          <div className="switches_grid">
            <div className="switch_field">
              <Form.Check id="show_name" label="Show Name" type="switch" />
            </div>
            <div className="switch_field">
              <Form.Check id="show_logo" label="Show Logo" type="switch" />
            </div>
            <div className="switch_field">
              <Form.Check id="show_email" label="Show Email" type="switch" />
            </div>
            <div className="switch_field">
              <Form.Check
                id="show_address"
                label="Show Address"
                type="switch"
              />
            </div>
            <div className="switch_field">
              <Form.Check
                id="show_contact"
                label="Show Contact"
                type="switch"
              />
            </div>
            <div className="switch_field">
              <Form.Check
                id="show_vat_number"
                label="Show Vat Number"
                type="switch"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
