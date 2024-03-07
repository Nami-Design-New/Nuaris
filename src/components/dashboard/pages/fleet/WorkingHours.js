import React, { useState } from "react";
import DaysAccordion from "../../../ui/DaysAccordion";
import axios from "./../../../../util/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import SubmitButton from "./../../../ui/form-elements/SubmitButton";

const WorkingHours = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const createdYacht = sessionStorage.getItem("yacht_id");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.patch(`/yachts/${createdYacht}/`, formData);
      if (response.status === 200) {
        toast.success("Working Hours Saved Successfully");
        navigate("/dashboard/fleet/add-yacht/pricing");
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
    <div className="fleet_form__wrapper">
      <div className="bg_white_card">
        <form className="form-ui" onSubmit={handleSubmit}>
          <div className="row m-0">
            <div className="col-12 p-2">
              <h6 className="form_title">Working Hours</h6>
            </div>
            <div className="col-12 p-2">
              <DaysAccordion setFormData={setFormData} />
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
