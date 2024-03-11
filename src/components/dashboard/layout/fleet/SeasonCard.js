import deleteIcon from "../../../../assets/images/delete.svg";
import { Calendar } from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import CustomInputWithUnit from "../../../ui/form-elements/CustomInputWIthUnit";
import CustomInputField from "../../../ui/form-elements/CustomInputField";

const SeasonCard = ({ formData, setFormData, index }) => {
  const currentCard = formData.seasonCards.find((e) => e.index === index);

  function handleNestedChange(e, name, value = "value") {
    setFormData({
      ...formData,
      seasonCards: [
        ...formData.seasonCards.filter((e) => e.index !== index),
        {
          ...currentCard,
          price: {
            ...currentCard.price,
            [name]: e.target[value],
          },
        },
      ],
    });
  }

  function handleChange(e) {
    setFormData((prev) => ({
      ...prev,
      seasonCards: [
        ...prev.seasonCards.filter((e) => e.index !== index),
        { ...currentCard, [e.target.name]: e.target.value },
      ],
    }));
  }

  function handleDeleteSeasonCard() {
    let newSeasonCards = formData.seasonCards.filter((e) => e.index !== index);
    newSeasonCards = newSeasonCards.map((card, i) => ({ ...card, index: i }));
    setFormData((prev) => ({ ...prev, seasonCards: newSeasonCards }));
  }

  return (
    <div className="col-12 p-2">
      <div className="season_calender_card">
        <div className="row m-0">
          <div className="col-lg-7 col-12 p-0">
            <Calendar
              value={currentCard.dates}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  seasonCards: [
                    ...formData.seasonCards.filter((e) => e.index !== index),
                    {
                      ...currentCard,
                      dates: e,
                    },
                  ],
                });
              }}
              multiple
              range
              plugins={[<DatePanel />]}
            />
          </div>
          <div className="col-lg-5 col-11 p-0">
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
                  units={["minute", "hour", "day"]}
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
          </div>
          <button
            disabled={formData.seasonCards.length === 1}
            style={{
              opacity: formData.seasonCards.length === 1 ? "0.5" : "1",
            }}
            type="button"
            className="delete_btn"
            onClick={handleDeleteSeasonCard}
          >
            <img src={deleteIcon} alt="deleteIcon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeasonCard;
