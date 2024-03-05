import React, { useState } from "react";
import InputWithUnit from "../../../ui/form-elements/InputWithUnit";
import InputField from "./../../../ui/form-elements/InputField";
import calenderIcon from "../../../../assets/images/calender.svg";
import addIcon from "../../../../assets/images/add.svg";
import { Form } from "react-bootstrap";
import SeasonCard from "../../layout/fleet/SeasonCard";

const Pricing = () => {
  const [formData, setFormData] = useState({});
  const [seasonCards, setSeasonCards] = useState([]);
  const handleAddSeasonCard = (e) => {
    e.preventDefault();
    setSeasonCards([...seasonCards, {}]);
  };
  const handleDeleteSeasonCard = (index) => {
    const newSeasonCards = [...seasonCards];
    newSeasonCards.splice(index, 1);
    setSeasonCards(newSeasonCards);
  };

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
                <Form.Check type="switch" label="Upon request" />
              </div>
            </div>
            {/* Minimum rental Period */}
            <div className="col-lg-6 col-12 p-2">
              <InputWithUnit
                htmlFor="minimumRentalPeriod"
                label="Minimum rental Period"
                units={["Minutes", "Hours", "Days", "Weeks", "Months"]}
              />
            </div>
            {/* Price */}
            <div className="col-lg-6 col-12 p-2">
              <InputWithUnit
                htmlFor="price"
                label="Price"
                units={["Per minute", "Per hour", "Per day"]}
              />
            </div>
            {/* Extra Hour price */}
            <div className="col-lg-6 col-12 p-2">
              <InputField
                htmlFor="extraHourPrice"
                label="Extra Hour price"
                type="number"
                id="extraHourPrice"
                placeholder="00"
                hint="( USD )"
                formData={formData}
                setFormData={setFormData}
              />
            </div>
            {/* Min Price */}
            <div className="col-lg-6 col-12 p-2">
              <InputField
                htmlFor="minPrice"
                label="Min Price"
                type="number"
                id="minPrice"
                hint="( USD )"
                placeholder="00"
                formData={formData}
                setFormData={setFormData}
              />
            </div>
            {/* Prepayment percentage */}
            <div className="col-12 p-2">
              <InputField
                htmlFor="prepaymentPercentage"
                label="Prepayment percentage"
                type="number"
                id="prepaymentPercentage"
                hint="( Minimum 50% )"
                placeholder="00"
                formData={formData}
                setFormData={setFormData}
              />
            </div>
            {/* calender seasons title */}
            <div className="col-12 p-2 d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center gap-2 addSeason">
                <img src={calenderIcon} alt="calender" />
                <h6 className="m-0">Season Price</h6>
              </div>
              <button onClick={handleAddSeasonCard}>
                <img src={addIcon} alt="addIcon" />
              </button>
            </div>
            {/* calender seasons cards */}
            {seasonCards.map((_, rowIndex) => (
              <SeasonCard
                formData={formData}
                setFormData={setFormData}
                key={rowIndex}
                index={rowIndex}
                onDelete={handleDeleteSeasonCard}
              />
            ))}
            <div className="col-12 p-2 pt-4 d-flex">
              <button className="save_btn ms-auto">Save</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Pricing;
