import React from "react";
import addIcon from "../../../../assets/images/addRow.svg";
import deleteIcon from "../../../../assets/images/delete.svg";
import CustomSelectField from "../../../ui/form-elements/CustomSelectField";
import CustomInputField from "../../../ui/form-elements/CustomInputField";

const AddonsToConnect = ({ formData, setFormData, addons, addonsInitial }) => {
  const handleDeleteRow = (index) => {
    const updatedAddonsList = formData.addons_list.filter(
      (_, i) => i !== index
    );
    setFormData({ ...formData, addons_list: updatedAddonsList });
  };

  const handleAddRow = () => {
    const updatedAddonsList = [...formData.addons_list, addonsInitial];
    setFormData({ ...formData, addons_list: updatedAddonsList });
  };

  return (
    <div className="col-12 p-2">
      <div className="addons_wrap">
        <h6>Addons you want to connect to the package</h6>
        {formData.addons_list.map((addon, index) => {
          return (
            <div className="select_addon_row" key={index}>
              <CustomSelectField
                id={`addon-${index}`}
                options={addons.map((addon) => ({
                  name: addon.name,
                  value: addon.name,
                }))}
                value={addons?.find((ad) => ad.id === addon.addon)?.name}
                onChange={(e) => {
                  const updatedAddonsList = [...formData.addons_list];
                  updatedAddonsList[index].addon = addons?.find(
                    (ad) => ad.name === e.target.value
                  )?.id;
                  setFormData({ ...formData, addons_list: updatedAddonsList });
                }}
              />
              <CustomInputField
                placeholder="Quantity"
                type="number"
                value={addon.quantity}
                onChange={(e) => {
                  const updatedAddonsList = [...formData.addons_list];
                  updatedAddonsList[index].quantity = e.target.value;
                  setFormData({ ...formData, addons_list: updatedAddonsList });
                }}
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
          );
        })}
      </div>
    </div>
  );
};

export default AddonsToConnect;
