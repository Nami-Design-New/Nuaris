import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import CheckboxInput from "../../../ui/form-elements/CheckboxInput";
import InputField from "../../../ui/form-elements/InputField";
import addRow from "../../../../assets/images/add.svg";
import ServiceCard from "./ServiceCard";

function AffiliateServicesForm({ setForm, affiliate }) {
  const [loading, setLoading] = useState(false);
  const [generateDiscount, setGenerateDiscount] = useState(false);
  const [applyOnAllServices, setApplyOnAllServices] = useState(false);
  const user = useSelector((state) => state.user?.user);
  const subUserSet = user?.subuser_set;
  const initialServiceData = {
    service: "",
    generate_special_discount: false,
    boat: "",
    discount_way: "",
    discount_value: null,
    discount_code: "",
    date_from: "",
    date_to: "",
  };
  const [formData, setFormData] = useState({
    type: "select",
    brand: "select",
    name: "",
    number: "",
    license_number: "",
    license_file: "",
    license_expire_date: "",
    preparation_time: "",
    service: [initialServiceData],
  });

  useEffect(() => {
    if (affiliate) {
      setFormData({
        type: affiliate?.type,
        brand: affiliate?.brand,
        name: affiliate?.name,
        number: affiliate?.number,
        license_number: affiliate?.license_number,
        license_file: affiliate?.license_file,
        license_expire_date: affiliate?.license_expire_date,
        preparation_time: affiliate?.preparation_time,
      });
    }
  }, [affiliate]);

  useEffect(() => {
    setFormData({
      service: affiliate?.services || [initialServiceData],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [affiliate]);

  const handleNext = (e) => {
    e.preventDefault();
    setForm("Services");
  };

  const handleBack = (e) => {
    e.preventDefault();
    setForm("Location");
  };

  function toggleGenerateDiscount() {
    setGenerateDiscount((d) => !d);
  }

  function toggleApplyOnAllServices() {
    setApplyOnAllServices((a) => !a);
  }

  const handleAddService = (e) => {
    e.preventDefault();
    setFormData((prev) => ({
      ...prev,
      service: [...prev.service, initialServiceData],
    }));
  };

  const handleDeleteService = (e, index) => {
    e.preventDefault();
    setFormData((prev) => ({
      ...prev,
      service: prev.service.filter((_, i) => i !== index),
    }));
  };

  const handleChange = (e, i) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      service: prev?.service?.map((member, index) => {
        if (index === i) {
          return { ...member, [name]: value };
        }
        return member;
      }),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const subUser = subUserSet?.filter((u) => u.role === user.current_role);
      if (!subUser) {
        throw new Error("No matching sub user found");
      }
      const data = {
        ...formData,
        sub_user: subUser[0]?.id,
        type: formData.type.toLowerCase(),
      };
      const response = await axios.request({
        url: affiliate?.id ? `/affiliates/${affiliate.id}/` : "/affiliates/",
        method: affiliate ? "PATCH" : "POST",
        data,
      });
      if (response.status === 201 || response.status === 200) {
        setForm("Location");
        affiliate
          ? toast.success("Main Info Updated Successfully")
          : toast.success("Main Info Saved Successfully");
        sessionStorage.setItem("affiliate_id", response?.data?.id);
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

  return (
    <form className="form-ui" onSubmit={handleSubmit}>
      <div className="row m-0">
        <div className="row m-0 col-12 p-2">
          {/* Generate Discount */}
          <div className="col-12 d-flex align-items-center">
            <CheckboxInput
              name="generate_discount_code"
              label="Generate Discount code"
              checked={generateDiscount}
              onChange={toggleGenerateDiscount}
            />
          </div>
          {/* Discount code */}
          <div className="row col-12 p-2 d-flex align-items-end">
            <div className="col-10">
              <InputField
                htmlFor="discount_code"
                label="Discount code"
                id="discountCode"
                placeholder="EX: mxxxx"
                value={formData.discount_code}
                formData={formData}
                setFormData={setFormData}
              />
            </div>
            <div className="col-2 h-54 d-flex align-items-center">
              <CheckboxInput
                name="apply_on_all_services"
                label="Apply on all services"
                checked={applyOnAllServices}
                onChange={toggleApplyOnAllServices}
              />
            </div>
          </div>
        </div>
        {/* Service Discount */}
        <div className="row m-0 col-12 p-2 service_discounst_box">
          <div className="m-0 col-12 p-2 d-flex align-items-center justify-content-between">
            <h6 className="m-0">Service discount</h6>
            <button
              disabled={formData.service?.length === 20}
              onClick={(e) => handleAddService(e)}
            >
              <img src={addRow} alt="add-row" />
            </button>
          </div>
          {formData?.service?.map((member, i) => (
            <ServiceCard
              key={i}
              index={i}
              service={formData.service}
              onDelete={handleDeleteService}
              onChange={handleChange}
              lenght={formData?.service?.length}
            />
          ))}
        </div>
        {/* Buttons */}
        <div className="d-flex justify-content-between row col-12 m-0 mt-4">
          <button className="back_btn" onClick={handleBack}>
            Back
          </button>
          <button className="submit_btn">Create affiliate link</button>
        </div>
      </div>
    </form>
  );
}

export default AffiliateServicesForm;
