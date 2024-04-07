import deleteIcon from "../../../../assets/images/delete.svg";
import addIcon from "../../../../assets/images/addRow.svg";
import CustomInputField from "./../../../ui/form-elements/CustomInputField";
import CustomInputWithUnit from "./../../../ui/form-elements/CustomInputWIthUnit";

const PricePeriodRow = ({
  day,
  index,
  currentObject,
  setFormData,
  formData,
  dayIndex
}) => {
  const handleAddRow = () => {
    const tempObj = {...currentObject};
    tempObj.periods.push({
      start_date: "",
      end_date: "",
      price: "",
      price_type: "",
    });
    setFormData((prev) => [
      ...prev,
      tempObj
    ]);
  };

  const handleDeleteRow = () => {
    currentObject.periods.splice(index, 1);
    setFormData((prev) => [
      ...prev.filter((obj) => obj.day !== day),
      currentObject
    ]);
  };

  function handleChange(value, key, index) {
    const tempObj = {...currentObject};
    tempObj.periods[index][key] = value;
    
    // prevent settings the data in all days indexes
    const newFormData = formData.map((obj) => {
      if (obj.day === day) {
        return tempObj;
      }
      return obj;
    });
    
    setFormData(newFormData);
  }

  return (
    <div className="price_period_row">
      <div className="row m-0">
        <div className="col-12 p-2">
          <div className="title">
            <h6>Package Time & Price</h6>
            {index === 0 ? (
              <button
                type="button"
                disabled={currentObject.periods.length >= 3}
                onClick={handleAddRow}
              >
                <img src={addIcon} alt="add icon" />
              </button>
            ) : (
              <button type="button" onClick={handleDeleteRow}>
                <img src={deleteIcon} alt="delete icon" />
              </button>
            )}
          </div>
        </div>
        <div className="col-lg-6 col-12 p-2">
          <CustomInputField
            value={formData[dayIndex]?.periods[index]?.start_date || ""}
            label="Start time"
            type="datetime-local"
            id="start_date"
            name="start_date"
            onChange={(e) => {
              console.log(e.target)
              handleChange(e.target.value, "start_date", index)
            }}
          />
        </div>
        <div className="col-lg-6 col-12 p-2">
          <CustomInputField
            value={formData[dayIndex]?.periods[index]?.end_date || ""}
            label="End time"
            type="datetime-local"
            id="end_date"
            name="end_date"
            onChange={(e) => handleChange(e.target.value, "end_date", index)}
          />
        </div>
        <div className="col-12 p-2">
          <CustomInputWithUnit
            label="Price"
            name={"price"}
            value={formData[dayIndex]?.periods[index]?.price || ""}
            selectValue={formData[dayIndex]?.periods[index]?.price_type || ""}
            units={["per person", "per trip"]}
            onChange={(e) => handleChange(e.target.value, "price", index)}
            selectName="price_type"
            selectOnChange={(e) =>
              handleChange(e.target.value, "price_type", index)
            }
          />
        </div>
      </div>
    </div>
  );
};

export default PricePeriodRow;
