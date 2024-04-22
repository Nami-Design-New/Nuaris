import React from "react";
import { Form } from "react-bootstrap";

const ServiceCutomization = () => {
  return (
    <div className="bg_white_card">
      <div className="row m-0">
        <div className="col-12 p-2">
          <h6 className="form_title">Service or product picture</h6>
        </div>
        <div className="col-12 p-2">
          <div className="switches_grid">
            <div className="switch_field">
              <Form.Check id="id" label="ID" type="switch" />
            </div>
            <div className="switch_field">
              <Form.Check
                id="product_name"
                label="Product Name"
                type="switch"
              />
            </div>
            <div className="switch_field">
              <Form.Check id="quantity" label="Quantity" type="switch" />
            </div>
            <div className="switch_field">
              <Form.Check id="price" label="Price" type="switch" />
            </div>
            <div className="switch_field">
              <Form.Check id="total" label="Total" type="switch" />
            </div>
            <div className="switch_field">
              <Form.Check id="discount" label="Discount" type="switch" />
            </div>
            <div className="switch_field">
              <Form.Check
                id="after_discount"
                label="After Discount"
                type="switch"
              />
            </div>
            <div className="switch_field">
              <Form.Check id="qr_code" label="QR code" type="switch" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCutomization;
