import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { filterEmptyKeys, handleChange } from "../../../../utils/helper";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../../../utils/constants";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import useGetYachts from "./../../../../hooks/yacht/useGetYachts";
import InputField from "../../../../ui/form-elements/InputField";
import SelectField from "../../../../ui/form-elements/SelectField";
import TextField from "../../../../ui/form-elements/TextField";
import SubmitButton from "../../../../ui/form-elements/SubmitButton";
import WhatIncluded from "./WhatIncluded";
import axiosInstance from "../../../../utils/axiosInstance";

const MainInfoForm = ({
  id,
  formData,
  setFormData,
  setForm,
  isValid,
  setIsValid,
  whatIsIncludedInitial,
  createdActivityId,
  hasParent,
}) => {
  const [loading, setLoading] = useState(false);
  const [hasParentYacht, setHasParentYacht] = useState(hasParent);
  const [, setSearchParams] = useSearchParams();

  const queryClient = useQueryClient();
  const { data: yachts } = useGetYachts(PAGE_SIZE);

  useEffect(() => {
    setHasParentYacht(!!formData?.yacht_id);
  }, [formData.yacht_id]);

  const handleNext = (e) => {
    e.preventDefault();
    if (isValid) {
      setForm("Location");
    }
  };

  const toggleParentYacht = (checked) => {
    setHasParentYacht(checked);
    setFormData({
      ...formData,
      yacht_id: checked ? formData.yacht_id : "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = filterEmptyKeys({
      step_id: 1,
      name: formData.name,
      category: formData.category,
      description: formData.description,
      capacity: formData.capacity,
      quantity: formData.quantity,
      including: formData.including,
      restrictions: formData.restrictions,
      yacht_id: formData.yacht_id,
      min_seats_per_booking: formData.min_seats_per_booking,
    });

    if (id || createdActivityId) {
      payload.activity_id = id || createdActivityId;
    }
    try {
      const response = await axiosInstance.post(
        "/activity/create_activity",
        payload
      );
      if (response.status === 200 || response.status === 201) {
        toast.success("Activity Main Info Saved Successfully");
        setForm("Media");
        setIsValid(true);
        setSearchParams({
          activity_id: response.data.id,
        });
        queryClient.invalidateQueries({ queryKey: ["activities"] });
        queryClient.invalidateQueries({
          queryKey: ["activity", createdActivityId || id],
        });
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form_ui" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-12 p-2">
          <h6 className="form_title">Package Info</h6>
        </div>
        {/* package name */}
        <div className="col-lg-6 col-12 p-2">
          <InputField
            required
            label="Activity Name"
            placeholder="Write here"
            name="name"
            id="name"
            value={formData.name}
            onChange={(e) => handleChange(e, setFormData)}
          />
        </div>
        {/* category */}
        <div className="col-lg-6 col-12 p-2">
          <SelectField
            label="Catagory"
            name="category"
            id="category"
            required
            value={formData.category}
            onChange={(e) => handleChange(e, setFormData)}
            options={[
              {
                name: "Water activities",
                value: "water",
              },
              {
                name: "Shore activities",
                value: "shore",
              },
            ]}
          />
        </div>
        {/* description */}
        <div className="col-12 p-2">
          <TextField
            label="Description"
            id="description"
            name="description"
            placeholder="Write here"
            value={formData.description}
            onChange={(e) => handleChange(e, setFormData)}
          />
        </div>
        {/* capacity */}
        <div className="col-lg-4 col-12 p-2">
          <InputField
            label="Capacity"
            value={formData.capacity}
            placeholder="00"
            type="number"
            name="capacity"
            required
            id="capacity"
            onChange={(e) => handleChange(e, setFormData)}
          />
        </div>
        <div className="col-lg-4 col-12 p-2">
          <InputField
            label="Minimum Capacity"
            value={formData.min_seats_per_booking}
            placeholder="00"
            min="1"
            required
            max={formData.min_seats_per_booking}
            type="number"
            name="min_seats_per_booking"
            id="min_seats_per_booking"
            onChange={(e) => handleChange(e, setFormData)}
          />
        </div>
        {/* quantity */}
        <div className="col-lg-4 col-12 p-2">
          <InputField
            label="Quantity"
            value={formData.quantity}
            placeholder="00"
            type="number"
            name="quantity"
            required
            id="quantity"
            onChange={(e) => handleChange(e, setFormData)}
          />
        </div>
        {/* whats included */}
        <div className="col-12 p-2">
          <WhatIncluded
            whatIsIncludedInitial={whatIsIncludedInitial}
            formData={formData}
            setFormData={setFormData}
          />
        </div>
        {/* Need to know & restrictions about activity */}
        <div className="col-12 p-2">
          <TextField
            label="Need to know & restrictions about activity"
            id="restrictions"
            name="restrictions"
            placeholder="Write here"
            value={formData?.restrictions}
            onChange={(e) => handleChange(e, setFormData)}
          />
        </div>
        <div className="col-12 p-2">
          <label htmlFor="parent_yacht" className="parent_yacht_label">
            Parent Yacht
            <Form.Check
              name="parent_yacht"
              id="parent_yacht"
              type="switch"
              checked={hasParentYacht}
              onChange={(e) => toggleParentYacht(e.target.checked)}
            />
          </label>
          <SelectField
            className={hasParentYacht ? "" : "disable"}
            id="yacht_id"
            value={formData?.yacht_id}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, yacht_id: e.target.value }));
            }}
            options={yachts?.data?.map((yacht) => ({
              name: yacht?.name_en,
              value: yacht?.id,
            }))}
          />
        </div>

        <div className="col-12 p-2 pt-4 d-flex gap-3">
          <SubmitButton
            loading={loading}
            name="Save"
            className="save_btn ms-auto"
          />
          <button className="next_btn" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </form>
  );
};

export default MainInfoForm;
