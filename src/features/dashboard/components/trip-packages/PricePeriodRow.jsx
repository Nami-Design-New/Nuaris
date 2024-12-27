import { TRIP_DURATION } from "../../../../utils/constants";
import InputField from "./../../../../ui/form-elements/InputField";
import useGetPeriodTypes from "./../../../../hooks/app/useGetPeriodTypes";
import CustomTimePicker from "../../../../ui/working-hours/CustomTimePicker";
import SelectField from "../../../../ui/form-elements/SelectField";

const PricePeriodRow = ({
  index,
  currentObject,
  setFormData,
  formData,
  day,
  dayIndex,
}) => {
  const { data: durations } = useGetPeriodTypes(5);

  const handleAddRow = () => {
    const updatedTripPackageDays = [...formData.trip_package_days];
    updatedTripPackageDays[dayIndex] = {
      ...updatedTripPackageDays[dayIndex],
      periods: [
        ...updatedTripPackageDays[dayIndex].periods,
        {
          start_time: "",
          duration: "",
          price: "",
          price_type: "",
        },
      ],
    };
    setFormData({ ...formData, trip_package_days: updatedTripPackageDays });
  };

  const handleDeleteRow = () => {
    const updatedTripPackageDays = [...formData.trip_package_days];
    updatedTripPackageDays[dayIndex] = {
      ...updatedTripPackageDays[dayIndex],
      periods: updatedTripPackageDays[dayIndex].periods.filter(
        (_, idx) => idx !== index
      ),
    };
    setFormData({ ...formData, trip_package_days: updatedTripPackageDays });
  };

  const handleChange = (value, key, periodIndex) => {
    const updatedTripPackageDays = formData.trip_package_days.map((day, i) => {
      if (i === dayIndex) {
        return {
          ...day,
          periods: day.periods.map((period, j) => {
            if (j === periodIndex) {
              return {
                ...period,
                [key]: value,
              };
            }
            return period;
          }),
        };
      }
      return day;
    });

    setFormData({ ...formData, trip_package_days: updatedTripPackageDays });
  };

  const handleTimeChange = (value, key, index, currentObject, day) => {
    const updatedHours = [...currentObject.periods];
    updatedHours[index][key] = value;
    const updatedObject = { ...currentObject, periods: updatedHours };
    setFormData((prev) => {
      const currentIndex = prev.trip_package_days.findIndex(
        (obj) => obj.day === day
      );
      const newFormData = [...prev.trip_package_days];
      newFormData[currentIndex] = updatedObject;
      return {
        ...prev,
        trip_package_days: newFormData,
      };
    });
  };

  return (
    <div className="price_period_row">
      <div className="row">
        <div className="col-12 p-2">
          <div className="title">
            <h6>Package Time & Price</h6>
            {index === 0 ? (
              <button
                type="button"
                disabled={currentObject.periods.length >= 3}
                onClick={handleAddRow}
              >
                <img src="/images/icons/addRow.svg" alt="add icon" />
              </button>
            ) : (
              <button type="button" onClick={handleDeleteRow}>
                <img src="/images/icons/delete.svg" alt="delete icon" />
              </button>
            )}
          </div>
        </div>
        <div className="col-lg-6 col-12 p-2">
          <div className="input-field">
            <label htmlFor="start_item">Start Time</label>
            <CustomTimePicker
              value={currentObject.periods[index].start_time}
              onChange={(value) =>
                handleTimeChange(value, "start_time", index, currentObject, day)
              }
            />
          </div>
        </div>
        <div className="col-lg-6 col-12 p-2">
          <SelectField
            label="Duration"
            value={currentObject.periods[index].duration}
            options={TRIP_DURATION?.map((type) => ({
              value: type?.value,
              name: type?.name,
            }))}
          />
        </div>
        <div className="col-12 p-2">
          <div className="d-flex gap-2 align-items-end">
            <InputField
              label="Price"
              type="number"
              id="price"
              name="price"
              value={
                formData.trip_package_days[dayIndex]?.periods[index]?.price ||
                ""
              }
              placeholder="00"
              min="0"
              onChange={(e) => handleChange(e.target.value, "price", index)}
            />
            <div className="input-field w-25">
              <select
                name="period_id"
                id="period_id"
                value={
                  formData.trip_package_days[dayIndex]?.periods[index]
                    ?.period_id || ""
                }
                onChange={(e) =>
                  handleChange(e.target.value, "period_id", index)
                }
              >
                <option value="">select</option>
                {durations?.map((duration) => (
                  <option value={duration.id} key={duration.id}>
                    {duration.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricePeriodRow;
