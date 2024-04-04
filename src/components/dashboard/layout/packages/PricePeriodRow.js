import React from "react";
import addIcon from "../../../../assets/images/addRow.svg";
import CustomInputField from "./../../../ui/form-elements/CustomInputField";
import CustomInputWithUnit from "./../../../ui/form-elements/CustomInputWIthUnit";

const PricePeriodRow = () => {
  return (
    <div className="price_period_row">
      <div className="row m-0">
        <div className="col-12 p-2">
          <div className="title">
            <h6>Package Time & Price</h6>
            <button>
              <img src={addIcon} alt="add" />
            </button>
          </div>
        </div>
        <div className="col-lg-6 col-12 p-2">
          <CustomInputField
            label="Start Date"
            type="date"
            id="start_date"
            name="start_date"
          />
        </div>
        <div className="col-lg-6 col-12 p-2">
          <CustomInputField
            label="End Date"
            type="date"
            id="end_date"
            name="end_date"
          />
        </div>
        <div className="col-12 p-2">
          <CustomInputWithUnit
            label="Price"
            name={"price"}
            units={["per person", "per trip"]}
          />
        </div>
      </div>
    </div>
  );
};

export default PricePeriodRow;
