import { useEffect, useState } from "react";
import { Calendar, DateObject } from "react-multi-date-picker";
import deleteIcon from "../../../../assets/images/delete.svg";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import CustomInputWithUnit from "../../../ui/form-elements/CustomInputWIthUnit";
import CustomInputField from "../../../ui/form-elements/CustomInputField";

const SeasonCard = ({ formData, setFormData, index }) => {
  const currentCard = formData?.season_price[index];
  const [initialDates, setInitialDates] = useState([]);

  useEffect(() => {
    if (currentCard?.dates) {
      setInitialDates(
        currentCard.dates.map((e) => [
          new DateObject().set({
            year: Number(e?.from?.split("/")[0]),
            month: Number(e?.from?.split("/")[1]),
            day: Number(e?.from?.split("/")[2])
          }),
          new DateObject().set({
            year: Number(e?.to?.split("/")[0]),
            month: Number(e?.to?.split("/")[1]),
            day: Number(e?.to?.split("/")[2])
          })
        ])
      );
    }
  }, [currentCard]);

  function handleDeleteSeasonCard() {
    setFormData((prev) => {
      const season_price = [...prev.season_price];
      season_price.splice(index, 1);
      return {
        ...prev,
        season_price
      };
    });
  }

  function handleChangeSeasonPrice(e, i) {
    setFormData((prev) => {
      const season_price = [...prev.season_price];
      season_price[i][e.target.name] = e.target.value;
      return {
        ...prev,
        season_price
      };
    });
  }

  console.log(formData?.season_price);

  return (
    <div className="col-12 p-2">
      <div className="season_calender_card">
        <div className="p-2 ps-0">
          <Calendar
            value={initialDates}
            onChange={(dates) => {
              const updatedSeasonPrices = [...formData?.season_price];
              updatedSeasonPrices[index].dates = dates.map((dateRange) => {
                if (dateRange[0] && dateRange[1]) {
                  return {
                    from: dateRange[0].format("YYYY/MM/DD"),
                    to: dateRange[1].format("YYYY/MM/DD")
                  };
                }
                return null;
              });
              setFormData((prevFormData) => ({
                ...prevFormData,
                season_price: updatedSeasonPrices
              }));
            }}
            multiple
            range
            plugins={[<DatePanel />]}
          />
        </div>
        <div className="row m-0 w-100">
          {/* Minimum rental period */}
          <div className="col-12 p-2 pe-0 ps-0">
            <CustomInputWithUnit
              value={currentCard.minimum_booking_period}
              selectValue={currentCard.minimum_booking_period_type}
              onChange={(e) => handleChangeSeasonPrice(e, index)}
              selectOnChange={(e) => handleChangeSeasonPrice(e, index)}
              selectName={"minimum_booking_period_type"}
              name={"minimum_booking_period"}
              label="Minimum booking"
              units={["minute", "hour", "day", "week", "month"]}
            />
          </div>
          {/* Price */}
          <div className="col-12 p-2 pe-0 ps-0">
            <CustomInputWithUnit
              name={"price"}
              onChange={(e) => handleChangeSeasonPrice(e, index)}
              selectOnChange={(e) => handleChangeSeasonPrice(e, index)}
              value={currentCard.price}
              selectValue={currentCard.type}
              selectName={"type"}
              label={"Price"}
              units={[
                "30 M",
                "1 H",
                "2 H",
                "3 H",
                "Trip",
                "Item"
              ]}
            />
          </div>
          {/* minimum Hour price */}
          <div className="col-lg-12 col-12 p-2 pe-0 ps-0">
            <CustomInputField
              name="minimum_price"
              label={"Minimum Price"}
              placeholder="00"
              type="number"
              value={currentCard.minimum_price}
              onChange={(e) => handleChangeSeasonPrice(e, index)}
            />
          </div>
        </div>
        <button
          disabled={formData?.season_price?.length === 1}
          style={{
            opacity: formData?.season_price?.length === 1 ? "0.5" : "1"
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
