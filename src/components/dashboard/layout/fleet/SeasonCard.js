import React from "react";
import InputWithUnit from "../../../ui/form-elements/InputWithUnit";
import InputField from "../../../ui/form-elements/InputField";
import deleteIcon from "../../../../assets/images/delete.svg";
import MultipleRangeCalender from "./MultipleRangeCalender";

const SeasonCard = ({ formData, setFormData, onDelete, index }) => {
  const handleDelete = () => {
    onDelete(index);
  };
  return (
    <div className="col-12 p-2">
      <div className="season_calender_card">
        <div className="row m-0">
          <div className="col-lg-7 col-12 p-0">
            <MultipleRangeCalender />
          </div>
          <div className="col-lg-5 col-11 p-0">
            <div className="row m-0">
              {/* Price */}
              <div className="col-12 p-2 pe-0 ps-0">
                <InputWithUnit
                  htmlFor="price"
                  label="Price"
                  units={["Per minute", "Per hour", "Per day"]}
                />
              </div>
              {/* Extra Hour price */}
              <div className="col-12 p-2 pe-0 ps-0">
                <InputField
                  htmlFor="extraHourPrice"
                  label="Extra Hour price"
                  type="number"
                  id="extraHourPrice"
                  placeholder="00"
                  hint="( USD )"
                  formData={formData}
                  setFormData={setFormData}
                />
              </div>
              {/* Extra Hour price */}
              <div className="col-12 p-2 pe-0 ps-0">
                <InputField
                  htmlFor="minPrice"
                  label="Min Price"
                  type="number"
                  id="minPrice"
                  placeholder="00"
                  hint="( USD )"
                  formData={formData}
                  setFormData={setFormData}
                />
              </div>
            </div>
          </div>
          <button className="delete_btn" onClick={handleDelete}>
            <img src={deleteIcon} alt="deleteIcon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeasonCard;
