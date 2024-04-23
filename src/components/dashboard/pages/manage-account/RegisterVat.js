import React, { useState } from "react";
import VatRow from "../../layout/manage-account/VatRow";
import SubmitButton from "../../../ui/form-elements/SubmitButton";

const RegisterVat = () => {
  const initialVatData = {
    country: "SA",
    value: "",
    number: "",
  };
  const [formData, setFormData] = useState([initialVatData]);

  const handleAddVat = (e) => {
    e.preventDefault();
    setFormData([...formData, initialVatData]);
  };

  const handleDeleteVat = (index) => {
    setFormData(formData.filter((_, i) => i !== index));
  };

  return (
    <div className="bg_white_card">
      <form className="form-ui">
        <div className="row m-0">
          <div className="col-12 p-2">
            <button className="add_vat" onClick={handleAddVat}>
              Add More VAT
            </button>
          </div>
          {formData.map((_, index) => (
            <div className="col-12 p-2" key={index}>
              <VatRow
                index={index}
                formData={formData}
                setFormData={setFormData}
                deleteVat={() => handleDeleteVat(index)}
              />
            </div>
          ))}
          <div className="col-12 p-2">
            <SubmitButton name="Save" className="mt-2" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterVat;
