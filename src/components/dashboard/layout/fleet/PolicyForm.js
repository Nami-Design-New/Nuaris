import React, { useState } from "react";
import axios from "./../../../../util/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import add from "../../../../assets/images/add.svg";
import trashIcon from "../../../../assets/images/delete.svg";
import CustomInputField from "../../../ui/form-elements/CustomInputField";
import SubmitButton from "../../../ui/form-elements/SubmitButton";

const PolicyForm = ({ setForm }) => {
  const [loading, setLoading] = useState(false);
  const createdYacht = sessionStorage.getItem("yacht_id");
  const navigate = useNavigate();

  const [weatherEditorState, setWeatherEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [rulesEditorState, setRulesEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [allowedItemsEditorState, setAllowedItemsEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const cancelationCountInitial = {
    cancel_before: "",
    percentage: "",
    type: "select"
  };
  const [formData, setFormData] = useState({
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
      const rawWeatherContent = convertToRaw(
        weatherEditorState.getCurrentContent()
      );
      const rawRulesContent = convertToRaw(
        rulesEditorState.getCurrentContent()
      );
      const rawAllowedItemsContent = convertToRaw(
        allowedItemsEditorState.getCurrentContent()
      );
      const response = await axios.patch(`/yachts/${createdYacht}/`, {
        policy: {
          ...formData,
          weather_restrictions: JSON.stringify(rawWeatherContent),
          rules_and_instructions: JSON.stringify(rawRulesContent),
          allowed_and_not_allowed_items: JSON.stringify(rawAllowedItemsContent)
        }
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
          <div className="input-field">
            <label>Weather Restriction</label>
            <Editor
              editorState={weatherEditorState}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={(newEditorState) =>
                setWeatherEditorState(newEditorState)
              }
            />
          </div>
        </div>
        <div className="col-12 p-2">
          <div className="input-field">
            <label>Rules and instructions</label>
            <Editor
              editorState={rulesEditorState}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={(newEditorState) =>
                setRulesEditorState(newEditorState)
              }
            />
          </div>
        </div>
        <div className="col-12 p-2">
          <div className="input-field">
            <label>Allowed and not allowed items on board</label>
            <Editor
              editorState={allowedItemsEditorState}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={(newEditorState) =>
                setAllowedItemsEditorState(newEditorState)
              }
            />
          </div>
        </div>
        <div className="col-12 p-2">
          <div className="input-field policy_form">
            <div className="header">
              <label>Cancelation Policy</label>
              <button
                type="button"
                onClick={() => {
                  if (formData.cancellation_policy.length < 5) {
                    setFormData((prev) => ({
                      ...prev,
                      cancellation_policy: [
                        ...prev.cancellation_policy,
                        { ...cancelationCountInitial }
                      ]
                    }));
                  }
                }}
                disabled={formData.cancellation_policy.length >= 5}
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
                        Refund is
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
