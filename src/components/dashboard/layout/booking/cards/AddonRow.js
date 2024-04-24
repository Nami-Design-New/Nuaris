import React from "react";
import CustomSelectField from "../../../../ui/form-elements/CustomSelectField";
import addRow from "../../../../../assets/images/addRow.svg";
import CustomInputField from "../../../../ui/form-elements/CustomInputField";

const AddonRow = () => {
  return (
    <div className="col-12 p-2">
      <div className="addons_wrapper">
        <CustomSelectField
          label="Addons"
          id="addon"
          name="addon"
          options={[{ name: "addon 1", value: "addon1" }]}
        />
        <CustomInputField
          label="Quantity"
          id="quantity"
          name="quantity"
          type="number"
          placeholder="00"
        />
         <div className="add_button">
        <button type="button">
          <img src={addRow} alt="addrow" />
        </button>
      </div>
      </div>
    </div>
  );
};

export default AddonRow;
