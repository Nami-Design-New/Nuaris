import React, { useState } from "react";
import SubmitButton from "../../../ui/form-elements/SubmitButton";
import axios from "axios";
import { toast } from "react-toastify";

const VesselStatusForm = () => {
  const [loading, setLoading] = useState(false);
  const yacht_id = sessionStorage.getItem("yacht_id");
  const [formData, setFormData] = useState({
    status: "inactive",
    inactivity_time_from: null,
    inactivity_time_to: null
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!yacht_id) {
      toast.error("create a yacht first");
      setLoading(false);
      return;
    }
    try {
      const response = await axios.patch(`/yachts/${yacht_id}/`, formData);
      if (response.status === 200) {
        toast.success("Vessel Status Updated Successfully");
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
    <div className="fleet_side_bar vessel_status mt-3 gap-0">
      <h6 className="mb-3">Vessel Statues </h6>
      <form action="" className="form-ui" onSubmit={handleSubmit}>
        <div className="input-field mb-3">
          <div className="checkboxs_inputs">
            <span className={`bg-active ${formData.status}`}></span>
            <label htmlFor="active">
              <input
                type="radio"
                name="status"
                id="active"
                checked={formData.status === "active"}
                onChange={() => {
                  setFormData({
                    ...formData,
                    status: "active"
                  });
                }}
              />
              <span>Active</span>
            </label>
            <label htmlFor="inactive">
              <input
                type="radio"
                name="status"
                id="inactive"
                checked={formData.status === "inactive"}
                onChange={() => {
                  setFormData({
                    ...formData,
                    status: "inactive"
                  });
                }}
              />
              <span>Inactive</span>
            </label>
            <label htmlFor="hidden">
              <input
                type="radio"
                name="status"
                id="hidden"
                checked={formData.status === "hidden"}
                onChange={() => {
                  setFormData({
                    ...formData,
                    status: "hidden"
                  });
                }}
              />
              <span>Hidden</span>
            </label>
          </div>
        </div>
        {formData.status === "inactive" && (
          <div className="period">
            <div className="input-field mb-2">
              <div className="input-field">
                <label htmlFor="From">From</label>
                <input
                  placeholder="24/12/2024"
                  type="date"
                  id="from"
                  name="from"
                  required
                  value={formData.inactivity_time_from}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      inactivity_time_from: e.target.value
                    });
                  }}
                />
              </div>
            </div>
            <div className="input-field mb-3">
              <div className="input-field">
                <label htmlFor="To">To</label>
                <input
                  placeholder="24/12/2024"
                  type="date"
                  id="to"
                  name="to"
                  required
                  value={formData.inactivity_time_to}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      inactivity_time_to: e.target.value
                    });
                  }}
                />
              </div>
            </div>
          </div>
        )}
        <SubmitButton name="Confirm" loading={loading} />
      </form>
    </div>
  );
};

export default VesselStatusForm;
