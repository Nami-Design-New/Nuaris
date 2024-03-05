import React, { useState } from "react";
import InputField from "../../../ui/form-elements/InputField";
import SelectField from "./../../../ui/form-elements/SelectField";
import InputWithUnit from "./../../../ui/form-elements/InputWithUnit";

const BoatSpecification = () => {
  const [formData, setFormData] = useState({
    sleepingArrangements: "Accept",
  });
  return (
    <div className="fleet_form__wrapper">
      <form className="form-ui specifications">
        <div className="bg_white_card">
          <div className="row m-0">
            <div className="col-12 p-2">
              <h6 className="form_title">Engine</h6>
            </div>
            {/* Max Capacity */}
            <div className="col-lg-6 col-12 p-2">
              <InputField
                htmlFor="maxCapacity"
                label="Max Capacity."
                type="number"
                placeholder="00"
                hint="(People)"
                id="maxCapacity"
                formData={formData}
                setFormData={setFormData}
              />
            </div>
            {/* Year of Manufacture */}
            <div className="col-lg-6 col-12 p-2">
              <InputField
                htmlFor="yearOfManufacture"
                label="Year of Manufacture."
                type="date"
                id="yearOfManufacture"
                formData={formData}
                setFormData={setFormData}
              />
            </div>
            {/* Vessel Depth */}
            <div className="col-lg-6 col-12 p-2">
              <InputWithUnit
                htmlFor="vesselDepth"
                label="Vessel Depth"
                units={["Meter", "Feet", "Inch", "Yard"]}
              />
            </div>
            {/* Vessel length */}
            <div className="col-lg-6 col-12 p-2">
              <InputWithUnit
                htmlFor="vesselLength"
                label="Vessel length"
                units={["Meter", "Feet", "Inch", "Yard"]}
              />
            </div>
            {/* Engine Qty */}
            <div className="col-lg-6 col-12 p-2">
              <InputField
                htmlFor="engineQty"
                label="Engine Qty."
                type="number"
                placeholder="00"
                id="engineQty"
                formData={formData}
                setFormData={setFormData}
              />
            </div>
            {/* Engine Size */}
            <div className="col-lg-6 col-12 p-2">
              <InputField
                htmlFor="engineSize"
                label="Engine Size."
                type="number"
                placeholder="00"
                hint="(HP)"
                id="engineSize"
                formData={formData}
                setFormData={setFormData}
              />
            </div>
            {/* Engine Size */}
            <div className="col-12 p-2">
              <SelectField
                htmlFor="fuel"
                label="Fuel."
                options={["Diesel", "Gasoline", "Electric"]}
                formData={formData}
                setFormData={setFormData}
                id="fuel"
              />
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
                          sleepingArrangements: "Accept",
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
                          sleepingArrangements: "Refuse",
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
