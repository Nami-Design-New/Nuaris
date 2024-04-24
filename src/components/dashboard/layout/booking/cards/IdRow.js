import React from "react";
import addRow from "../../../../../assets/images/addRow.svg";
import CustomInputField from "../../../../ui/form-elements/CustomInputField";

const IdRow = () => {
  return (
    <div className="id_row col-12 p-2">
      <CustomInputField
        label="Name"
        id="name"
        name="name"
        placeholder="EX: mahmoud gamal "
      />
      <CustomInputField
        label="ID Number"
        id="name"
        name="name"
        placeholder="EX: 123456789"
      />
      <CustomInputField
        label="ID expiration date"
        type="date"
        id="date"
        name="date"
      />
      <div className="add_button">
        <button type="button">
          <img src={addRow} alt="addrow" />
        </button>
      </div>
    </div>
  );
};

export default IdRow;
