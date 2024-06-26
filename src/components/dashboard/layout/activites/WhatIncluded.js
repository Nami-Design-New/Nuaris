import React from "react";
import addIcon from "../../../../assets/images/addRow.svg";
import deleteIcon from "../../../../assets/images/delete.svg";
import CustomInputField from "../../../ui/form-elements/CustomInputField";

const WhatIncluded = ({ whatIsIncludedInitial, setFormData, formData }) => {
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedAddonsList = [...formData?.what_included];
    updatedAddonsList[index] = {
      ...updatedAddonsList[index],
      [name]: value
    };
    setFormData((prev) => ({
      ...prev,
      what_included: updatedAddonsList
    }));
  };

  const handleAddRow = () => {
    const updatedAddonsList = [
      ...formData?.what_included,
      { ...whatIsIncludedInitial }
    ];
    setFormData((prev) => ({
      ...prev,
      what_included: updatedAddonsList
    }));
  };

  const handleDeleteRow = (index) => {
    const updatedAddonsList = formData?.what_included?.filter(
      (_, i) => i !== index
    );
    setFormData((prev) => ({
      ...prev,
      what_included: updatedAddonsList
    }));
  };

  return (
    <div className="what_included">
      <h6>Whats including</h6>
      {formData?.what_included?.map((item, index) => (
        <div className="select_addon_row" key={index}>
          <CustomInputField
            id={`item-included-${index}`}
            placeholder="EX: Tea"
            onChange={(e) => handleChange(e, index)}
            value={item.item}
            name="item"
          />
          <CustomInputField
            placeholder="Quantity"
            type="number"
            onChange={(e) => handleChange(e, index)}
            value={item.quantity}
            name="quantity"
          />
          {index === 0 ? (
            <button onClick={handleAddRow} type="button">
              <img src={addIcon} alt="add icon" />
            </button>
          ) : (
            <button onClick={() => handleDeleteRow(index)} type="button">
              <img src={deleteIcon} alt="delete icon" />
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default WhatIncluded;
