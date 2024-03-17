import React, { useState } from "react";
import CommentField from "../../../ui/form-elements/CommentField";
import add from "../../../../assets/images/add.svg";
import trashIcon from "../../../../assets/images/delete.svg";
import CustomInputField from "../../../ui/form-elements/CustomInputField";
import { toast } from "react-toastify";
import axios from "./../../../../util/axios";
import { useNavigate } from "react-router-dom";
import SubmitButton from "../../../ui/form-elements/SubmitButton";

const PolicyForm = ({ setForm }) => {
  const [loading, setLoading] = useState(false);
  const createdYacht = sessionStorage.getItem("yacht_id");
  const navigate = useNavigate();

  const cancelationCountInitial = {
    cancel_before: "",
    percentage: "",
    type: "select"
  };
  const [formData, setFormData] = useState({
    weather_restrictions: "",
    rules_and_instructions: "",
    allowed_and_not_allowed_items: "",
    cancellation_policy: [cancelationCountInitial]
  });

  const handleBack = (e) => {
    e.preventDefault();
    setForm("Crew");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.patch(`/yachts/${createdYacht}/`, {
        policy: formData
      });
      if (response) {
        toast.success("Policies Saved Successfully");
        navigate("/dashboard/fleet/add-yacht/media-photos");
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
          <h6 className="form_title">Renting Policy & Cancellation Policy</h6>
        </div>
        <div className="col-12 p-2">
          <CommentField
            htmlFor="weather_restrictions"
            label="Weather Restriction"
            placeholder="Write here"
            id="weatherRestriction"
            formData={formData}
            setFormData={setFormData}
          />
        </div>
        <div className="col-12 p-2">
          <CommentField
            htmlFor="rules_and_instructions"
            label="Rules and instructions"
            placeholder="Write here"
            id="rolesAndInstructions"
            formData={formData}
            setFormData={setFormData}
          />
        </div>
        <div className="col-12 p-2">
          <CommentField
            htmlFor="allowed_and_not_allowed_items"
            label="Allowed and not allowed items on board"
            placeholder="Write here"
            id="allowedAndNotAllowed"
            formData={formData}
            setFormData={setFormData}
          />
        </div>
        <div className="col-12 p-2">
          <div className="input-field policy_form">
            <div className="header">
              <label>Cancelation Policy</label>
              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    cancellation_policy: [
                      ...prev.cancellation_policy,
                      { ...cancelationCountInitial }
                    ]
                  }))
                }
              >
                <img src={add} alt="add" />
              </button>
            </div>
            {formData.cancellation_policy.map((policy, index) => {
              return (
                <div key={index} className="col-12 p-0 pt-2 pb-2 policy_cancel">
                  <div className="policyRow">
                    <div className="input-field">
                      <label htmlFor="cancel_before">If cancel before</label>
                      <div className="time-units">
                        <input
                          type="number"
                          placeholder="00"
                          name="cancel_before"
                          id="cancel_before"
                          value={policy.cancel_before}
                          onChange={(e) => {
                            const updatedPolicies = [
                              ...formData.cancellation_policy
                            ];
                            updatedPolicies[index].cancel_before =
                              +e.target.value;
                            setFormData((prevFormData) => ({
                              ...prevFormData,
                              cancellation_policy: updatedPolicies
                            }));
                          }}
                        />
                        <select
                          className="units"
                          name="units"
                          id="units"
                          value={policy.type}
                          onChange={(e) => {
                            const updatedPolicies = [
                              ...formData.cancellation_policy
                            ];
                            updatedPolicies[index].type = e.target.value;
                            setFormData((prevFormData) => ({
                              ...prevFormData,
                              cancellation_policy: updatedPolicies
                            }));
                          }}
                        >
                          {["minutes", "hours", "days", "weeks", "months"].map(
                            (unit, idx) => (
                              <option key={idx} value={unit}>
                                {unit}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label htmlFor={"firstDaysRefund" + index}>
                        Days refund is
                      </label>
                      <CustomInputField
                        type="number"
                        id={"firstDaysRefund" + index}
                        name="firstDaysRefund"
                        placeholder="00"
                        value={policy.percentage}
                        onChange={(e) => {
                          const updatedPolicies = [
                            ...formData.cancellation_policy
                          ];
                          updatedPolicies[index].percentage = Number(
                            e.target.value
                          );
                          setFormData((prevFormData) => ({
                            ...prevFormData,
                            cancellation_policy: updatedPolicies
                          }));
                        }}
                      />
                      <span>%</span>
                    </div>
                  </div>
                  <button
                    className="trash_btn"
                    type="button"
                    onClick={() => {
                      const updatedPolicies =
                        formData.cancellation_policy.filter(
                          (_, idx) => idx !== index
                        );
                      setFormData((prevFormData) => ({
                        ...prevFormData,
                        cancellation_policy: updatedPolicies
                      }));
                    }}
                  >
                    <img src={trashIcon} alt="trash" />
                  </button>
                </div>
              );
            })}
            <div className="col-12 p-2 pt-4 d-flex gap-3 ">
              <button className="next_btn" onClick={handleBack}>
                Back
              </button>
              <SubmitButton
                className="save_btn ms-auto"
                loading={loading}
                name="Save"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PolicyForm;
