import addIcon from "../../assets/images/addRow.svg";
import deleteIcon from "../../assets/images/delete.svg";

const TimeRow = ({ formData, setFormData, currentObject, index, day }) => {
  function handleTimeChange(value, key, index) {
    currentObject.hours[index][key] = value;
    setFormData((prev) => [
      ...prev.filter((obj) => obj.day !== day),
      currentObject,
    ]);
  }

  function handleAddNewHoursRow() {
    const newObject = currentObject;
    newObject.hours.push({ from: "00:00", to: "00:00" });
    setFormData((prev) => {
      return [...prev.filter((obj) => obj.day !== day), newObject];
    });
  }

  function handleDeleteCUrrentHours() {
    currentObject.hours.splice(index, 1);
    setFormData((prev) => [
      ...prev.filter((obj) => obj.day !== day),
      currentObject,
    ]);
  }

  return (
    <div className="time_row">
      <div className="input-field">
        <input
          type="time"
          value={formData.find((e) => e.day === day).hours[index].from}
          onChange={(e) => handleTimeChange(e.target.value, "from", index)}
          required
        />
      </div>
      <div className="input-field">
        <input
          value={formData.find((e) => e.day === day).hours[index].to}
          type="time"
          onChange={(e) => handleTimeChange(e.target.value, "to", index)}
          required
        />
      </div>
      {index === 0 ? (
        <button onClick={handleAddNewHoursRow} type="button">
          <img src={addIcon} alt="add icon" />
        </button>
      ) : (
        <button onClick={handleDeleteCUrrentHours} type="button">
          <img src={deleteIcon} alt="delete icon" />
        </button>
      )}
    </div>
  );
};

export default TimeRow;
