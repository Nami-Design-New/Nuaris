import addIcon from "../../assets/images/addRow.svg";
import deleteIcon from "../../assets/images/delete.svg";

const TimeRow = ({
  currentObject,
  index,
  day,
  handleTimeChange,
  handleAddNewHoursRow,
  handleDeleteCUrrentHours
}) => {
  return (
    <div className="time_row">
      <div className="input-field">
        <input
          type="time"
          value={currentObject.hours[index].from}
          onChange={(e) =>
            handleTimeChange(e.target.value, "from", index, currentObject, day)
          }
          required
        />
      </div>
      <div className="input-field">
        <input
          value={currentObject.hours[index].to}
          type="time"
          onChange={(e) =>
            handleTimeChange(e.target.value, "to", index, currentObject, day)
          }
          required
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
          onClick={() => handleDeleteCUrrentHours(index, currentObject, day)}
          type="button"
        >
          <img src={deleteIcon} alt="delete icon" />
        </button>
      )}
    </div>
  );
};

export default TimeRow;
