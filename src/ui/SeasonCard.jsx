import { useState } from "react";
import InputField from "./form-elements/InputField";
import SeasonCalenderPopUp from "./modals/SeasonCalenderPopUp";
import SeasonCardPrice from "./SeasonCardPrice";

const SeasonCard = ({ formData, setFormData, index, feature }) => {
  const currentCard = formData?.season_prices[index];
  const [show, setShow] = useState(false);

  function handleDeleteSeasonCard() {
    setFormData((prev) => {
      const season_prices = [...prev.season_prices];
      season_prices.splice(index, 1);
      return {
        ...prev,
        season_prices,
      };
    });
  }

  function handleChangeSeasonPrice(e, i) {
    setFormData((prev) => {
      const season_prices = [...prev.season_prices];
      season_prices[i][e.target.name] = e.target.value;
      return {
        ...prev,
        season_prices,
      };
    });
  }

  const addSeasonPrice = () => {
    setFormData((prev) => {
      const season_prices = [...prev.season_prices];
      const prices = [...season_prices[index].prices];
      prices.push({
        period_id: "",
        price: "",
        extra_hour_price: "",
        minimum_price: "",
      });
      season_prices[index] = {
        ...season_prices[index],
        prices,
      };
      return {
        ...prev,
        season_prices,
      };
    });
  };

  const handleDeletePrice = (i) => {
    setFormData((prev) => {
      const season_prices = [...prev.season_prices];
      const prices = [...season_prices[index].prices];
      prices.splice(i, 1);
      season_prices[index] = {
        ...season_prices[index],
        prices,
      };
      return {
        ...prev,
        season_prices,
      };
    });
  };

  const handleChangePrice = (e, i) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const season_prices = [...prev.season_prices];
      const prices = [...season_prices[index].prices];
      prices[i] = {
        ...prices[i],
        [name]: value,
      };
      season_prices[index] = {
        ...season_prices[index],
        prices,
      };
      return {
        ...prev,
        season_prices,
      };
    });
  };

  const emptyPeriodId = (i, value) => {
    setFormData((prev) => {
      const season_prices = [...prev.season_prices];
      const prices = [...season_prices[index].prices];
      prices[i] = {
        ...prices[i],
        period_id: "",
        p__type: value,
      };
      season_prices[index] = {
        ...season_prices[index],
        prices,
      };
      return {
        ...prev,
        season_prices,
      };
    });
  };

  return (
    <div className="col-12 p-2">
      <div className="season_calender_card">
        <div className="row w-100">
          <div className="col-12 p-2">
            <InputField
              hint={"( Minimum 50% )"}
              label={"Advance Payment percentage"}
              name="advance_payment_percentage"
              type="number"
              placeholder="00"
              min="50"
              required
              max="100"
              value={currentCard.advance_payment_percentage}
              onChange={(e) => handleChangeSeasonPrice(e, index)}
            />
          </div>

          <div className="col-12 p-2">
            <div className="add_dates">
              <h6>Season Dates</h6>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setShow(true);
                }}
              >
                <img
                  src="/images/icons/calender-white.svg"
                  alt="calender"
                />
              </button>
            </div>
            {currentCard?.dates[0]?.start_date ? (
              <div className="season_dates">
                {currentCard?.dates?.map((d, i) => (
                  <div className="date" key={i}>
                    <h6>
                      {d?.start_date} <span> - </span> {d?.end_date}
                    </h6>
                  </div>
                ))}
              </div>
            ) : (
              <p className="m-0 text-center">Select Season Dates</p>
            )}
          </div>

          <div className="col-12 p-2 d-flex align-items-center justify-content-between">
            <h6 className="m-0">Price</h6>
            <button type="button" onClick={() => addSeasonPrice()}>
              <img src="/images/icons/add.svg" alt="addIcon" />
            </button>
          </div>

          {currentCard?.prices?.map((p, i) => {
            return (
              <SeasonCardPrice
                key={i}
                price={p}
                index={i}
                feature={feature}
                emptyPeriodId={emptyPeriodId}
                handleDeletePrice={handleDeletePrice}
                handleChangePrice={handleChangePrice}
              />
            );
          })}
        </div>

        <button
          style={{
            opacity: formData?.season_prices.length === 1 ? "0.5" : "1",
          }}
          type="button"
          className="delete_btn"
          onClick={handleDeleteSeasonCard}
          disabled={formData?.season_prices.length === 1}
        >
          <img src="/images/icons/delete.svg" alt="deleteIcon" />
        </button>
      </div>

      <SeasonCalenderPopUp
        show={show}
        setShow={setShow}
        index={index}
        currentCard={currentCard}
        setFormData={setFormData}
        formData={formData}
      />
    </div>
  );
};

export default SeasonCard;
