import { useState } from "react";
import { Form } from "react-bootstrap";
import { handleChange } from "../../../../utils/helper";
import { PAGE_SIZE } from "../../../../utils/contants";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../../../utils/axiosInstance";
import fav from "../../../../assets/images/fav.png";
import SubmitButton from "./../../../../ui/form-elements/SubmitButton";
import InputField from "./../../../../ui/form-elements/InputField";
import TextField from "../../../../ui/form-elements/TextField";
import SelectField from "./../../../../ui/form-elements/SelectField";
import Vat from "../../../../ui/Vat";
import MediaUploadField from "./../../../../ui/form-elements/MediaUploadField";
import useGetYachts from "./../../../../hooks/useGetYachts";

export default function MainInfoForm({
  formData,
  setFormData,
  isValid,
  setIsValid,
  setForm
}) {
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const [hasParentYacht, setHasParentYacht] = useState(false);
  const { data: yachts } = useGetYachts(PAGE_SIZE);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.post("/addons/", {
        name: formData.name,
        description: formData.description,
        category: formData.category,
        quantity: formData.quantity
      });
      if (res.status === 200 || res.status === 201) {
        queryClient.invalidateQueries(["addons"]);
        toast.success("Addon created successfully");
        setIsValid(true);
        setForm("Working Time");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
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

  return (
    <form className="form_ui" onSubmit={handleSubmit}>
      <div className="row m-0">
        <div className="col-12 p-2">
          <h6 className="form_title">Main Info</h6>
        </div>
        {/* photo upload */}
        <div className="col-lg-6 col-12 p-2">
          <div className="input-field">
            <label htmlFor="photos">
              Upload Photos <span>( Maximum 3 Pictures )</span>
            </label>
            <div className="photos">
              {Array(3)
                .fill(0)
                .map((_, i) => (
                  <MediaUploadField
                    key={i}
                    allowMultiple={false}
                    pannelRatio=".88"
                    labelIdle={`${
                      i === 0 ? '<label class="mainImg">Main Image</label>' : ""
                    } <img src=${fav} alt="fav"/>`}
                    files={
                      formData.attachment[i] ? [formData.attachment[i]] : null
                    }
                  />
                ))}
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-12 p-2">
          <MediaUploadField
            label="Upload Video"
            hint="( Max Size 20MB )"
            labelIdle="Drag & Drop your files or Browse"
            pannelRatio=".283"
            accept={["video/*"]}
            allowMultiple={false}
            files={formData.video_link ? [formData.video_link] : null}
          />
        </div>
        <div className="col-12 p-2">
          <InputField
            required
            type="text"
            id="name"
            name="name"
            label="Addon Name"
            value={formData.name}
            placeholder="write here"
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
        <div className="col-lg-6 col-12 p-2">
          <SelectField
            required
            id="category"
            name="category"
            label="category"
            value={formData.category}
            onChange={(e) => handleChange(e, setFormData)}
            options={[
              {
                value: "party_themes",
                name: "Party Themes"
              },
              {
                value: "f&b",
                name: "Food & Beverages"
              },
              {
                value: "expert_assistant",
                name: "Expert Assistant"
              },
              {
                value: "other",
                name: "Other"
              }
            ]}
          />
        </div>
        <div className="col-lg-6 col-12 p-2">
          <InputField
            label="Quantity"
            id="quantity"
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
              onChange={() => setHasParentYacht(!hasParentYacht)}
            />
          </label>
          <SelectField
            id="yacht"
            name="yacht"
            className={hasParentYacht ? "" : "disable"}
            value={formData.yacht}
            onChange={(e) => handleChange(e, setFormData)}
            options={yachts?.data?.map((yacht) => ({
              name: yacht.name_en,
              value: yacht.id
            }))}
          />
        </div>
        {!hasParentYacht && (
          <div className="col-12 p-2">
            <Vat />
          </div>
        )}
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
