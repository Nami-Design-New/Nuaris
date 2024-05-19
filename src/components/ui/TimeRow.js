import React from "react";
import addIcon from "../../assets/images/addRow.svg";
import deleteIcon from "../../assets/images/delete.svg";
import CustomTimePicker from "./CustomTimePicker";
import dayjs from "dayjs";

const TimeRow = ({
  currentObject,
  index,
  day,
  handleTimeChange,
  handleAddNewHoursRow,
  handleDeleteCurrentHours
}) => {
  const calculateDisabledTimes = (hours, currentIndex, key) => {
    let disabledTimes = [];
    hours.forEach((time, i) => {
      if (i !== currentIndex) {
        let start = dayjs(time.from, "HH:mm");
        let end = dayjs(time.to, "HH:mm");
        let range = [];
        let curr = start;
        while (curr.isBefore(end) || curr.isSame(end)) {
          range.push(curr.format("HH:mm"));
          curr = curr.add(5, "minute");
        }
        disabledTimes = [...disabledTimes, ...range];
      }
    });
    return disabledTimes;
  };

  const disabledFromTimes = calculateDisabledTimes(
    currentObject.hours,
    index,
    "from"
  );
  const disabledToTimes = calculateDisabledTimes(
    currentObject.hours,
    index,
    "to"
  );

  return (
    <div className="time_row">
      <div className="input-field">
        <CustomTimePicker
          value={currentObject.hours[index].from}
          onChange={(value) =>
            handleTimeChange(value, "from", index, currentObject, day)
          }
          disabledTimes={disabledFromTimes}
        />
      </div>
      <div className="input-field">
        <CustomTimePicker
          value={currentObject.hours[index].to}
          onChange={(value) =>
            handleTimeChange(value, "to", index, currentObject, day)
          }
          disabledTimes={disabledToTimes}
        />
      </div>
      {index === 0 ? (
        <button
          onClick={() => handleAddNewHoursRow(day, currentObject)}
          disabled={currentObject.hours.length >= 3}
          type="button"
        >
          <img src={addIcon} alt="add icon" />
        </button>
      ) : (
        <button
          onClick={() => handleDeleteCurrentHours(index, currentObject, day)}
          type="button"
        >
          <img src={deleteIcon} alt="delete icon" />
        </button>
      )}
    </div>
  );
};

export default TimeRow;
