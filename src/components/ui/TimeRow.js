import React from "react";
import InputField from "./form-elements/InputField";
import deleteIcon from "../../assets/images/delete.svg";

const TimeRow = ({ day, index, formData, setFormData, onDelete }) => {
  const handleDelete = () => {
    onDelete(index);
  };
  return (
    <div className="time_row" key={index}>
      {/* From time */}
      <InputField
        type="time"
        htmlFor={`fromTime-${day}-${index}`}
        id={`fromTime-${day}-${index}`}
        formData={formData}
        setFormData={setFormData}
      />
      {/* To time */}
      <InputField
        type="time"
        htmlFor={`toTime-${day}-${index}`}
        id={`toTime-${day}-${index}`}
        formData={formData}
        setFormData={setFormData}
      />
      <button onClick={handleDelete}>
        <img src={deleteIcon} alt="deleteIcon" />
      </button>
    </div>
  );
};

export default TimeRow;
