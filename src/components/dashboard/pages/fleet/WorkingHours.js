import React, { useEffect, useState } from "react";
import DaysAccordion from "../../../ui/DaysAccordion";
import axios from "./../../../../util/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import SubmitButton from "./../../../ui/form-elements/SubmitButton";
import { DAYS } from "../../../../constants";

const WorkingHours = ({ yacht }) => {
  const formDataInitial = DAYS.map((day, index) => {
    return {
      day,
      hours: [{ from: "00:00", to: "00:00" }],
      selected: false,
      index,
    };
  });
  const [formData, setFormData] = useState(formDataInitial);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const createdYacht = sessionStorage.getItem("yacht_id");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let url = yacht?.id
        ? `/yachts/${yacht?.id}/`
        : `/yachts/${createdYacht}/`;
      const filteredFormData = formData.filter((obj) => obj.selected === true);
      const reqData = filteredFormData.map((obj) => {
        return {
          day: obj.day,
          hours: obj.hours,
        };
      });
      const dictionary = { working_hours: reqData };
      const response = await axios.patch(url, dictionary);
      if (response.status === 200) {
        yacht
          ? toast.success("Working Hours Updated Successfully")
          : toast.success("Working Hours Saved Successfully");
        yacht
          ? navigate(`/dashboard/fleet/add-yacht/${yacht?.id}/pricing`)
          : navigate("/dashboard/fleet/add-yacht/pricing");
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
      const newWorkingHours = yacht?.working_hours?.map((e) => {
        return {
          ...e,
          selected: true,
          index: formData.findIndex((obj) => obj.day === e.day),
        };
      });
      let newFormData = [...formData];
      newWorkingHours?.forEach((e) => {
        newFormData[e.index].hours = e.hours;
        newFormData[e.index].selected = true;
      });
      setFormData(newFormData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [yacht]);

  return (
    <div className="fleet_form__wrapper">
      <div className="bg_white_card">
        <form className="form-ui" onSubmit={handleSubmit}>
          <div className="row m-0">
            <div className="col-12 p-2">
              <h6 className="form_title">Working Hours</h6>
            </div>
            <div className="col-12 p-2">
              <DaysAccordion formData={formData} setFormData={setFormData} />
            </div>
            <div className="col-12 p-2 pt-4 d-flex gap-3 ">
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
