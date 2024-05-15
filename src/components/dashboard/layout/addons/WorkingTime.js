import React, { useState } from "react";
import SubmitButton from "../../../ui/form-elements/SubmitButton";
import DaysAccordion from "../../../ui/DaysAccordion";
import axios from "./../../../../util/axios";
import { toast } from "react-toastify";

const WorkingTime = ({
  setForm,
  addon,
  formData,
  setFormData,
  isValid,
  setIsValid
}) => {
  const [loading, setLoading] = useState(false);
  const createdAddOn = sessionStorage.getItem("addon_id");

  const handleNext = (e) => {
    e.preventDefault();
    if (isValid) {
      setForm("Prices");
    }
  };
  const handleBack = (e) => {
    e.preventDefault();
    setForm("Main Info");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const filteredFormData = formData.working_hours.filter(
        (obj) => obj.selected === true
      );
      const reqData = filteredFormData.map((obj) => {
        return {
          day: obj.day,
          hours: obj.hours
        };
      });
      const dictionary = { working_hours: reqData };
      let url = addon?.id
        ? `/addons/${addon?.id}/`
        : `/addons/${createdAddOn}/`;
      const response = await axios.patch(url, dictionary);
      if (response.status === 200) {
        addon
          ? toast.success("Working Time Updated Successfully")
          : toast.success("Working Time Saved Successfully");
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

  const handleCheck = (e, index) => {
    const { checked } = e.target;
    setFormData((prev) => {
      let newWorkingHours = [...prev.working_hours];
      newWorkingHours[index].selected = checked;
      return {
        ...prev,
        working_hours: newWorkingHours
      };
    });
  };

  const handleTimeChange = (value, key, index, currentObject, day) => {
    currentObject.hours[index][key] = value;
    setFormData((prev) => {
      const currentIndex = prev.working_hours.findIndex(
        (obj) => obj.day === day
      );
      const newFormData = [...prev.working_hours];
      newFormData[currentIndex] = currentObject;
      return {
        ...prev,
        working_hours: newFormData
      };
    });
  };

  const handleAddNewHoursRow = (day, currentObject) => {
    if (currentObject.hours.length < 3) {
      const newObject = { ...currentObject };
      newObject.hours.push({ from: "00:00", to: "00:00" });
      setFormData((prev) => ({
        ...prev,
        working_hours: prev.working_hours.map((obj) => {
          if (obj.day === day) {
            return newObject;
          }
          return obj;
        })
      }));
    }
  };

  const handleDeleteCurrentHours = (index, currentObject, day) => {
    const newObject = { ...currentObject };
    newObject.hours.splice(index, 1);
    setFormData((prev) => ({
      ...prev,
      working_hours: prev.working_hours.map((obj) => {
        if (obj.day === day) {
          return newObject;
        }
        return obj;
      })
    }));
  };

  return (
    <form className="form-ui" onSubmit={handleSubmit}>
      <div className="row m-0">
        <div className="col-12 p-2">
          <h6 className="form_title">Working Time</h6>
        </div>
        <div className="col-12 p-2">
          <DaysAccordion
            handleCheck={handleCheck}
            workingHours={formData.working_hours}
            handleTimeChange={handleTimeChange}
            handleAddNewHoursRow={handleAddNewHoursRow}
            handleDeleteCurrentHours={handleDeleteCurrentHours}
          />
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
