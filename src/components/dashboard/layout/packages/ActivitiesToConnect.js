import React from "react";
import addIcon from "../../../../assets/images/addRow.svg";
import deleteIcon from "../../../../assets/images/delete.svg";
import CustomSelectField from "../../../ui/form-elements/CustomSelectField";
import CustomInputField from "../../../ui/form-elements/CustomInputField";

const ActivitiesToConnect = ({
  formData,
  setFormData,
  activitiesInitial,
  activities,
}) => {
  const handleDeleteRow = (index) => {
    const updatedActivitiesList = formData?.activities_list.filter(
      (_, i) => i !== index
    );
    setFormData({ ...formData, activities_list: updatedActivitiesList });
  };

  const handleAddRow = () => {
    const updatedActivitiesList = [
      ...formData.activities_list,
      activitiesInitial,
    ];
    setFormData({ ...formData, activities_list: updatedActivitiesList });
  };
  return (
    <div className="col-12 p-2">
      <div className="addons_wrap">
        <h6>Activities you want to connect to the package</h6>
        {formData.activities_list?.map((activity, index) => {
          return (
            <div className="select_addon_row" key={index}>
              <CustomSelectField
                id={`activity-${index}`}
                options={activities?.map((activity) => ({
                  name: activity.name,
                  value: activity.name,
                }))}
                value={
                  activities?.find((ac) => ac.id === activity.activity)?.name
                }
                onChange={(e) => {
                  const updatedActivitiesList = [...formData.activities_list];
                  updatedActivitiesList[index].activity = activities?.find(
                    (ad) => ad.name === e.target.value
                  )?.id;
                  setFormData({
                    ...formData,
                    activities_list: updatedActivitiesList,
                  });
                }}
              />
              <CustomInputField
                placeholder="Quantity"
                type="number"
                value={activity.quantity}
                onChange={(e) => {
                  const updatedActivitiesList = [...formData.activities_list];
                  updatedActivitiesList[index].quantity = e.target.value;
                  setFormData({
                    ...formData,
                    activities_list: updatedActivitiesList,
                  });
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

export default ActivitiesToConnect;
