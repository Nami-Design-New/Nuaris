import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { uploadFile } from "react-s3";
import CustomFileUpload from "../../../ui/form-elements/CustomFileUpload";
import InputField from "../../../ui/form-elements/InputField";
import CommentField from "../../../ui/form-elements/CommentField";
import SelectField from "../../../ui/form-elements/SelectField";
import SubmitButton from "../../../ui/form-elements/SubmitButton";
import Vat from "../Vat";
import fav from "../../../../assets/images/fav.png";
import { toast } from "react-toastify";
import axios from "../../../../util/axios";
import { ADD_ONS_CATEGORIES, S3Config } from "../../../../constants";

const MainInfoForm = ({ setForm, addon }) => {
  const [yachts, setYachts] = useState([]);
  const [hasParentYacht, setHasParentYacht] = useState(false);
  const [fileLoading, setFileLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [videoLink, setVideoLink] = useState("");
  const [formData, setFormData] = useState({
    attachment: [],
    name: "",
    description: "",
    category: "select",
    quantity: "",
    yacht: "select",
    vat: null,
  });

  useEffect(() => {
    setFormData({
      ...formData,
      yacht: addon?.yacht || "select",
      category: addon?.category || "select",
      vat: addon?.vat || null,
      quantity: addon?.quantity || "",
      name: addon?.name || "",
      description: addon?.description || "",
      attachment: addon?.attachments || [],
    });
    if (addon?.yacht) {
      setHasParentYacht(true);
    }
  }, [addon]);

  useEffect(() => {
    console.log("formData useEffect", formData);
  }, [formData]);

  useEffect(() => {
    axios
      .get("/yachts/?page_size=1000")
      .then((res) => {
        setYachts(res?.data?.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleUploadMedia = async (file) => {
    setFileLoading(true);
    try {
      const blob = file.slice(0, file.size, file.type);
      const newFile = new File([blob], `${Date.now()}${file.name.slice(-3)}`, {
        type: file.type,
      });
      const data = await uploadFile(newFile, S3Config);
      return data.location;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    } finally {
      setFileLoading(false);
    }
  };

  const handleImagesChange = async (e, i) => {
    // TODO: remove the ! to make the logic work
    if (!formData.attachment[i]?.endsWidth(e[0].file.name)) {
      return;
    }
    try {
      console.log("uploading");
      if (!fileLoading) {
        const file = e[0].file;
        const link = await handleUploadMedia(file);
        setFormData((prev) => {
          const attachment = [...prev.attachment];
          attachment[i] = link;
          return {
            ...prev,
            attachment,
          };
        });
      }
    } catch (error) {
      console.error("Error handling image upload:", error);
      setFileLoading(false);
      toast.error("Error uploading image");
    }
  };

  const handleVideoChange = async (e) => {
    try {
      const file = e[0].file;
      const link = await handleUploadMedia(file);
      setVideoLink(link);
    } catch (error) {
      console.error("Error handling video upload:", error);
      setFileLoading(false);
      toast.error("Error uploading video");
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    setForm("Working Time");
  };

  const user = useSelector((state) => state.user?.user);
  const subUserSet = user?.subuser_set;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const subUser = subUserSet?.filter((u) => u.role === user.current_role);
      if (!subUser) {
        throw new Error("No matching sub user found");
      }
      const yachtId = yachts.find(
        (yacht) => yacht.name_en === formData.yacht
      )?.id;
      let categoryId;
      if (formData.category === "Party Themes") {
        categoryId = "party_themes";
      } else if (formData.category === "Food & Beverages") {
        categoryId = "f&b";
      } else if (formData.category === "Expert Assistant") {
        categoryId = "expert_assistant";
      } else {
        categoryId = "other";
      }
      const attached = formData.attachment.filter((a) => a !== "");
      if (videoLink) {
        attached.push(videoLink);
      }
      const res = await axios.request({
        method: addon.id ? "PATCH" : "POST",
        url: "/addons/",
        data: {
          ...formData,
          yacht: yachtId,
          category: categoryId,
          sub_user: subUser[0]?.id,
          user: user.id,
          attachment: attached,
        },
      });
      if (res.status === 201) {
        toast.success("Addon Main Info Saved Successfully");
        setForm("Working Time");
        sessionStorage.setItem("addon_id", res?.data?.id);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
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
                    labelIdle={`${
                      i === 0 ? '<label class="mainImg">Main Image</label>' : ""
                    } <img src=${fav} alt="fav"/>`}
                    pannelRatio=".88"
                    files={
                      formData.attachment[i] ? [formData.attachment[i]] : null
                    }
                    value
                    allowMultiple={false}
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
          <SelectField
            htmlFor="category"
            label="category"
            id="category"
            value={formData.category}
            formData={formData}
            setFormData={setFormData}
            options={ADD_ONS_CATEGORIES}
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
          <SelectField
            htmlFor="yacht"
            className={hasParentYacht ? "" : "disable"}
            id="yacht"
            value={formData.yacht}
            formData={formData}
            setFormData={setFormData}
            options={yachts?.map((yacht) => yacht.name_en)}
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
