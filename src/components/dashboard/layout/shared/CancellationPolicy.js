import React from "react";
import add from "../../../../assets/images/add.svg";
import trashIcon from "../../../../assets/images/delete.svg";
import CustomInputField from "../../../ui/form-elements/CustomInputField";

const CancellationPolicy = ({
  formData,
  setFormData,
  cancelationCountInitial
}) => {
  const handleAddPolicy = () => {
    if (formData?.cancellation_policy?.length < 5) {
      setFormData((prev) => ({
        ...prev,
        cancellation_policy: [
          ...prev.cancellation_policy,
          { ...cancelationCountInitial }
        ]
      }));
    }
  };

  const handlePolicyChange = (index, field, value) => {
    const updatedPolicies = [...formData.cancellation_policy];
    updatedPolicies[index][field] = value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      cancellation_policy: updatedPolicies
    }));
  };

  const handleRemovePolicy = (index) => {
    const updatedPolicies = formData.cancellation_policy.filter(
      (_, idx) => idx !== index
    );
    setFormData((prevFormData) => ({
      ...prevFormData,
      cancellation_policy: updatedPolicies
    }));
  };

  return (
    <div className="col-12 p-2">
      <div className="input-field policy_form">
        <div className="header">
          <label>Cancellation Policy</label>
          <button
            type="button"
            onClick={handleAddPolicy}
            disabled={formData?.cancellation_policy?.length >= 5}
          >
            <img src={add} alt="add" />
          </button>
        </div>
        {formData?.cancellation_policy?.map((policy, index) => (
          <div key={index} className="col-12 p-0 pt-2 pb-2 policy_cancel">
            {index === 0 ? (
              <div className="policyRow">
                <div className="input-field">
                  <label htmlFor={`cancel_before_${index}`}>
                    If cancel less than
                  </label>
                  <div className="time-units">
                    <input
                      type="number"
                      placeholder="00"
                      name={`cancel_before_${index}`}
                      id={`cancel_before_${index}`}
                      value={policy.cancel_before}
                      onChange={(e) =>
                        handlePolicyChange(
                          index,
                          "cancel_before",
                          +e.target.value
                        )
                      }
                    />
                    <select
                      className="units"
                      name={`units_${index}`}
                      id={`units_${index}`}
                      value={policy.type}
                      onChange={(e) =>
                        handlePolicyChange(index, "type", e.target.value)
                      }
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
                  <label htmlFor={`firstDaysRefund_${index}`}>Refund is</label>
                  <CustomInputField
                    type="number"
                    id={`firstDaysRefund_${index}`}
                    name="firstDaysRefund"
                    placeholder="00"
                    value={policy.percentage}
                    onChange={(e) =>
                      handlePolicyChange(
                        index,
                        "percentage",
                        Number(e.target.value)
                      )
                    }
                  />
                  <span>%</span>
                </div>
              </div>
            ) : (
              <div className="policyRow">
                <div className="input-field">
                  <label htmlFor={`cancel_before_${index}`}>
                    If cancel between
                  </label>
                  <div className="time-units">
                    <input
                      type="number"
                      placeholder="00"
                      name={`cancel_before_${index}`}
                      id={`cancel_before_${index}`}
                      value={policy.cancel_before}
                      onChange={(e) =>
                        handlePolicyChange(
                          index,
                          "cancel_before",
                          +e.target.value
                        )
                      }
                    />
                    <select
                      className="units"
                      name={`units_${index}`}
                      id={`units_${index}`}
                      value={policy.type}
                      onChange={(e) =>
                        handlePolicyChange(index, "type", e.target.value)
                      }
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
                <div className="input-field">
                  <label htmlFor={`cancel_before_end_${index}`}>And</label>
                  <div className="time-units">
                    <input
                      type="number"
                      placeholder="00"
                      name={`cancel_before_end_${index}`}
                      id={`cancel_before_end_${index}`}
                      value={policy.cancel_before_end}
                      onChange={(e) =>
                        handlePolicyChange(
                          index,
                          "cancel_before_end",
                          +e.target.value
                        )
                      }
                    />
                    <select
                      className="units"
                      name={`units_end_${index}`}
                      id={`units_end_${index}`}
                      value={policy.type_end}
                      onChange={(e) =>
                        handlePolicyChange(index, "type_end", e.target.value)
                      }
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
                  <label htmlFor={`firstDaysRefund_${index}`}>Refund is</label>
                  <CustomInputField
                    type="number"
                    id={`firstDaysRefund_${index}`}
                    name="firstDaysRefund"
                    placeholder="00"
                    value={policy.percentage}
                    onChange={(e) =>
                      handlePolicyChange(
                        index,
                        "percentage",
                        Number(e.target.value)
                      )
                    }
                  />
                  <span>%</span>
                </div>
              </div>
            )}
            <button
              className="trash_btn"
              type="button"
              disabled={formData?.cancellation_policy?.length <= 1}
              onClick={() => handleRemovePolicy(index)}
            >
              <img src={trashIcon} alt="trash" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CancellationPolicy;
