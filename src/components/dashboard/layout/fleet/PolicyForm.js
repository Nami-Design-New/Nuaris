import React, { useState } from "react";
import CommentField from "../../../ui/form-elements/CommentField";
import add from "../../../../assets/images/add.svg";
import trashIcon from "../../../../assets/images/delete.svg";
import CustomInputField from "../../../ui/form-elements/CustomInputField";
import { toast } from "react-toastify";
import axios from "./../../../../util/axios";
import { useNavigate } from "react-router-dom";
import SubmitButton from "../../../ui/form-elements/SubmitButton";
import InputWithUnit from "../../../ui/form-elements/InputWithUnit";

const PolicyForm = ({ setForm }) => {
  const createdYacht = sessionStorage.getItem("yacht_id");
  const cancelationCountInitial = {
    period: "",
    refund: "",
  };

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    weather_restrictions: "",
    rules_and_instructions: "",
    allowed_and_not_allowed_items: "",
    yacht: createdYacht,
    policy: Array(1)
      .fill(0)
      .map((_, i) => ({ ...cancelationCountInitial, index: i })),
  });

  const navigate = useNavigate();

  const handleBack = (e) => {
    e.preventDefault();
    setForm("Crew");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/policies/", formData);
      if (response.status === 201) {
        toast.success("Policies Saved Successfully");
        navigate("/dashboard/fleet/add-yacht/media-photos");
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
          <h6 className="form_title">Renting Policy & Cancelation Policy</h6>
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
                  setFormData((prev) => {
                    return {
                      ...prev,
                      policy: [
                        ...prev.policy,
                        {
                          ...cancelationCountInitial,
                          index: prev.policy.length,
                        },
                      ],
                    };
                  })
                }
              >
                <img src={add} alt="add" />
              </button>
            </div>
            {formData.policy.map((policy, index) => {
              return (
                <div key={index} className="col-12 p-0 pt-2 pb-2 policy_cancel">
                  <div className="policyRow">
                    <InputWithUnit
                      htmlFor="period"
                      label="if cancel before"
                      id="period"
                      units={["minutes", "hours", "days", "weeks", "months"]}
                      innerTarget="policy"
                      idx={index}
                      formData={formData}
                      setFormData={setFormData}
                    />
                    <div>
                      <label htmlFor={"firstDaysRefund" + index}>
                        Days refund is
                      </label>
                      <CustomInputField
                        type="number"
                        id={"firstDaysRefund" + index}
                        name="firstDaysRefund"
                        placeholder="00"
                        value={policy.refund}
                        onChange={(e) => {
                          setFormData((prevFormData) => ({
                            ...prevFormData,
                            policy:
                              prevFormData.policy.map(
                                (item, idx) => {
                                  if (idx === index) {
                                    return { ...item, refund: e.target.value };
                                  }
                                  return item;
                                }
                              ),
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
                      const updatedPolicies = formData.policy.filter(
                        (_, idx) => idx !== index
                      );
                      setFormData((prevFormData) => ({
                        ...prevFormData,
                        policy: updatedPolicies,
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
