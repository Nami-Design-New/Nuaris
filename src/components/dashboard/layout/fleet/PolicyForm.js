import React, { useEffect, useState } from "react";
import CommentField from "../../../ui/form-elements/CommentField";
import add from "../../../../assets/images/add.svg";
import trashIcon from "../../../../assets/images/delete.svg";
import CustomInputField from "../../../ui/form-elements/CustomInputField";
import CustomInputWithUnit from "../../../ui/form-elements/CustomInputWIthUnit";

const PolicyForm = ({ setForm }) => {
  const cancelationCountInitial = {
    value: "",
    unit: "days",
    refund: "",
  };
  const [formData, setFormData] = useState({
    weatherRestriction: "",
    rolesAndInstructions: "",
    allowedAndNotAllowed: "",
    cancelationPolicy: Array(2)
      .fill(0)
      .map((_, i) => ({ ...cancelationCountInitial, index: i })),
  });
  const handleBack = (e) => {
    e.preventDefault();
    setForm("Crew");
  };

  return (
    <div className="form-ui">
      <div className="row m-0">
        <div className="col-12 p-2">
          <h6 className="form_title">Renting Policy & Cancelation Policy</h6>
        </div>
        <div className="col-12 p-2">
          <CommentField
            htmlFor="weatherRestriction"
            label="Weather Restriction"
            placeholder="Write here"
            id="weatherRestriction"
            formData={formData}
            setFormData={setFormData}
          />
        </div>
        <div className="col-12 p-2">
          <CommentField
            htmlFor="rolesAndInstructions"
            label="Rules and instructions"
            placeholder="Write here"
            id="rolesAndInstructions"
            formData={formData}
            setFormData={setFormData}
          />
        </div>
        <div className="col-12 p-2">
          <CommentField
            htmlFor="allowedAndNotAllowed"
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
                      cancelationPolicy: [
                        ...prev.cancelationPolicy,
                        {
                          ...cancelationCountInitial,
                          index: prev.cancelationPolicy.length,
                        },
                      ],
                    };
                  })
                }
              >
                <img src={add} alt="add" />
              </button>
            </div>
            {formData.cancelationPolicy.map((policy, i) => {
              return (
                <>
                  <div key={i} className="col-12 p-2 policy_cancel">
                    <div>
                      <label>If cancel before</label>
                      <CustomInputWithUnit
                        placeholder="00"
                        name={"secondCancelBefore"}
                        units={["minutes", "hours", "days", "weeks", "months"]}
                        onChange={(e) => {
                          const newArr = [...formData.cancelationPolicy];
                          newArr[i].value = e.target.value;
                          setFormData((prev) => {
                            return {
                              ...prev,
                              cancelationPolicy: newArr,
                            };
                          });
                        }}
                        selectOnChange={(e) => {
                          const newArr = [...formData.cancelationPolicy];
                          newArr[i].unit = e.target.value;
                          setFormData((prev) => {
                            return {
                              ...prev,
                              cancelationPolicy: newArr,
                            };
                          });
                        }}
                        value={formData.cancelationPolicy[i].value}
                        selectValue={formData.cancelationPolicy[i].unit}
                      />
                    </div>
                    <div>
                      <label htmlFor="firstDaysRefund">Days refund is</label>
                      <CustomInputField
                        type="number"
                        name="firstDaysRefund"
                        placeholder="00"
                        value={formData.cancelationPolicy[i].refund}
                        onChange={() => {}}
                      />
                      <span>%</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        let copyArr = [...formData.cancelationPolicy];
                        copyArr = copyArr.filter((e) => e.index !== i);
                        const final = copyArr.map((e, index) => ({
                          ...e,
                          index,
                        }));
                        setFormData((prev) => {
                          return {
                            ...prev,
                            cancelationPolicy: final,
                          };
                        });
                      }}
                    >
                      <img src={trashIcon} alt="trash" width={20} height={24} />
                    </button>
                  </div>
                </>
              );
            })}
            <div className="col-12 p-2 pt-4 d-flex gap-3 ">
              <button className="next_btn" onClick={handleBack}>
                Back
              </button>
              <button className="save_btn ms-auto">Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyForm;
