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

  // const fetchVatRate = async () => {
  //   try {
  //     const response = await fetch(
  //       `https://api.vatlookup.eu/rates/${formData[index]?.country}`
  //     );
  //     const data = await response.json();

  //     if (!response.ok) {
  //       throw new Error(data.error || "Failed to fetch VAT rate data.");
  //     }

  //     if (data.error) {
  //     } else if (data.standard_rate) {
  //     } else {
  //     }
  //   } catch (error) {}
  // };

  // useEffect(() => {
  //   fetchVatRate();
  //
  // }, [formData?.[index]?.country]);

  return (
    <div className="vat_row form-ui">
      <div className="row m-0">
        <div className="col-12 p-2 d-flex justify-content-end pt-0 pb-0">
          <Form.Check id={`vat_activation_${index}`} type="switch" />
        </div>
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
          </label>
          <CustomInputField
            placeholder="XXXX XXXX XXXX XXXX"
            name={`registration_number_${index}`}
            type="number"
            value={formData[index]?.number}
            onChange={(e) => handleInputChange(e, "number")}
            id={`registration_number_${index}`}
          />
        </div>
        {/* Vat Value */}
        <div className="col-12 p-2">
          <label htmlFor={`vat_value_${index}`} className="form_check_label">
            Vat Value
          </label>
          <CustomInputField
            placeholder="00"
            value={formData[index]?.value}
            onChange={(e) => handleInputChange(e, "value")}
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