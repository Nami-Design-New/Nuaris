import React from "react";
import deleteIcon from "../../../../assets/images/delete.svg";
import CustomInputField from "../../../ui/form-elements/CustomInputField";

const GeneralPriceCard = ({ formData, setFormData, index }) => {
  let optionsArray = [];
  function handleChangePrice(e, i) {
    setFormData((prev) => {
      const prices = [...prev.prices];
      prices[i][e.target.name] = e.target.value;
      return {
        ...prev,
        prices
      };
    });
  }

  function handleDeletePriceCard(i) {
    setFormData((prev) => {
      const prices = [...prev.prices];
      prices.splice(i, 1);
      return {
        ...prev,
        prices
      };
    });
  }

  if (formData.prices[index].type === "minutes") {
    optionsArray = ["15", "30", "45"];
  } else if (formData.prices[index].type === "hours") {
    optionsArray = Array(12)
      .fill(1)
      .map((e, i) => i + 1);
  } else if (formData.prices[index].type === "days") {
    optionsArray = Array(31)
      .fill(1)
      .map((e, i) => i + 1);
  } else if (formData.prices[index].type === "weeks") {
    optionsArray = Array.from({ length: 51 }, (_, i) => i + 2);
  } else if (formData.prices[index].type === "months") {
    optionsArray = Array(12)
      .fill(1)
      .map((e, i) => i + 1);
  }

  return (
    <div key={index} className="col-12 p-2">
      <div className="price_card p-2">
        <div className="row m-0 w-100">
          {/* Minimum Booking Time */}
          <div className="col-lg-6 col-12 p-2">
            <div className="input-field">
              <label htmlFor="period">Minimum Booking Time</label>
              <div className="time-units">
                <select
                  className="units w-100"
                  name="min_booking_time_type"
                  id="min_booking_time_type"
                >
                  {optionsArray.map((minit, index) => (
                    <option key={index} value={minit}>
                      {minit}
                    </option>
                  ))}
                </select>
                <select
                  className="units"
                  name="type"
                  id="units"
                  value={formData.prices[index].type}
                  onChange={(e) => handleChangePrice(e, index)}
                >
                  {["minutes", "hours", "days", "weeks", "months"].map(
                    (unit, index) => (
                      <option key={index} value={unit}>
                        {unit}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>
          </div>
          {/* Price */}
          <div className="col-lg-6 col-12 p-2">
            <CustomInputField
              label="Price"
              name="price"
              hint={"( USD )"}
              type="number"
              placeholder="00"
              value={formData.prices[index].price}
              onChange={(e) => handleChangePrice(e, index)}
            />
          </div>
          {/* Extra Hour price */}
          <div className="col-lg-6 col-12 p-2">
            <CustomInputField
              disabled={
                formData.prices[index].type === "days" ||
                formData.prices[index].type === "weeks" ||
                formData.prices[index].type === "months"
              }
              label={"Extra Hour Price"}
              name="extra_hour_price"
              hint={"( USD )"}
              type="number"
              placeholder="00"
              value={formData.prices[index].extra_hour_price}
              onChange={(e) => handleChangePrice(e, index)}
            />
          </div>
          {/* Min Price */}
          <div className="col-lg-6 col-12 p-2">
            <CustomInputField
              hint={"( USD )"}
              label={"Minimum Price"}
              name="minimum_price"
              type="number"
              placeholder="00"
              value={formData.prices[index].minimum_price}
              onChange={(e) => handleChangePrice(e, index)}
            />
          </div>
        </div>
        <button
          disabled={formData.prices.length === 1}
          style={{
            opacity: formData.prices.length === 1 ? "0.5" : "1"
          }}
          type="button"
          className="delete_btn"
          onClick={handleDeletePriceCard}
        >
          <img src={deleteIcon} alt="deleteIcon" />
        </button>
      </div>
      <button
        onClick={() => {
          setFormData((prev) => {
            const prices = [...prev.prices];
            prices.splice(index, 1);
            return {
              ...prev,
              prices
            };
          });
        }}
        className="price_trash_icon"
        type="button"
      >
        <img src={deleteIcon} alt="delete" />
      </button>
    </div>
  );
};

export default GeneralPriceCard;
