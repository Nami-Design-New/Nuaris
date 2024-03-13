import { useEffect, useState } from "react";
import CustomInputWithUnit from "../../../ui/form-elements/CustomInputWIthUnit";
import CustomInputField from "../../../ui/form-elements/CustomInputField";
import calenderIcon from "../../../../assets/images/calender.svg";
import addIcon from "../../../../assets/images/add.svg";
import trashIcon from "../../../../assets/images/delete.svg";
import { Form } from "react-bootstrap";
import SeasonCard from "../../layout/fleet/SeasonCard";
import Vat from "../../layout/Vat";

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
    prepaymentPercentage: [""],
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

  function handleSubmit(e) {
    e.preventDefault();
    // const responseType = {
    //   price: [
    //     {
    //       minimumRentalPeriod: formData.minimumRentalPeriod,
    //       price: formData.price,
    //       extraHourPrice: formData.extraHourPrice,
    //       minimumPrice: formData.minimumPrice,
    //       prepaymentPercentage: formData.prepaymentPercentage,
    //     },
    //   ],
    //   season_price: [...formData.seasonCards],
    // };
    // console.log(responseType);
  }

  return (
    <div className="fleet_form__wrapper">
      <div className="bg_white_card">
        <form onSubmit={(e) => handleSubmit(e)} className="form-ui">
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
                  <label className="fw-medium align-items-start d-flex gap-3 justify-content-between">
                    <div>
                      Prepayment Percentage{" "}
                      <span className="hint">{"( Minimum 50% )"}</span>
                    </div>
                    <button
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          prepaymentPercentage: [
                            ...prev.prepaymentPercentage,
                            "",
                          ],
                        }))
                      }
                      type="button"
                    >
                      <img src={addIcon} alt="add" />
                    </button>
                  </label>
                  <div className="d-flex flex-column gap-2">
                    {formData.prepaymentPercentage.map((e, i) => {
                      return (
                        <div key={i} className="d-flex gap-3">
                          <CustomInputField
                            name="prepaymentPercentage"
                            type="number"
                            placeholder="00"
                            value={e}
                            onChange={(e) => {
                              const newArr = [...formData.prepaymentPercentage];
                              newArr[i] = e.target.value;
                              setFormData((prev) => {
                                return {
                                  ...prev,
                                  prepaymentPercentage: newArr,
                                };
                              });
                            }}
                          />
                          <button
                            onClick={() => {
                              const newArr = [...formData.prepaymentPercentage];
                              newArr.splice(i, 1);
                              setFormData((prev) => {
                                return {
                                  ...prev,
                                  prepaymentPercentage: newArr,
                                };
                              });
                            }}
                            className={`${
                              formData.prepaymentPercentage.length === 1 &&
                              "pe-none opacity-50"
                            }`}
                            type="button"
                          >
                            <img src={trashIcon} alt="delete" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
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
                  <Vat />
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
