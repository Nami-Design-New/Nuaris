import deleteIcon from "../../../../assets/images/delete.svg";
import { Calendar } from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import CustomInputWithUnit from "../../../ui/form-elements/CustomInputWIthUnit";
import CustomInputField from "../../../ui/form-elements/CustomInputField";

const SeasonCard = ({ formData, setFormData, index }) => {
  const currentCard = formData.season_price.find((e) => e.index === index);

  function handleNestedChange(e, name, value = "value") {
    setFormData({
      ...formData,
      season_price: [
        ...formData.season_price.filter((e) => e.index !== index),
        {
          ...currentCard,
          price: {
            ...currentCard.price,
            [name]: e.target[value]
          }
        }
      ]
    });
  }

  function handleChange(e) {
    setFormData((prev) => ({
      ...prev,
      season_price: [
        ...prev.season_price.filter((e) => e.index !== index),
        { ...currentCard, [e.target.name]: e.target.value }
      ]
    }));
  }

  function handleDeleteSeasonCard() {
    let newseason_price = formData.season_price.filter(
      (e) => e.index !== index
    );
    newseason_price = newseason_price.map((card, i) => ({ ...card, index: i }));
    setFormData((prev) => ({ ...prev, season_price: newseason_price }));
  }

  return (
    <div className="col-12 p-2">
      <div className="season_calender_card">
        <Calendar
          value={currentCard.dates}
          onChange={(e) => {
            const dates = [...e];
            const timestampsArr = dates.map((e) =>
              e.map((e) => {
                const timestamp = e.unix;
                const dateObject = new Date(timestamp * 1000);
                return `${dateObject.getFullYear()}/${String(
                  dateObject.getMonth() + 1
                ).padStart(2, "0")}/${String(dateObject.getDate()).padStart(
                  2,
                  "0"
                )}`;
              })
            );
            setFormData({
              ...formData,
              season_price: [
                ...formData.season_price.filter((e) => e.index !== index),
                {
                  ...currentCard,
                  dates: timestampsArr
                }
              ]
            });
          }}
          multiple
          range
          plugins={[<DatePanel />]}
        />
        <div className="row m-0">
          {/* Price */}
          <div className="col-12 p-2 pe-0 ps-0">
            <CustomInputWithUnit
              name={"price"}
              onChange={(e) => handleNestedChange(e, "value")}
              selectOnChange={(e) => handleNestedChange(e, "unit")}
              value={currentCard.price.value}
              selectValue={currentCard.price.unit}
              label={"Price"}
              units={["minute", "hour", "day", "week", "month"]}
            />
          </div>
          {/* Extra Hour price */}
          <div className="col-12 p-2 pe-0 ps-0">
            <CustomInputField
              name="extraHourPrice"
              label={"Extra Hour Price"}
              hint={"( USD )"}
              placeholder="00"
              type="number"
              value={currentCard.extraHourPrice}
              onChange={handleChange}
            />
          </div>
          {/* Extra Hour price */}
          <div className="col-12 p-2 pe-0 ps-0">
            <CustomInputField
              name="minPrice"
              label={"Minimum Price"}
              hint={"( USD )"}
              placeholder="00"
              type="number"
              value={currentCard.minPrice}
              onChange={handleChange}
            />
          </div>
        </div>
        <button
          disabled={formData.season_price.length === 1}
          style={{
            opacity: formData.season_price.length === 1 ? "0.5" : "1"
          }}
          type="button"
          className="delete_btn"
          onClick={handleDeleteSeasonCard}
        >
          <img src={deleteIcon} alt="deleteIcon" />
        </button>
      </div>
    </div>
  );
};

export default SeasonCard;
