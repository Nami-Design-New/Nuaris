import React, { useState } from "react";
import VatRow from "../../layout/manage-account/VatRow";
import SubmitButton from "../../../ui/form-elements/SubmitButton";
import { toast } from "react-toastify";
import axios from "./../../../../util/axios";
import { useSelector } from "react-redux";

const RegisterVat = () => {
  const user = useSelector((state) => state.user?.user);
  const subUser = user?.subuser_set?.filter(
    (u) => u.role === user.current_role
  )[0]?.id;

  const initialVatData = {
    country: "SA",
    number: "",
    sub_user: subUser
  };
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState([initialVatData]);

  const handleAddVat = (e) => {
    e.preventDefault();
    setFormData([...formData, initialVatData]);
  };

  const handleDeleteVat = (index) => {
    setFormData(formData.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      axios.post("/vats/bulk-create/", formData);
      toast.success("VAT Created Successfully");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg_white_card">
      <form onSubmit={handleSubmit} className="form-ui">
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
            <SubmitButton name="Save" loading={loading} className="mt-2" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterVat;
