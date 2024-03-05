import React, { useState } from "react";
import InputField from "../../../ui/form-elements/InputField";

const BoatSpecification = () => {
  const [formData, setFormData] = useState({
    sleepingArrangements: "Accept"
  });
  return (
    <div className="fleet_form__wrapper">
      <form className="form-ui specifications">
        <div className="bg_white_card">
          <div className="row m-0">
            <div className="col-12 p-2">
              <h6 className="form_title">Engine</h6>
            </div>
          </div>
        </div>
        <div className="bg_white_card">
          <div className="row m-0">
            <div className="col-12 p-2">
              <h6 className="form_title">Rooms</h6>
            </div>
            {/* No. of Bathrooms */}
            <div className="col-lg-6 col-12 p-2">
              <InputField
                htmlFor="bathrooms"
                label="No. of Bathrooms."
                type="number"
                placeholder="00"
                id="bathrooms"
                formData={formData}
                setFormData={setFormData}
              />
            </div>
            {/* No. of Sleeping Capacity */}
            <div className="col-lg-6 col-12 p-2">
              <InputField
                htmlFor="sleepingCapacity"
                label="No. of Sleeping Capacity."
                type="number"
                placeholder="00"
                id="sleepingCapacity"
                formData={formData}
                setFormData={setFormData}
              />
            </div>
            {/* Single Beds Qty. */}
            <div className="col-lg-6 col-12 p-2">
              <InputField
                htmlFor="singleBedsQty"
                label="Single Beds Qty."
                type="number"
                placeholder="00"
                id="singleBedsQty"
                formData={formData}
                setFormData={setFormData}
              />
            </div>
            {/* Double Beds Qty. */}
            <div className="col-lg-6 col-12 p-2">
              <InputField
                htmlFor="doubleBedsQty"
                label="Double Beds Qty."
                type="number"
                placeholder="00"
                id="doubleBedsQty"
                formData={formData}
                setFormData={setFormData}
              />
            </div>
            {/* Queen Beds Qty */}
            <div className="col-lg-6 col-12 p-2">
              <InputField
                htmlFor="queenBedsQty"
                label="Queen Beds Qty."
                type="number"
                placeholder="00"
                id="queenBedsQty"
                formData={formData}
                setFormData={setFormData}
              />
            </div>
            {/* King Bed Qty */}
            <div className="col-lg-6 col-12 p-2">
              <InputField
                htmlFor="kingBedQty"
                label="King Bed Qty."
                type="number"
                placeholder="00"
                id="kingBedQty"
                formData={formData}
                setFormData={setFormData}
              />
            </div>
            {/* Sofa Beds Qty */}
            <div className="col-lg-6 col-12 p-2">
              <InputField
                htmlFor="sofaBedsQty"
                label="Sofa Beds Qty."
                type="number"
                placeholder="00"
                id="sofaBedsQty"
                formData={formData}
                setFormData={setFormData}
              />
            </div>
            {/* Accepting sleeping arrangements */}
            <div className="col-lg-6 col-12 p-2">
              <div className="input-field">
                <label htmlFor="sleepingArrangements">
                  Accepting sleeping arrangements
                </label>
                <div className="checkboxs_inputs">
                  <span
                    className={`bg-active ${
                      formData.sleepingArrangements === "Refuse" ? "refuse" : ""
                    }`}
                  ></span>
                  <label htmlFor="accept">
                    <input
                      type="radio"
                      name="sleepingArrangements"
                      id="accept"
                      checked={formData.sleepingArrangements === "Accept"}
                      onChange={() => {
                        setFormData({
                          ...formData,
                          sleepingArrangements: "Accept"
                        });
                      }}
                    />
                    <span>Accept</span>
                  </label>
                  <label htmlFor="refuse">
                    <input
                      type="radio"
                      name="sleepingArrangements"
                      id="refuse"
                      onChange={() => {
                        setFormData({
                          ...formData,
                          sleepingArrangements: "Refuse"
                        });
                      }}
                    />
                    <span>Refuse</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button className="save_btn ms-auto">Save</button>
      </form>
    </div>
  );
};

export default BoatSpecification;
