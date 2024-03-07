import React from "react";

import deleteIcon from "../../assets/images/delete.svg";
import InputField from './form-elements/InputField';

const TimeRow = ({ day, index, setHours, onDelete }) => {
  const handleDelete = () => {
    onDelete(index);
    setHours([]);
  };

  return (
    <div className="time_row" key={index}>
      {/* From time */}
      <InputField
        type="time"
        htmlFor={`fromTime-${day}-${index}`}
        id={`fromTime-${day}-${index}`}
      />
      {/* To time */}
      <InputField
        type="time"
        htmlFor={`toTime-${day}-${index}`}
        id={`toTime-${day}-${index}`}
      />
      <button onClick={handleDelete}>
        <img src={deleteIcon} alt="deleteIcon" />
      </button>
    </div>
  );
};

export default TimeRow;
