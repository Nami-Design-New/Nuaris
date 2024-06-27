import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DAYS } from "../../../../constants";
import axios from "../../../../util/axios";
import MainInfoForm from "../../layout/addons/MainInfoForm";
import WorkingTime from "../../layout/addons/WorkingTime";
import Prices from "../../layout/addons/Prices";
import PageHeader from "../../layout/shared/PageHeader";

const AddNewAddOn = () => {
  const { id } = useParams();
  const [addon, setAddon] = useState(null);
  const [form, setForm] = useState("Main Info");
  const [hasParentYacht, setHasParentYacht] = useState(false);
  const [isMainInfoValid, setIsMainInfoValid] = useState(true);
  const [isWorkingTimeValid, setIsWorkingTimeValid] = useState(true);

  const workingHoursInitial = DAYS.map((day, index) => ({
    day,
    index,
    selected: false,
    hours: [{ from: "00:00", to: "00:00" }]
  }));

  const pricesInitial = {
    price: "",
    price_type: "",
    min_price: ""
  };

  const [formData, setFormData] = useState({
    attachment: Array(3).fill(""),
    video_link: "",
    name: "",
    description: "",
    category: "",
    quantity: "",
    yacht: "",
    vat: null,
    working_hours: workingHoursInitial,
    prices: [pricesInitial]
  });

  useEffect(() => {
    if (id) {
      axios
        .get(`/addons/${id}/`)
        .then((res) => {
          setAddon(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id]);

  const handleFormChange = (newForm) => {
    const steps = ["Main Info ", "Working Time", "Prices"];
    const newFormIndex = steps.indexOf(newForm);
    const currentFormIndex = steps.indexOf(form);
    if (newFormIndex < currentFormIndex) {
      setForm(newForm);
    } else {
      if (
        (form === "Main Info" && isMainInfoValid) ||
        (form === "Working Time" && isWorkingTimeValid) ||
        form === "Prices"
      ) {
        setForm(newForm);
      }
    }
  };

  return (
    <section className="section-main-content">
      <header className="flex-header">
        <PageHeader
          name={id ? "Edit Addon" : "Add New addon"}
          removeLast={id ? true : false}
        />
      </header>
      <div className="row m-0">
        <div className="addon_form_wrapper">
          <div className="wizard_tabs">
            {["Main Info", "Working Time", "Prices"].map((fo, i) => (
              <div
                key={i}
                className={`wizard_tab ${form === fo ? "active" : ""}`}
                onClick={() => handleFormChange(fo)}
              >
                <div className="step_no">{i + 1}</div>
                <h6>{fo}</h6>
              </div>
            ))}
          </div>
          <div className="bg_white_card">
            {form === "Main Info" && (
              <MainInfoForm
                setForm={setForm}
                addon={addon}
                formData={formData}
                setFormData={setFormData}
                setHasParentYacht={setHasParentYacht}
                hasParentYacht={hasParentYacht}
                isValid={isMainInfoValid}
                setIsValid={setIsMainInfoValid}
              />
            )}
            {form === "Working Time" && (
              <WorkingTime
                setForm={setForm}
                addon={addon}
                formData={formData}
                setFormData={setFormData}
                isValid={isWorkingTimeValid}
                setIsValid={setIsWorkingTimeValid}
              />
            )}
            {form === "Prices" && (
              <Prices
                setForm={setForm}
                addon={addon}
                pricesInitial={pricesInitial}
                formData={formData}
                setFormData={setFormData}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddNewAddOn;
