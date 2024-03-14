import React from "react";
import SubmitButton from "../../../ui/form-elements/SubmitButton";
import calenderIcon from "../../../../assets/images/calender.svg";
import addIcon from "../../../../assets/images/add.svg";
import { useState } from "react";
import SeasonCard from "../fleet/SeasonCard";
import InputWithUnit from "../../../ui/form-elements/InputWithUnit";
import InputField from "../../../ui/form-elements/InputField";

const Prices = ({ setForm }) => {
  const seasonCardInitialData = {
    price: {
      value: 100,
      unit: "hour",
    },
    extraHourPrice: 0,
    minPrice: 0,
    index: 0,
    dates: [new Date()],
  };
  const initialData = {
    minimumRentalPeriod: {
      value: 1,
      unit: "hour",
    },
    price: {
      value: 100,
      unit: "hour",
    },
    extraHourPrice: 0,
    minPrice: 0,
    prepaymentPercentage: [""],
    VAT: {
      SA: false,
      QA: false,
    },
    seasonCards: [seasonCardInitialData],
  };
  const [formData, setFormData] = useState(initialData);
  const [loading] = useState(false);
  const handleBack = (e) => {
    e.preventDefault();
    setForm("Working Time");
  };
  function handleAddSeasonCard() {
    setFormData((prev) => ({
      ...prev,
      seasonCards: [
        ...prev.seasonCards,
        {
          ...seasonCardInitialData,
          index: prev.seasonCards.length,
        },
      ],
    }));
  }

  return (
    <form className="form-ui">
      <div className="row m-0">
        <div className="col-12 p-2">
          <h6 className="form_title">Prices</h6>
        </div>
        <div className="col-lg-6 col-12 p-2">
          <InputWithUnit
            formData={formData}
            setFormData={setFormData}
            units={["minute", "hour", "day", "week"]}
            label={"Price"}
            htmlFor={"price"}
          />
        </div>
        <div className="col-lg-6 col-12 p-2">
          <InputField
            formData={formData}
            setFormData={setFormData}
            label={"Minimum Price"}
            htmlFor={"minPrice"}
            hint={"UCD"}
            type="number"
            placeholder={"00"}
            id={"minPrice"}
          />
        </div>
        <div className="col-lg-6 col-12 p-2"></div>
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
        {formData.seasonCards.map((_, rowIndex) => (
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
        </div>
      </div>
    </form>
  );
};

export default Prices;
