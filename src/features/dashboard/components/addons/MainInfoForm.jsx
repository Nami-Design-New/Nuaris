import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { filterEmptyKeys, handleChange } from "../../../../utils/helper";
import { ADDONS_CATEGORIES, PAGE_SIZE } from "../../../../utils/constants";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import axiosInstance from "../../../../utils/axiosInstance";
import SubmitButton from "./../../../../ui/form-elements/SubmitButton";
import InputField from "./../../../../ui/form-elements/InputField";
import TextField from "../../../../ui/form-elements/TextField";
import SelectField from "./../../../../ui/form-elements/SelectField";
import useGetYachts from "./../../../../hooks/yacht/useGetYachts";
import useGetAddons from "../../../../hooks/addons/useGetAddons";

export default function MainInfoForm({
  id,
  formData,
  setFormData,
  isValid,
  setIsValid,
  setForm,
  createdAddonId,
}) {
  const [loading, setLoading] = useState(false);
  const [hasParentYacht, setHasParentYacht] = useState(false);
  const [, setSearchParams] = useSearchParams();

  const queryClient = useQueryClient();
  const { refetch } = useGetAddons();
  const { data: yachts } = useGetYachts(PAGE_SIZE);

  useEffect(() => {
    setHasParentYacht(!!formData?.yacht_id);
  }, [formData.yacht_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const requestBody = filterEmptyKeys({
      step_id: 1,
      name: formData.name,
      description: formData.description,
      category: formData.category,
      quantity: formData.quantity,
      renewable: formData.renewable,
      yacht_id: hasParentYacht ? formData.yacht_id : null,
    });

    if (id || createdAddonId) {
      requestBody.addon_id = id || createdAddonId;
    }

    try {
      const res = await axiosInstance.post("/addon/create_addon", requestBody);
      if (res.status === 200 || res.status === 201) {
        refetch();
        queryClient.invalidateQueries({
          queryKey: ["addon", createdAddonId || id],
        });

        toast.success("Main info saved successfully");
        setIsValid(true);
        setForm("Media");
        setSearchParams({ addon_id: res.data.id });
      }
    } catch (error) {
      console.error("Error creating addon:", error);
      toast.error("Failed to save main info");
    } finally {
      setLoading(false);
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (isValid) {
      setForm("Working Time");
    }
  };

  const toggleParentYacht = (checked) => {
    setHasParentYacht(checked);
    setFormData({
      ...formData,
      yacht_id: checked ? formData.yacht_id : "",
    });
  };

  return (
    <form className="form_ui" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-12 p-2">
          <h6 className="form_title">Main Info</h6>
        </div>
        <div className="col-12 p-2">
          <InputField
            required
            type="text"
            id="name"
            name="name"
            label="Addon Name"
            value={formData.name}
            placeholder="Write here"
            onChange={(e) => handleChange(e, setFormData)}
          />
        </div>
        <div className="col-12 p-2">
          <TextField
            required
            id="description"
            name="description"
            label="Description"
            placeholder="Write here"
            value={formData.description}
            onChange={(e) => handleChange(e, setFormData)}
          />
        </div>
        <div className="col-12 p-2">
          <label htmlFor="parent_yacht" className="parent_yacht_label">
            Is quantity renewable?
            <Form.Check
              name="parent_yacht"
              id="parent_yacht"
              type="switch"
              checked={formData?.renewable}
              onChange={(e) =>
                setFormData({ ...formData, renewable: e.target.checked })
              }
            />
          </label>
        </div>
        <div className="col-lg-6 col-12 p-2">
          <SelectField
            required
            id="category"
            name="category"
            label="Category"
            value={formData.category}
            onChange={(e) => handleChange(e, setFormData)}
            options={ADDONS_CATEGORIES}
          />
        </div>
        <div className="col-lg-6 col-12 p-2">
          <InputField
            label="Quantity"
            id="quantity"
            required
            name="quantity"
            type="number"
            placeholder="00"
            value={formData.quantity}
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
            id="yacht_id"
            name="yacht_id"
            className={!hasParentYacht ? "disable" : ""}
            value={formData.yacht_id}
            onChange={(e) => handleChange(e, setFormData)}
            options={yachts?.data?.map((yacht) => ({
              name: yacht.name_en,
              value: yacht.id,
            }))}
            disabled={!hasParentYacht}
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
}
