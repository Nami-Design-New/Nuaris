import React from "react";
import SubmitButton from "../../../ui/form-elements/SubmitButton";
import calenderIcon from "../../../../assets/images/calender.svg";
import addIcon from "../../../../assets/images/add.svg";
import { useState } from "react";
import SeasonCard from "../fleet/SeasonCard";
import InputField from "../../../ui/form-elements/InputField";
import axios from "./../../../../util/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Prices = ({ setForm }) => {
  const createdAddOn = sessionStorage.getItem("addon_id");
  const navigate = useNavigate();
  const seasonCardInitialData = {
    price: {
      value: "",
      unit: "select",
    },
    extraHourPrice: "",
    minPrice: "",
    index: 0,
    dates: [new Date()],
  };

  const initialData = {
    price: "",
    price_type: "select",
    seasonCards: [seasonCardInitialData],
  };

  const [formData, setFormData] = useState(initialData);
  const [loading, setLoading] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.patch(`/addons/${createdAddOn}/`, {
        ...formData,
        price_type: formData.price_type.toLocaleLowerCase(),
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
                <option value="select" disabled>
                  Select
                </option>
                {["Minutes", "Hour", "Trip", "Item"].map((unit, index) => (
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
            htmlFor={"minPrice"}
            hint={"UCD"}
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
