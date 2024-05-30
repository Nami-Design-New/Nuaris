import deleteIcon from "../../../../assets/images/delete.svg";
import addIcon from "../../../../assets/images/addRow.svg";
import CustomInputField from "./../../../ui/form-elements/CustomInputField";
import CustomInputWithUnit from "./../../../ui/form-elements/CustomInputWIthUnit";

const PricePeriodRow = ({
  index,
  currentObject,
  setFormData,
  formData,
  dayIndex
}) => {
  const handleAddRow = () => {
    const updatedTripPackageDays = [...formData.trip_package_days];
    updatedTripPackageDays[dayIndex] = {
      ...updatedTripPackageDays[dayIndex],
      periods: [
        ...updatedTripPackageDays[dayIndex].periods,
        {
          start_time: "",
          end_time: "",
          price: "",
          price_type: ""
        }
      ]
    };
    setFormData({ ...formData, trip_package_days: updatedTripPackageDays });
  };

  const handleDeleteRow = () => {
    const updatedTripPackageDays = [...formData.trip_package_days];
    updatedTripPackageDays[dayIndex] = {
      ...updatedTripPackageDays[dayIndex],
      periods: updatedTripPackageDays[dayIndex].periods.filter(
        (_, idx) => idx !== index
      )
    };
    setFormData({ ...formData, trip_package_days: updatedTripPackageDays });
  };

  const handleChange = (value, key, periodIndex) => {
    const updatedTripPackageDays = [...formData.trip_package_days];
    updatedTripPackageDays[dayIndex].periods[periodIndex][key] = value;
    setFormData({ ...formData, trip_package_days: updatedTripPackageDays });
  };

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
            value={
              formData.trip_package_days[dayIndex]?.periods[index]
                ?.start_time || ""
            }
            label="Start time"
            type="time"
            id="start_time"
            name="start_time"
            onChange={(e) => handleChange(e.target.value, "start_time", index)}
          />
        </div>
        <div className="col-lg-6 col-12 p-2">
          <CustomInputField
            value={
              formData.trip_package_days[dayIndex]?.periods[index]?.end_time ||
              ""
            }
            label="End time"
            type="time"
            id="end_time"
            name="end_time"
            onChange={(e) => handleChange(e.target.value, "end_time", index)}
          />
        </div>
        <div className="col-12 p-2">
          <CustomInputWithUnit
            label="Price"
            name="price"
            value={
              formData.trip_package_days[dayIndex]?.periods[index]?.price || ""
            }
            selectValue={
              formData.trip_package_days[dayIndex]?.periods[index]
                ?.price_type || ""
            }
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
