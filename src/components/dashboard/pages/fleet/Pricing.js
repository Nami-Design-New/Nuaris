import { useEffect, useState } from "react";
import CustomInputWithUnit from "../../../ui/form-elements/CustomInputWIthUnit";
import CustomInputField from "../../../ui/form-elements/CustomInputField";
import calenderIcon from "../../../../assets/images/calender.svg";
import addIcon from "../../../../assets/images/add.svg";
import saudiaFlag from "../../../../assets/images/saudiArabia.svg";
import qtr from "../../../../assets/images/qtr.svg";
import { Form } from "react-bootstrap";
import SeasonCard from "../../layout/fleet/SeasonCard";

const Pricing = () => {
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
    prepaymentPercentage: 0,
    VAT: {
      SA: false,
      QA: false,
    },
    seasonCards: [seasonCardInitialData],
  };
  const [formData, setFormData] = useState(initialData);
  const [uponRequest, setUponRequest] = useState(false);

  function handleNestedChange(e, name, value = "value") {
    setFormData({
      ...formData,
      [e.target.name]: {
        ...formData[e.target.name],
        [name]: e.target[value],
      },
    });
  }

  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

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

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <div className="fleet_form__wrapper">
      <div className="bg_white_card">
        <form className="form-ui">
          <div className="row m-0">
            <div className="col-12 p-2">
              <h6 className="form_title">Pricing</h6>
            </div>
            <div className="col-12 p-2">
              <div className="uponRequest">
                <Form.Check
                  onClick={() => setUponRequest(!uponRequest)}
                  type="switch"
                  label="Upon request"
                />
              </div>
            </div>
            {!uponRequest && (
              <>
                {/* Minimum rental Period */}
                <div className="col-lg-6 col-12 p-2">
                  <CustomInputWithUnit
                    value={formData.minimumRentalPeriod.value}
                    selectValue={formData.minimumRentalPeriod.unit}
                    onChange={(e) => handleNestedChange(e, "value")}
                    selectOnChange={(e) => handleNestedChange(e, "unit")}
                    name="minimumRentalPeriod"
                    label="Minimum rental Period"
                    units={["minutes", "hours", "days", "weeks", "months"]}
                  />
                </div>
                {/* Price */}
                <div className="col-lg-6 col-12 p-2">
                  <CustomInputWithUnit
                    value={formData.price.value}
                    selectValue={formData.price.unit}
                    onChange={(e) => handleNestedChange(e, "value")}
                    selectOnChange={(e) => handleNestedChange(e, "unit")}
                    name={"price"}
                    label="Price"
                    units={["minute", "hour", "day"]}
                  />
                </div>
                {/* Extra Hour price */}
                <div className="col-lg-6 col-12 p-2">
                  <CustomInputField
                    label={"Extra Hour Price"}
                    name="extraHourPrice"
                    hint={"( USD )"}
                    type="number"
                    placeholder="00"
                    value={formData.extraHourPrice}
                    onChange={handleChange}
                  />
                </div>
                {/* Min Price */}
                <div className="col-lg-6 col-12 p-2">
                  <CustomInputField
                    hint={"( USD )"}
                    label={"Minimum Price"}
                    name="minPrice"
                    type="number"
                    placeholder="00"
                    value={formData.minPrice}
                    onChange={handleChange}
                  />
                </div>
                {/* Prepayment percentage */}
                <div className="col-12 p-2">
                  <CustomInputField
                    hint={"( Minimum 50% )"}
                    label={"Prepayment Percentage"}
                    name="prepaymentPercentage"
                    type="number"
                    placeholder="00"
                    value={formData.prepaymentPercentage}
                    onChange={handleChange}
                  />
                </div>
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
                <div className="col-12 p-2">
                  <div className="vat_container">
                    <h6 className="form_title">Pricing</h6>
                    <div className="country_field">
                      <div className="country">
                        <img src={saudiaFlag} alt="saudiaFlag" />
                        <h6>Saudi Arabia</h6>
                      </div>
                      <Form.Check
                        name="VAT"
                        onChange={(e) => handleNestedChange(e, "SA", "checked")}
                        type="switch"
                        label="20%"
                      />
                    </div>
                    <div className="country_field">
                      <div className="country">
                        <img src={qtr} alt="saudiaFlag" />
                        <h6>Qatar</h6>
                      </div>
                      <Form.Check
                        onChange={(e) => handleNestedChange(e, "QA", "checked")}
                        name="VAT"
                        type="switch"
                        label="10%"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
            <div className="col-12 p-2 pt-4 d-flex">
              <button type="submit" className="save_btn ms-auto">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Pricing;
