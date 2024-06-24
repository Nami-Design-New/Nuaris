import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SubmitButton from "../../../ui/form-elements/SubmitButton";
import CommentField from "../../../ui/form-elements/CommentField";
import InputField from "../../../ui/form-elements/InputField";
import {
  CAMPAIGN_SCHEDULE,
  OPTIONS,
  SEND_OPTIONS,
} from "../../../../constants";
import CheckboxInputAsRadio from "../../../ui/form-elements/CheckboxInputAsRadio";
import SelectField from "../../../ui/form-elements/SelectField";
import CheckboxInput from "../../../ui/form-elements/CheckboxInput";
import RadioInput from "../../../ui/form-elements/RadioInput";

function NewCompigensForm({ compigens }) {
  const [formData, setFormData] = useState({
    type: "select",
    brand: "select",
    campaign_name: "",
    number: "",
    license_number: "",
    license_file: "",
    license_expire_date: "",
    preparation_time: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user?.user);
  const subUserSet = user?.subuser_set;
  const [checkedOptions, setCheckedOptions] = useState([]);
  const [useShortcut, setUseShortcut] = useState(false);
  const [schedule, setSchedule] = useState("");

  function handleScheduleChange(e) {
    setSchedule(e.target.value);
  }

  function handleCheckboxChange(e) {
    const value = e.target.value;
    setCheckedOptions((prev) => {
      if (prev.includes(value)) {
        return prev.filter((option) => option !== value);
      } else {
        return [...prev, value];
      }
    });
  }

  function toggleUseShortcut(e) {
    setUseShortcut((s) => !s);
  }

  useEffect(() => {
    if (compigens) {
      setFormData({
        type: compigens?.type,
        brand: compigens?.brand,
        campaign_name: compigens?.campaign_name,
        number: compigens?.number,
        license_number: compigens?.license_number,
        license_file: compigens?.license_file,
        license_expire_date: compigens?.license_expire_date,
        preparation_time: compigens?.preparation_time,
        description: compigens?.description,
      });
    }
  }, [compigens]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  };

  return (
    <form
      className="form-ui row d-flex flex-column gap-3"
      onSubmit={handleSubmit}
    >
      <div className="row m-0 bg_white_card">
        <div className="col-12 p-2">
          <h6 className="form_title">Marketing campaign</h6>
        </div>
        {/* Campaign name */}
        <div className="col-12 p-2">
          <InputField
            htmlFor="campaign_name"
            label="Campaign name"
            id="campaignName"
            placeholder="Write here"
            value={formData.campaign_name}
            formData={formData}
            setFormData={setFormData}
          />
        </div>
        <div className="row p-2">
          <h6 className="col-12">Send campaign via</h6>
          <div className="row col-12 d-flex row-gap-3  m-0">
            {SEND_OPTIONS.map((option) => (
              <CheckboxInputAsRadio
                key={option}
                name="send_option"
                option={option}
                checked={checkedOptions.includes(option)}
                onChange={handleCheckboxChange}
              />
            ))}
          </div>
        </div>
        {/* Description */}
        <div className="col-12 p-2">
          <CommentField
            htmlFor="description"
            label="Description"
            placeholder="Write here"
            id="description"
            formData={formData}
            setFormData={setFormData}
            value={formData.description}
          />
        </div>
        {/* Link Options */}
        <div className="row col-12 p-2 d-flex align-items-end">
          <div className="col-10">
            <SelectField
              htmlFor="type"
              label="Boat Type"
              id="boatType"
              value={formData.type}
              formData={formData}
              setFormData={setFormData}
              options={OPTIONS}
            />
          </div>
          <div className="col-2 h-54 d-flex align-items-center">
            <CheckboxInput
              name="shortcut"
              label="Use a shortcut"
              checked={useShortcut}
              onChange={toggleUseShortcut}
            />
          </div>
        </div>
      </div>
      {/* Campaign schedule */}
      <div className="row m-0 bg_white_card">
        <div className="col-12 p-2">
          <h6 className="form_title">Campaign schedule</h6>
        </div>
        <div className="row col-12 d-flex flex-column gap-3  m-0">
          {CAMPAIGN_SCHEDULE.map((option) => (
            <RadioInput
              key={option}
              name="campaign_schedule"
              option={option}
              checked={schedule === option}
              onChange={handleScheduleChange}
              size="full"
            />
          ))}
        </div>
        {schedule === "Set a time" && (
          <>
            {/* Campaign schedule Date */}
            <div className="col-lg-6 col-12 p-2">
              <InputField
                type="date"
                htmlFor="Date"
                label="Date"
                id="scheduleDate"
                formData={formData}
                setFormData={setFormData}
              />
            </div>
            {/* Campaign schedule Time */}
            <div className="col-lg-6 col-12 p-2">
              <InputField
                type="time"
                htmlFor="Time"
                label="Time"
                id="scheduleTime"
                formData={formData}
                setFormData={setFormData}
              />
            </div>
          </>
        )}
      </div>
      {/* Campaign budget */}
      <div className="row m-0 bg_white_card">
        <div className="col-12 p-2">
          <h6 className="form_title">Campaign budget</h6>
        </div>
        <div className="row col-12 d-flex gap-3 m-0">
          <div className="budget-box col-6">
            <p>The required balance</p>
            <h5 className="colored">2000</h5>
          </div>
          <div className="budget-box col-6">
            <p>Your current balance</p>
            <h5>1000</h5>
          </div>
        </div>
      </div>
      <div className="col-12 p-2 pt-4 d-flex gap-3">
        <SubmitButton
          loading={loading}
          name="Save & Publish"
          className="save_btn ms-auto"
        />
      </div>
    </form>
  );
}

export default NewCompigensForm;
