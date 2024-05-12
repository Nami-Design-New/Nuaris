import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import PriceRow from "./PriceRow";
import axios from "./../../../../util/axios";
import addIcon from "../../../../assets/images/add.svg";
import SubmitButton from "../../../ui/form-elements/SubmitButton";

const Prices = ({ setForm, addon }) => {
  const createdAddOn = sessionStorage.getItem("addon_id");
  const navigate = useNavigate();
  const initialData = {
    price: "",
    price_type: "",
    min_price: ""
  };
  const [formData, setFormData] = useState([initialData]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (addon && Object.keys(addon?.season_price).length > 0) {
      setFormData([
        {
          price: addon?.price || "",
          price_type: addon?.price_type || "",
          min_price: addon?.min_price || ""
        }
      ]);
    }
  }, [addon]);

  const handleBack = (e) => {
    e.preventDefault();
    setForm("Working Time");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let url = addon?.id
        ? `/addons/${addon?.id}/`
        : `/addons/${createdAddOn}/`;
      const response = await axios.patch(url, {
        ...formData[0],
        price_type: formData[0].price_type.toLocaleLowerCase()
      });
      if (response.status === 200) {
        addon
          ? toast.success("Prices Updated Successfully")
          : toast.success("Prices Saved Successfully");
        navigate("/dashboard/addons");
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

  const handleAddPriceRow = (e) => {
    e.preventDefault();
    if (formData.length < 6) {
      setFormData([...formData, initialData]);
    }
  };

  const handleChange = (index, field, value) => {
    const updatedFormData = [...formData];
    if (field === "price_type") {
      updatedFormData.forEach((data, i) => {
        if (i !== index && data.price_type === value) {
          updatedFormData[i] = { ...data, price_type: "" };
        }
      });
    }
    updatedFormData[index] = { ...updatedFormData[index], [field]: value };
    setFormData(updatedFormData);
  };

  const handleDeleteRow = (indexToDelete) => {
    setFormData(formData.filter((_, index) => index !== indexToDelete));
  };

  return (
    <form className="form-ui" onSubmit={handleSubmit}>
      <div className="row m-0">
        <div className="col-12 p-2 d-flex align-items-center justify-content-between">
          <h6 className="form_title mb-0">Prices</h6>
          <button onClick={handleAddPriceRow} type="button">
            <img src={addIcon} alt="addIcon" />
          </button>
        </div>
        {formData.map((data, index) => (
          <PriceRow
            key={index}
            index={index}
            formData={data}
            length={formData.length}
            handleChange={handleChange}
            options={["30 M", "1 H", "2 H", "3 H", "Trip", "Item"].filter(
              (option) =>
                !formData.some(
                  (row) => row.price_type === option && row !== data
                )
            )}
            onDelete={handleDeleteRow}
          />
        ))}
        <div className="col-12 p-2 pt-4 d-flex gap-3">
          <button className="next_btn" onClick={handleBack}>
            Back
          </button>
          <SubmitButton
            loading={loading}
            name="Save"
            className="save_btn ms-auto"
          />
        </div>
      </div>
    </form>
  );
};

export default Prices;
