import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DAYS } from "../../../utils/contants";
import PageHeader from "../layout/PageHeader";
import MainInfoForm from "./../components/addons/MainInfoForm";
import WorkingTime from "../components/addons/WorkingTime";
import Prices from "../components/addons/Prices";
import useGetAddonById from "../../../hooks/useGetAddonById";

export default function AddonForm() {
  const { id } = useParams();
  const [form, setForm] = useState("Main Info");
  const [isMainInfoValid, setIsMainInfoValid] = useState(false);
  const [isWorkingTimeValid, setIsWorkingTimeValid] = useState(false);
  const { data: addon } = useGetAddonById(id);
  // Initial Values
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
  // form data
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
    if (addon) {
      setFormData(addon);
    }
  }, [addon]);

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
        <div className="inner_form_wrapper">
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
                formData={formData}
                setFormData={setFormData}
                isValid={isMainInfoValid}
                setIsValid={setIsMainInfoValid}
              />
            )}
            {form === "Working Time" && (
              <WorkingTime
                setForm={setForm}
                formData={formData}
                setFormData={setFormData}
                isValid={isWorkingTimeValid}
                setIsValid={setIsWorkingTimeValid}
              />
            )}
            {form === "Prices" && (
              <Prices
                setForm={setForm}
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
}
