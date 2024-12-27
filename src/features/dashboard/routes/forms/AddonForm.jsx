import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { DAYS } from "../../../../utils/constants";
import PageHeader from "../../layout/PageHeader";
import MainInfoForm from "../../components/addons/MainInfoForm";
import WorkingTime from "../../components/addons/WorkingTime";
import Prices from "../../components/addons/Prices";
import useGetAddonById from "../../../../hooks/addons/useGetAddonById";
import Media from "../../components/addons/Media";

export default function AddonForm() {
  const [form, setForm] = useState("Main Info");

  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({});
  const createdAddonId = searchParams.get("addon_id");
  const { id } = useParams();

  const [isMainInfoValid, setIsMainInfoValid] = useState(
    id || createdAddonId ? true : false
  );
  const [isWorkingTimeValid, setIsWorkingTimeValid] = useState(
    id || createdAddonId ? true : false
  );

  const { data: addon } = useGetAddonById(createdAddonId || id);

  const workingHoursInitial = DAYS.map((day, index) => ({
    day,
    index,
    selected: false,
    hours: [{ from_time: "00:00", to_time: "00:00" }],
  }));

  const pricesInitial = {
    price: "",
    period_id: "",
    minimum_price: "",
  };

  useEffect(() => {
    let newWorkingHours = workingHoursInitial;

    newWorkingHours = workingHoursInitial.map((item) => {
      const addonHours = addon?.working_hours?.working_hours?.find(
        (hour) => hour.day === item.day
      );

      if (addonHours) {
        return {
          ...item,
          hours: addonHours.hours.map((h) => ({
            from_time: h.from_time.split(":").slice(0, 2).join(":"),
            to_time: h.to_time.split(":").slice(0, 2).join(":"),
          })),
          selected: true,
        };
      }
      return item;
    });

    setFormData({
      id: addon?.id || "",
      name: addon?.name || "",
      description: addon?.description || "",
      category: addon?.category || "",
      quantity: addon?.quantity || "",
      renewable: addon?.renewable || false,

      prices:
        addon?.prices?.length > 0
          ? addon?.prices?.map((item) => {
              return {
                id: item.id || "",
                price: item.price,
                period_id: item.period.id,
                minimum_price: item.minimum_price,
              };
            })
          : [pricesInitial],

      working_hours: newWorkingHours,
      yacht_id: addon?.yacht?.id || "",
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addon]);

  const handleFormChange = (newForm) => {
    const steps = ["Main Info ", "Media", "Working Time", "Prices"];
    const newFormIndex = steps.indexOf(newForm);
    const currentFormIndex = steps.indexOf(form);
    if (newFormIndex < currentFormIndex) {
      setForm(newForm);
    } else {
      if (
        (form === "Main Info" && isMainInfoValid) ||
        (form === "Working Time" && isWorkingTimeValid) ||
        form === "Prices" ||
        form === "Media"
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
      <div className="row">
        <div className="inner_form_wrapper">
          <div className="wizard_tabs">
            {["Main Info", "Media", "Working Time", "Prices"].map((fo, i) => (
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
                id={id}
                setForm={setForm}
                formData={formData}
                setFormData={setFormData}
                isValid={isMainInfoValid}
                setIsValid={setIsMainInfoValid}
                createdAddonId={createdAddonId}
              />
            )}
            {form === "Media" && (
              <Media
                id={id}
                setForm={setForm}
                media={addon?.media || []}
                createdAddonId={createdAddonId}
              />
            )}
            {form === "Working Time" && (
              <WorkingTime
                id={id}
                setForm={setForm}
                createdAddonId={createdAddonId}
                formData={formData}
                setFormData={setFormData}
                isValid={isWorkingTimeValid}
                setIsValid={setIsWorkingTimeValid}
              />
            )}
            {form === "Prices" && (
              <Prices
                id={id}
                setForm={setForm}
                createdAddonId={createdAddonId}
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
