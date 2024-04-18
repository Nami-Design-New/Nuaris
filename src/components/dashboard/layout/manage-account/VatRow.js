import React from "react";
import { Form } from "react-bootstrap";
import ReactFlagsSelect from "react-flags-select";
import deleteIcon from "../../../../assets/images/delete.svg";
import CustomInputField from "../../../ui/form-elements/CustomInputField";

const VatRow = ({ index, formData, setFormData, deleteVat }) => {
  const handleSelectCountry = (code) => {
    formData[index].country = code;
    setFormData([...formData]);
  };
  const handleInputChange = (e, name) => {
    formData[index][name] = e.target.value;
    setFormData([...formData]);
  };

  return (
    <div className="vat_row form-ui">
      <div className="row m-0">
        <div className="col-12 p-2">
          <div className="input-field">
            <label htmlFor="companyLocation" className="form_check_label">
              Country of the VAT Registration
              {index !== 0 && (
                <button onClick={deleteVat}>
                  <img src={deleteIcon} alt="delete" />
                </button>
              )}
            </label>
            <ReactFlagsSelect
              searchable={true}
              selectedSize={false}
              selected={formData[index]?.country}
              onSelect={handleSelectCountry}
            />
          </div>
        </div>
        {/* VAT Registration Number */}
        <div className="col-12 p-2">
          <label
            htmlFor={`registration_number_${index}`}
            className="form_check_label"
          >
            VAT Registration Number
            <Form.Check id={`registration_number_${index}`} type="switch" />
          </label>
          <CustomInputField
            placeholder="XXXX XXXX XXXX XXXX"
            name={`registration_number_${index}`}
            type="number"
            value={formData[index]?.registration_number}
            onChange={(e) => handleInputChange(e, "registration_number")}
            id={`registration_number_${index}`}
          />
        </div>
        {/* Vat Value */}
        <div className="col-12 p-2">
          <label htmlFor={`vat_value_${index}`} className="form_check_label">
            Vat Value
            <Form.Check id={`vat_value_${index}`} type="switch" />
          </label>
          <CustomInputField
            placeholder="00"
            value={formData[index]?.vat_value}
            onChange={(e) => handleInputChange(e, "vat_value")}
            name={`vat_value_${index}`}
            id={`vat_value_${index}`}
            type="number"
          />
        </div>
      </div>
    </div>
  );
};

export default VatRow;
