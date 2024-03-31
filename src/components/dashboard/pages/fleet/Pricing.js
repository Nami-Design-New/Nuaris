import { useEffect, useState } from "react";
import CustomInputWithUnit from "../../../ui/form-elements/CustomInputWIthUnit";
import CustomInputField from "../../../ui/form-elements/CustomInputField";
import calenderIcon from "../../../../assets/images/calender.svg";
import addIcon from "../../../../assets/images/add.svg";
import { Form } from "react-bootstrap";
import SeasonCard from "../../layout/fleet/SeasonCard";
import deleteIcon from "../../../../assets/images/delete.svg";
import Vat from "../../layout/Vat";

const Pricing = () => {
  const seasonCardInitialData = {
    price: "",
    period: "",
    type: "hours",
    period_type: "hours",
    extra_hour_price: "",
    minimum_price: "",
    dates: [new Date()],
  };
  const initialPricesData = {
    price: "",
    type: "hours",
    extra_hour_price: "",
    minimum_price: "",
  };
  const initialData = {
    prices: [initialPricesData],
    season_prices: [seasonCardInitialData],
    vat: [],
    period: "",
    period_type: "hours",
    period_price: "",
    prepayment_percentage: 100,
  };

  const [formData, setFormData] = useState(initialData);
  const [uponRequest, setUponRequest] = useState(false);

  function handleChangePrice(e, i) {
    setFormData((prev) => {
      const prices = [...prev.prices];
      prices[i][e.target.name] = e.target.value;
      return {
        ...prev,
        prices,
      };
    });
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
    //   season_price: [...formData.season_prices],
    // };
    // console.log(responseType);
  }

  useEffect(() => {
    console.log(formData);
  }, [formData]);

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
                {/* Prepayment percentage */}
                <div className="col-12 p-2">
                  <CustomInputField
                    hint={"( Minimum 50% )"}
                    label={"Prepayment percentage"}
                    name="prepaymentPercentage"
                    type="number"
                    placeholder="00"
                    value={formData.prepayment_percentage}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        prepayment_percentage: e.target.value,
                      }));
                    }}
                  />
                </div>
                <div className="col-lg-6 col-12 p-2">
                  <div className="input-field">
                    <label htmlFor="period">Minimum rental Period</label>
                    <div className="time-units">
                      {formData.period_type === "minutes" ? (
                        <select
                          className="units w-100"
                          name="minits"
                          id="minits"
                          value={formData.period}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              period: e.target.value,
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
                          value={formData.period}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              period: e.target.value,
                            }))
                          }
                        />
                      )}
                      <select
                        className="units"
                        name="period_type"
                        id="units"
                        value={formData.period_type}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            period_type: e.target.value,
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
                {/* Price */}
                <div className="col-lg-6 col-12 p-2">
                  <CustomInputField
                    selectName={"type"}
                    name={"price"}
                    label="Price"
                    placeholder="00"
                    value={formData.period_price}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        period_price: e.target.value,
                      }));
                    }}
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
                    <div key={index} className="col-12 p-2">
                      <div className="price_card p-2">
                        <div className="row m-0 w-100">
                          {/* Price */}
                          <div className="col-12 p-2">
                            <CustomInputWithUnit
                              value={e.price}
                              selectValue={e.type}
                              onChange={(e) => handleChangePrice(e, index)}
                              selectOnChange={(e) =>
                                handleChangePrice(e, index)
                              }
                              selectName={"type"}
                              name={"price"}
                              label="Price"
                              units={["minute", "hour", "day", "week", "month"]}
                            />
                          </div>
                          {/* Extra Hour price */}
                          <div className="col-lg-6 col-12 p-2">
                            <CustomInputField
                              label={"Extra Hour Price"}
                              name="extra_hour_price"
                              hint={"( USD )"}
                              type="number"
                              placeholder="00"
                              value={e.extra_hour_price}
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
                              value={e.minimum_price}
                              onChange={(e) => handleChangePrice(e, index)}
                            />
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setFormData((prev) => {
                            const prices = [...prev.prices];
                            prices.splice(index, 1);
                            return {
                              ...prev,
                              prices,
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
                })}
                {/* calender seasons title */}
                <div className="col-12 p-2 d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-2 addSeason">
                    <img src={calenderIcon} alt="calender" />
                    <h6 className="m-0">Season Price</h6>
                  </div>
                  <button
                    onClick={() => {
                      setFormData((prev) => {
                        return {
                          ...prev,
                          season_prices: [
                            ...prev.season_prices,
                            seasonCardInitialData,
                          ],
                        };
                      });
                    }}
                    type="button"
                  >
                    <img src={addIcon} alt="addIcon" />
                  </button>
                </div>
                {/* calender seasons cards */}
                {formData.season_prices.map((_, rowIndex) => (
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
