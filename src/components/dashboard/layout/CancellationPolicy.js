import React from "react";
import add from "../../../assets/images/add.svg";
import trashIcon from "../../../assets/images/delete.svg";
import CustomInputField from "../../ui/form-elements/CustomInputField";

const CancellationPolicy = ({
  formData,
  setFormData,
  cancelationCountInitial
}) => {
  return (
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
                        updatedPolicies[index].cancel_before = +e.target.value;
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
                  <label htmlFor={"firstDaysRefund" + index}>Refund is</label>
                  <CustomInputField
                    type="number"
                    id={"firstDaysRefund" + index}
                    name="firstDaysRefund"
                    placeholder="00"
                    value={policy.percentage}
                    onChange={(e) => {
                      const updatedPolicies = [...formData.cancellation_policy];
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
                disabled={formData.cancellation_policy.length <= 1}
                onClick={() => {
                  const updatedPolicies = formData.cancellation_policy.filter(
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
      </div>
    </div>
  );
};

export default CancellationPolicy;
