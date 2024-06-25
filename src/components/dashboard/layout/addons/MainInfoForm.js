import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { handleUploadMedia } from "../../../../util/helpers";
import CustomFileUpload from "../../../ui/form-elements/CustomFileUpload";
import InputField from "../../../ui/form-elements/InputField";
import CommentField from "../../../ui/form-elements/CommentField";
import CustomSelectField from "../../../ui/form-elements/CustomSelectField";
import SubmitButton from "../../../ui/form-elements/SubmitButton";
import Vat from "../shared/Vat";
import fav from "../../../../assets/images/fav.png";
import { toast } from "react-toastify";
import axios from "../../../../util/axios";
import { ADD_ONS_CATEGORIES } from "../../../../constants";

const MainInfoForm = ({
  addon,
  setForm,
  formData,
  isValid,
  setIsValid,
  setFormData,
  hasParentYacht,
  setHasParentYacht
}) => {
  const user = useSelector((state) => state.user?.user);
  const subUser = user?.subuser_set?.filter(
    (u) => u.role === user.current_role
  )[0]?.id;

  const [yachts, setYachts] = useState([]);
  const [fileLoading, setFileLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`/yachts/?page_size=1000/&sub_user=${subUser}`)
      .then((res) => {
        setYachts(res?.data?.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [subUser]);

  const handleImagesChange = async (e, i) => {
    if (e?.length === 0) {
      setFormData((prev) => {
        const attachment = [...prev.attachment];
        attachment[i] = "";
        return {
          ...prev,
          attachment: attachment
        };
      });
      return;
    }
    if (fileLoading) {
      return;
    }
    try {
      const file = e[0].file;
      const link = await handleUploadMedia(file, setFileLoading, fileLoading);
      setFormData((prev) => {
        const attachment = [...prev.attachment];
        attachment[i] = link;
        return {
          ...prev,
          attachment: attachment
        };
      });
    } catch (error) {
      console.error("Error handling image upload:", error);
      toast.error("Error uploading image");
    } finally {
      setFileLoading(false);
    }
  };

  const handleVideoChange = async (e) => {
    if (e?.length === 0) {
      setFormData((prev) => ({
        ...prev,
        video_link: ""
      }));
      return;
    }
    if (fileLoading) {
      return;
    }
    try {
      const file = e[0].file;
      const link = await handleUploadMedia(file, setFileLoading, fileLoading);
      setFormData((prev) => ({
        ...prev,
        video_link: link
      }));
    } catch (error) {
      console.error("Error handling video upload:", error);
      setFileLoading(false);
      toast.error("Error uploading video");
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (isValid) {
      setForm("Working Time");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const updatedAttachments = formData.attachment.filter(
        (img) => img !== ""
      );
      const res = await axios.request({
        method: addon ? "PATCH" : "POST",
        url: `/addons/${addon ? `${addon.id}/` : ""}`,
        data: {
          sub_user: subUser,
          user: user.id,
          attachment: updatedAttachments,
          video_link: formData.video_link,
          name: formData.name,
          description: formData.description,
          category: formData.category,
          quantity: formData.quantity,
          vat: formData.vat,
          yacht: formData.yacht === "" ? null : formData.yacht
        }
      });
      if (res.status === 201 || res.status === 200) {
        addon
          ? toast.success("Addon Main Info Updated Successfully")
          : toast.success("Addon Main Info Saved Successfully");
        setForm("Working Time");
        sessionStorage.setItem("addon_id", res?.data?.id);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form-ui" onSubmit={handleSubmit}>
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
                  <CustomFileUpload
                    key={i}
                    allowMultiple={false}
                    pannelRatio=".88"
                    labelIdle={`${
                      i === 0 ? '<label class="mainImg">Main Image</label>' : ""
                    } <img src=${fav} alt="fav"/>`}
                    files={
                      formData.attachment[i] ? [formData.attachment[i]] : null
                    }
                    onUpdateFiles={(e) => handleImagesChange(e, i)}
                  />
                ))}
            </div>
          </div>
        </div>
        {/* video upload */}
        <div className="col-lg-6 col-12 p-2">
          <CustomFileUpload
            label="Upload Video"
            hint="( Max Size 20MB )"
            labelIdle="Drag & Drop your files or Browse"
            pannelRatio=".283"
            accept={["video/*"]}
            allowMultiple={false}
            onUpdateFiles={(e) => handleVideoChange(e)}
            files={formData.video_link ? [formData.video_link] : null}
          />
        </div>
        {/* addon name */}
        <div className="col-12 p-2">
          <InputField
            htmlFor="name"
            label="Addon Name"
            id="AddonName"
            placeholder="Write here"
            value={formData.name}
            formData={formData}
            setFormData={setFormData}
          />
        </div>
        {/* description */}
        <div className="col-12 p-2">
          <CommentField
            htmlFor="description"
            label="Description"
            id="description"
            placeholder="Write here"
            value={formData.description}
            formData={formData}
            setFormData={setFormData}
          />
        </div>
        {/* category */}
        <div className="col-lg-6 col-12 p-2">
          <CustomSelectField
            label="category"
            value={formData.category}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, category: e.target.value }))
            }
            options={ADD_ONS_CATEGORIES.map((e) => {
              let value;
              if (e === "Party Themes") {
                value = "party_themes";
              } else if (e === "Food & Beverages") {
                value = "f&b";
              } else if (e === "Expert Assistant") {
                value = "expert_assistant";
              } else {
                value = "other";
              }
              return {
                value,
                name: e
              };
            })}
          />
        </div>
        {/* quantity */}
        <div className="col-lg-6 col-12 p-2">
          <InputField
            type="number"
            htmlFor="quantity"
            label="Quantity"
            id="quantity"
            placeholder="00"
            value={formData.quantity}
            formData={formData}
            setFormData={setFormData}
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
          <CustomSelectField
            className={hasParentYacht ? "" : "disable"}
            id="yacht"
            value={formData.yacht}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, yacht: e.target.value }));
            }}
            options={yachts?.map((yacht) => ({
              name: yacht.name_en,
              value: yacht.id
            }))}
          />
        </div>
        {/* vat */}
        {!hasParentYacht && (
          <div className="col-12 p-2">
            <Vat />
          </div>
        )}
        <div className="col-12 p-2 pt-4 d-flex gap-3">
          <SubmitButton
            loading={loading}
            fileLoading={fileLoading}
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
