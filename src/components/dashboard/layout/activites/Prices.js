import React, { useState } from "react";
import InputField from "../../../ui/form-elements/InputField";
import SeasonCard from "../addons/SeasonCard";
import calenderIcon from "../../../../assets/images/calender.svg";
import addIcon from "../../../../assets/images/add.svg";
import SubmitButton from "../../../ui/form-elements/SubmitButton";
import GeneralPriceCard from "../fleet/GeneralPriceCard";
import CustomInputField from "../../../ui/form-elements/CustomInputField";

const Prices = ({ setForm, formData, setFormData }) => {
  const [loading, setLoading] = useState(false);

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

        {/* Prepayment percentage */}
        <div className="col-lg-6 col-12 p-2">
          <CustomInputField
            hint={"( Minimum 50% )"}
            label={"Advanced Payment percentage"}
            name="prepaymentPercentage"
            type="number"
            placeholder="00"
            value={formData?.pre_payment_percentage}
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                pre_payment_percentage: e.target.value
              }));
            }}
          />
        </div>

        <div className="col-lg-6 col-12 p-2">
          <div className="input-field">
            <label htmlFor="period">Minimum rental Period</label>
            <div className="time-units">
              {formData?.minimum_rental_period_type === "minutes" ? (
                <select
                  className="units w-100"
                  name="minits"
                  id="minits"
                  value={formData?.minimum_rental_period}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      minimum_rental_period: e.target.value
                    }))
                  }
                >
                  {["15", "30", "45"].map((minit, index) => (
                    <option key={index} value={minit}>
                      {minit}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="number"
                  placeholder="00"
                  name="period"
                  id="period"
                  value={formData?.minimum_rental_period}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      minimum_rental_period: e.target.value
                    }))
                  }
                />
              )}
              <select
                className="units"
                name="period_type"
                id="units"
                value={formData?.minimum_rental_period_type}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    minimum_rental_period_type: e.target.value
                  }))
                }
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
