import React, { useEffect, useState } from "react";
import SubmitButton from "../../../ui/form-elements/SubmitButton";
import DaysAccordion from "../../../ui/DaysAccordion";
import { DAYS } from "../../../../constants";
import axios from "./../../../../util/axios";
import { toast } from "react-toastify";

const WorkingTime = ({ setForm, addon }) => {
  const formDataInitial = DAYS.map((day, index) => {
    return {
      day,
      hours: [{ from: "00:00", to: "00:00" }],
      selected: false,
      index,
    };
  });
  const [formData, setFormData] = useState(formDataInitial);
  const createdAddOn = sessionStorage.getItem("addon_id");
  useEffect(() => {
    if (addon.id) {
      const newWorkingHours = addon?.working_hours?.map((e) => {
        return {
          ...e,
          selected: true,
          index: formData.findIndex((obj) => obj.day === e.day),
        };
      });
      let newFormData = [...formData];
      newWorkingHours.forEach((e) => {
        newFormData[e.index].hours = e.hours;
        newFormData[e.index].selected = true;
      });
      setFormData(newFormData);
    }
  }, [addon]);
  const [loading, setLoading] = useState(false);
  const handleNext = (e) => {
    e.preventDefault();
    setForm("Prices");
  };
  const handleBack = (e) => {
    e.preventDefault();
    setForm("Main Info");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const filteredFormData = formData.filter((obj) => obj.selected === true);
      const reqData = filteredFormData.map((obj) => {
        return {
          day: obj.day,
          hours: obj.hours,
        };
      });
      const dictionary = { working_hours: reqData };
      const response = await axios.patch(
        `/addons/${createdAddOn}/`,
        dictionary
      );
      if (response.status === 200) {
        toast.success("Working Time Saved Successfully");
        setForm("Prices");
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
          <h6 className="form_title">Working Time</h6>
        </div>
        <div className="col-12 p-2">
          <DaysAccordion formData={formData} setFormData={setFormData} />
        </div>
        <div className="col-12 p-2 pt-4 d-flex gap-3">
          <button className="next_btn" onClick={handleBack}>
            Back
          </button>
          <SubmitButton
            loading={loading}
            name="Save"
            className="save_btn ms-auto"
          />
          <button className="next_btn" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </form>
  );
};

export default WorkingTime;
