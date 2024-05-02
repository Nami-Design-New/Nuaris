import React, { useState } from "react";
import InputField from "../../../ui/form-elements/InputField";
import SeasonCard from "../addons/SeasonCard";
import calenderIcon from "../../../../assets/images/calender.svg";
import addIcon from "../../../../assets/images/add.svg";
import SubmitButton from "../../../ui/form-elements/SubmitButton";
import GeneralPriceCard from "../fleet/GeneralPriceCard";

const Prices = ({ setForm }) => {
  const [loading, setLoading] = useState(false);
  const seasonCardInitialData = {
    minimum_booking_period: "",
    minimum_booking_period_type: "minutes",
    price: "",
    type: "",
    minimum_price: "",
    dates: [new Date()],
  };
  const initialPricesData = {
    period: 4,
    period_type: "",
    price: "",
    extra_hour_price: "",
    minimum_price: "",
  };
  const initialData = {
    price: "",
    price_type: "",
    min_price: "",
    prices: [initialPricesData],
    season_prices: [seasonCardInitialData],
  };
  const [formData, setFormData] = useState(initialData);
  function handleAddSeasonCard() {
    setFormData((prev) => ({
      ...prev,
      season_prices: [
        ...prev.season_prices,
        {
          ...seasonCardInitialData,
          index: prev.season_prices.length,
        },
      ],
    }));
  }
  const handleNext = (e) => {
    e.preventDefault();
    setForm("Policy");
  };

  const handleBack = (e) => {
    e.preventDefault();
    setForm("Working hours");
  };

  return (
    <form className="form-ui">
      <div className="row m-0">
        <div className="col-12 p-2">
          <h6 className="form_title">Prices</h6>
        </div>
        <div className="col-lg-6 col-12 p-2">
          <div className="input-field">
            <label htmlFor="min_period">Minimum rental Period</label>
            <div className="time-units">
              <input
                type="number"
                placeholder="00"
                name="price"
                id="price"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
              />
              <select
                className="units"
                name="units"
                id="units"
                value={formData.price_type}
                onChange={(e) => {
                  setFormData({ ...formData, price_type: e.target.value });
                }}
              >
                <option value={""} disabled>
                  Select
                </option>
                {["Minutes", "Hours", "Days", "Weeks", "Months"].map(
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
        <div className="col-lg-6 col-12 p-2">
          <InputField
            formData={formData}
            setFormData={setFormData}
            label={"Price"}
            htmlFor={"min_price"}
            type="number"
            placeholder={"00"}
            id={"minPrice"}
          />
        </div>
        <div className="col-12 p-2 d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-2 addSeason">
            <h6 className="m-0">General Price</h6>
          </div>
          <button
            onClick={() => {
              setFormData((prev) => {
                return {
                  ...prev,
                  prices: [...prev.prices, initialPricesData],
                };
              });
            }}
            type="button"
          >
            <img src={addIcon} alt="addIcon" />
          </button>
        </div>
        {formData.prices.map((e, index) => {
          return (
            <GeneralPriceCard
              key={index}
              formData={formData}
              setFormData={setFormData}
              index={index}
            />
          );
        })}
        {/* calender seasons title */}
        <div className="col-12 p-2 d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-2 addSeason">
            <img src={calenderIcon} alt="calender" />
            <h6 className="m-0">Season Price</h6>
          </div>
          <button onClick={handleAddSeasonCard} type="button">
            <img src={addIcon} alt="addIcon" />
          </button>
        </div>
        {/* calender seasons cards */}
        {formData?.season_prices.map((_, rowIndex) => (
          <SeasonCard
            key={rowIndex}
            formData={formData}
            setFormData={setFormData}
            index={rowIndex}
          />
        ))}
        <div className="col-12 p-2 pt-4 d-flex gap-3">
          <button className="next_btn" onClick={handleBack}>
            Back
          </button>
          <SubmitButton
            loading={loading}
            name="Save"
            className="save_btn ms-auto"
          />
          <button className="next_btn" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </form>
  );
};

export default Prices;
