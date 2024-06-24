import React, { useEffect, useState } from "react";
import DaysAccordion from "../../../ui/DaysAccordion";
import axios from "./../../../../util/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { DAYS } from "../../../../constants";
import SubmitButton from "./../../../ui/form-elements/SubmitButton";

const WorkingHours = ({ yacht }) => {
  const navigate = useNavigate();
  const createdYacht = sessionStorage.getItem("yacht_id");

  const formDataInitial = DAYS.map((day, index) => ({
    day,
    index,
    selected: false,
    hours: [{ from: "00:00", to: "00:00" }]
  }));
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(formDataInitial);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = yacht?.id
        ? `/yachts/${yacht?.id}/`
        : `/yachts/${createdYacht}/`;
      const filteredFormData = formData.filter((obj) => obj.selected === true);
      const reqData = filteredFormData.map((obj) => ({
        day: obj.day,
        hours: obj.hours
      }));
      const dictionary = { working_hours: reqData };
      const response = await axios.patch(url, dictionary);
      if (response.status === 200) {
        toast.success(
          yacht
            ? "Working Hours Updated Successfully"
            : "Working Hours Saved Successfully"
        );
        navigate(
          yacht
            ? `/dashboard/fleet/add-yacht/${yacht?.id}/pricing`
            : "/dashboard/fleet/add-yacht/pricing"
        );
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

  useEffect(() => {
    if (yacht) {
      const newWorkingHours = yacht?.working_hours?.map((e) => ({
        ...e,
        selected: true,
        index: formData.findIndex((obj) => obj.day === e.day)
      }));
      const newFormData = [...formData];
      newWorkingHours?.forEach((e) => {
        if (e.index !== -1) {
          newFormData[e.index] = {
            ...newFormData[e.index],
            hours: e.hours,
            selected: true
          };
        }
      });
      setFormData(newFormData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [yacht]);

  const handleCheck = (e, index) => {
    const { checked } = e.target;
    setFormData((prev) => {
      const newFormData = [...prev];
      newFormData[index].selected = checked;
      return newFormData;
    });
  };

  const handleTimeChange = (value, key, index, currentObject, day) => {
    const updatedHours = [...currentObject.hours];
    updatedHours[index][key] = value;
    const updatedObject = { ...currentObject, hours: updatedHours };
    setFormData((prev) => {
      const currentIndex = prev.findIndex((obj) => obj.day === day);
      const newFormData = [...prev];
      newFormData[currentIndex] = updatedObject;
      return newFormData;
    });
  };

  const handleAddNewHoursRow = (day, currentObject) => {
    if (currentObject.hours.length < 3) {
      const newObject = { ...currentObject };
      newObject.hours.push({ from: "00:00", to: "00:00" });
      setFormData((prev) => {
        const currentIndex = prev.findIndex((obj) => obj.day === day);
        const newFormData = [...prev];
        newFormData[currentIndex] = newObject;
        return newFormData;
      });
    }
  };

  const handleDeleteCurrentHours = (index, currentObject, day) => {
    const newObject = { ...currentObject };
    newObject.hours.splice(index, 1);
    setFormData((prev) => {
      const currentIndex = prev.findIndex((obj) => obj.day === day);
      const newFormData = [...prev];
      newFormData[currentIndex] = newObject;
      return newFormData;
    });
  };

  return (
    <div className="fleet_form__wrapper">
      <div className="bg_white_card">
        <form className="form-ui" onSubmit={handleSubmit}>
          <div className="row m-0">
            <div className="col-12 p-2">
              <h6 className="form_title">Working Hours</h6>
            </div>
            <div className="col-12 p-2">
              <DaysAccordion
                handleCheck={handleCheck}
                workingHours={formData}
                handleTimeChange={handleTimeChange}
                handleAddNewHoursRow={handleAddNewHoursRow}
                handleDeleteCurrentHours={handleDeleteCurrentHours}
              />
            </div>
            <div className="col-12 p-2 pt-4 d-flex gap-3">
              <SubmitButton
                loading={loading}
                className="save_btn ms-auto"
                name="Save"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WorkingHours;
