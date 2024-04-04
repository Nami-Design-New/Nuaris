import React, { useEffect } from "react";
import SubmitButton from "../../../ui/form-elements/SubmitButton";
import calenderIcon from "../../../../assets/images/calender.svg";
import addIcon from "../../../../assets/images/add.svg";
import { useState } from "react";
import InputField from "../../../ui/form-elements/InputField";
import axios from "./../../../../util/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import SeasonCard from "./SeasonCard";

const Prices = ({ setForm, addon }) => {
  const createdAddOn = sessionStorage.getItem("addon_id");
  const navigate = useNavigate();

  const seasonCardInitialData = {
    minimum_booking_period: "",
    minimum_booking_period_type: "",
    price: "",
    type: "",
    minimum_price: "",
    dates: [new Date()]
  };
  const initialData = {
    price: "",
    price_type: "",
    min_price: "",
    season_prices: [seasonCardInitialData]
  };
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    if (addon) {
      setFormData({
        price: addon?.price,
        price_type: addon?.price_type,
        min_price: addon?.min_price,
        season_prices: addon?.season_price
      });
    }
  }, [addon]);

  const [loading, setLoading] = useState(false);
  const handleBack = (e) => {
    e.preventDefault();
    setForm("Working Time");
  };
  function handleAddSeasonCard() {
    setFormData((prev) => ({
      ...prev,
      season_prices: [
        ...prev.season_prices,
        {
          ...seasonCardInitialData,
          index: prev.season_prices.length
        }
      ]
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const updatedSeasonPrices = formData.season_prices.map((season) => ({
        ...season,
        dates: season.dates.map((date) => ({
          to: date[1],
          from: date[0]
        })),
        type: season.type.toLocaleLowerCase()
      }));
      const updatedFormData = {
        ...formData,
        season_prices: updatedSeasonPrices
      };
      const response = await axios.patch(`/addons/${createdAddOn}/`, {
        ...updatedFormData,
        price_type: formData.price_type.toLocaleLowerCase()
      });
      if (response.status === 200) {
        toast.success("Prices Saved Successfully");
        navigate("/dashboard/addons");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form-ui" onSubmit={handleSubmit}>
      <div className="row m-0">
        <div className="col-12 p-2">
          <h6 className="form_title">Prices</h6>
        </div>
        <div className="col-lg-6 col-12 p-2">
          <div className="input-field">
            <label htmlFor="price">Price</label>
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
                {[
                  "30 Minutes",
                  "1 Hour",
                  "2 Hours",
                  "3 Hours",
                  "Trip",
                  "Item"
                ].map((unit, index) => (
                  <option key={index} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-12 p-2">
          <InputField
            formData={formData}
            setFormData={setFormData}
            label={"Minimum Price"}
            htmlFor={"min_price"}
            hint={"( UCD )"}
            type="number"
            placeholder={"00"}
            id={"minPrice"}
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
        {formData.season_prices.map((_, rowIndex) => (
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
