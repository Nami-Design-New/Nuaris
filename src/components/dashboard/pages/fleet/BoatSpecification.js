import React, { useState } from "react";
import InputField from "../../../ui/form-elements/InputField";
import SelectField from "./../../../ui/form-elements/SelectField";
import InputWithUnit from "./../../../ui/form-elements/InputWithUnit";
import { toast } from "react-toastify";
import axios from "axios";
import SubmitButton from "./../../../ui/form-elements/SubmitButton";
import { FUEL, YRARS } from "../../../../constants";
import { useNavigate } from "react-router-dom";

const BoatSpecification = () => {
  const createdYacht = sessionStorage.getItem("yacht_id");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    capacity: "",
    year_of_manufacture: "select",
    depth: "",
    length: "",
    engine_quantity: "",
    engine_size: "",
    bathrooms: "",
    sleeping_cabins: "",
    single_beds: "",
    double_beds: "",
    queen_beds: "",
    king_beds: "",
    sofa_beds: "",
    fuel: "select",
    accept_sleeping_arrangement: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.patch(`/yachts/${createdYacht}/`, formData);
      if (response.status === 200) {
        toast.success("Boat Specification Saved Successfully");
        navigate("/dashboard/fleet/add-yacht/working-hours");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="fleet_form__wrapper">
      <form className="form-ui specifications" onSubmit={handleSubmit}>
        <div className="bg_white_card">
          <div className="row m-0">
            <div className="col-12 p-2">
              <h6 className="form_title">Engine</h6>
            </div>
            {/* Max Capacity */}
            <div className="col-lg-6 col-12 p-2">
              <InputField
                htmlFor="capacity"
                label="Max Capacity."
                type="number"
                placeholder="00"
                hint="(People)"
                id="maxCapacity"
                value={formData.capacity}
                formData={formData}
                setFormData={setFormData}
              />
            </div>
            {/* Year of Manufacture */}
            <div className="col-lg-6 col-12 p-2">
              <SelectField
                htmlFor="year_of_manufacture"
                label="Year of Manufacture."
                id="yearOfManufacture"
                value={formData.year_of_manufacture}
                formData={formData}
                setFormData={setFormData}
                options={YRARS}
              />
            </div>
            {/* Vessel Depth */}
            <div className="col-lg-6 col-12 p-2">
              <InputWithUnit
                htmlFor="depth"
                label="Vessel Depth"
                id="vesselDepth"
                units={["Meter", "Feet", "Inch", "Yard"]}
                formData={formData}
                setFormData={setFormData}
              />
            </div>
            {/* Vessel length */}
            <div className="col-lg-6 col-12 p-2">
              <InputWithUnit
                htmlFor="length"
                label="Vessel length"
                id="vesselLength"
                units={["Meter", "Feet", "Inch", "Yard"]}
                formData={formData}
                setFormData={setFormData}
              />
            </div>
            {/* Engine Qty */}
            <div className="col-lg-6 col-12 p-2">
              <InputField
                htmlFor="engine_quantity"
                label="Engine Qty."
                type="number"
                placeholder="00"
                id="engineQty"
                value={formData.engine_quantity}
                formData={formData}
                setFormData={setFormData}
              />
            </div>
            {/* Engine Size */}
            <div className="col-lg-6 col-12 p-2">
              <InputField
                htmlFor="engine_size"
                label="Engine Size."
                type="number"
                placeholder="00"
                hint="(HP)"
                id="engineSize"
                value={formData.engine_size}
                formData={formData}
                setFormData={setFormData}
              />
            </div>
            {/* Engine Size */}
            <div className="col-12 p-2">
              <SelectField
                htmlFor="fuel"
                label="Fuel."
                id="fuel"
                value={formData.fuel}
                formData={formData}
                setFormData={setFormData}
                options={FUEL}
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
                value={formData.bathrooms}
                formData={formData}
                setFormData={setFormData}
              />
            </div>
            {/* No. of Sleeping Capacity */}
            <div className="col-lg-6 col-12 p-2">
              <InputField
                htmlFor="sleeping_cabins"
                label="No. of Sleeping Capacity."
                type="number"
                placeholder="00"
                id="sleepingCapacity"
                value={formData.sleeping_cabins}
                formData={formData}
                setFormData={setFormData}
              />
            </div>
            {/* Single Beds Qty. */}
            <div className="col-lg-6 col-12 p-2">
              <InputField
                htmlFor="single_beds"
                label="Single Beds Qty."
                type="number"
                placeholder="00"
                id="singleBedsQty"
                value={formData.single_beds}
                formData={formData}
                setFormData={setFormData}
              />
            </div>
            {/* Double Beds Qty. */}
            <div className="col-lg-6 col-12 p-2">
              <InputField
                htmlFor="double_beds"
                label="Double Beds Qty."
                type="number"
                placeholder="00"
                id="doubleBedsQty"
                value={formData.double_beds}
                formData={formData}
                setFormData={setFormData}
              />
            </div>
            {/* Queen Beds Qty */}
            <div className="col-lg-6 col-12 p-2">
              <InputField
                htmlFor="queen_beds"
                label="Queen Beds Qty."
                type="number"
                placeholder="00"
                id="queenBedsQty"
                value={formData.queen_beds}
                formData={formData}
                setFormData={setFormData}
              />
            </div>
            {/* King Bed Qty */}
            <div className="col-lg-6 col-12 p-2">
              <InputField
                htmlFor="king_beds"
                label="King Bed Qty."
                type="number"
                placeholder="00"
                id="kingBedQty"
                value={formData.king_beds}
                formData={formData}
                setFormData={setFormData}
              />
            </div>
            {/* Sofa Beds Qty */}
            <div className="col-lg-6 col-12 p-2">
              <InputField
                htmlFor="sofa_beds"
                label="Sofa Beds Qty."
                type="number"
                placeholder="00"
                id="sofaBedsQty"
                value={formData.sofa_beds}
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
                      formData.accept_sleeping_arrangement === false
                        ? "refuse"
                        : ""
                    }`}
                  ></span>
                  <label htmlFor="accept">
                    <input
                      type="radio"
                      name="sleepingArrangements"
                      id="accept"
                      checked={formData.accept_sleeping_arrangement === true}
                      onChange={() => {
                        setFormData({
                          ...formData,
                          accept_sleeping_arrangement: true,
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
                      checked={formData.accept_sleeping_arrangement === false}
                      onChange={() => {
                        setFormData({
                          ...formData,
                          accept_sleeping_arrangement: false,
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
        <SubmitButton
          className="save_btn ms-auto"
          name="Save"
          loading={loading}
        />
      </form>
    </div>
  );
};

export default BoatSpecification;
