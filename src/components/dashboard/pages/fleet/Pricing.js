import { useState } from "react";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CustomInputField from "../../../ui/form-elements/CustomInputField";
import calenderIcon from "../../../../assets/images/calender.svg";
import addIcon from "../../../../assets/images/add.svg";
import SeasonCard from "../../layout/fleet/SeasonCard";
import Vat from "../../layout/shared/Vat";
import GeneralPriceCard from "../../layout/fleet/GeneralPriceCard";
import axios from "./../../../../util/axios";
import SubmitButton from "../../../ui/form-elements/SubmitButton";

const Pricing = () => {
  const yachtId = sessionStorage.getItem("yacht_id");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const seasonCardInitialData = {
    price: "",
    period: "",
    type: "",
    period_type: "",
    extra_hour_price: "",
    minimum_price: "",
    dates: [new Date()]
  };
  const initialPricesData = {
    period: 4,
    period_type: "",
    price: "",
    extra_hour_price: "",
    minimum_price: ""
  };
  const initialData = {
    prices: [initialPricesData],
    season_prices: [seasonCardInitialData],
    vat: [],
    price: "",
    pre_payment_percentage: 100,
    minimum_rental_period: "",
    minimum_rental_period_type: "hours"
  };

  const [formData, setFormData] = useState(initialData);
  const [uponRequest, setUponRequest] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!yachtId) {
      toast.error("Create a Yacht first");
      setLoading(false);
      return;
    }
    const updatedSeasonPrices = formData.season_prices.map((season) => ({
      ...season,
      dates: season.dates.map((date) => ({
        to: date[1],
        from: date[0]
      }))
    }));
    const updatedFormData = {
      ...formData,
      season_prices: updatedSeasonPrices
    };
    try {
      const response = await axios.patch(
        `/yachts/${yachtId}/update-price/`,
        updatedFormData
      );
      if (response?.status === 200 || response?.status === 201) {
        toast.success("Pricing Saved Successfully");
        navigate("/dashboard/fleet/add-yacht/add-ons-connected");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

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
                    value={formData.pre_payment_percentage}
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
                      {formData.minimum_rental_period_type === "minutes" ? (
                        <select
                          className="units w-100"
                          name="minits"
                          id="minits"
                          value={formData.minimum_rental_period}
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
                          value={formData.minimum_rental_period}
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
                        value={formData.minimum_rental_period_type}
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
                {/* Price */}
                <div className="col-lg-6 col-12 p-2">
                  <CustomInputField
                    selectName={"type"}
                    name={"price"}
                    label="Price"
                    placeholder="00"
                    value={formData.price}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        price: e.target.value
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
                          prices: [...prev.prices, initialPricesData]
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
                  <button
                    onClick={() => {
                      setFormData((prev) => {
                        return {
                          ...prev,
                          season_prices: [
                            ...prev.season_prices,
                            seasonCardInitialData
                          ]
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
              <SubmitButton
                name={"save"}
                loading={loading}
                className="save_btn ms-auto"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Pricing;
