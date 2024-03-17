import React, { useState } from "react";
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
import { ADD_ONS_CATEGORIES } from "../../../../constants";

const MainInfoForm = ({ setForm }) => {
  const { yachts } = useSelector((state) => state.yachts);
  const [currentUploading, setCurrentUploading] = useState([]);
  const [hasParentYacht, setHasParentYacht] = useState(false);
  const [loading, setLoading] = useState(false);
  const [videoLink, setVideoLink] = useState("");
  const [formData, setFormData] = useState({
    attachments: [],
    name: "",
    description: "",
    category: "",
    quantity: "",
    yacht: "select",
    vat: null
  });

  const config = {
    bucketName: "nuaris",
    region: "us-east-1",
    accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_s3_SECRET_ACCESS_KEY
  };

  async function handleUploadMedia(e) {
    const file = e[0].file;
    var blob = file.slice(0, file.size, file.type);
    const newFile = new File([blob], `${Date.now()}${file.name.slice(-5)}`, {
      type: file.type
    });
    return await uploadFile(newFile, config)
      .then((data) => {
        return data.location;
      })
      .catch((err) => console.error(err));
  }

  function handelImagesChange(e, i) {
    if (e.length >= 1) {
      const id = e[0].id;
      if (!currentUploading.includes(id)) {
        setCurrentUploading(currentUploading.push(id));
        handleUploadMedia(e)
          .then((link) => {
            setFormData((prev) => {
              const attachments = [...prev.attachments];
              attachments[i] = link;
              return {
                ...prev,
                attachments
              };
            });
          })
          .finally(() => {
            setCurrentUploading(currentUploading.filter((e) => e !== id));
          });
      }
    } else {
      setCurrentUploading(
        currentUploading.filter((e) => e !== formData.attachments[i])
      );
      setFormData((prev) => ({
        ...prev,
        attachments: prev.attachments.map((e, idx) => (idx === i ? "" : e))
      }));
    }
  }

  function handleVideoChange(e) {
    if (e.length >= 1) {
      const id = e[0].id;
      if (!currentUploading.includes(id)) {
        setCurrentUploading((prev) => [...prev, id]);
        handleUploadMedia(e)
          .then((link) => {
            setVideoLink(link);
          })
          .finally(() => {
            setCurrentUploading((prev) =>
              prev.filter((fileId) => fileId !== id)
            );
          });
      }
    } else {
      setCurrentUploading(
        currentUploading.filter((fileId) => fileId !== videoLink)
      );
      setVideoLink("");
    }
  }

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
      console.log(yachtId);
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
      const res = await axios.post("/addons/", {
        ...formData,
        yacht: yachtId,
        category: categoryId,
        sub_user: subUser[0]?.id
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
                    accept={["image/png", "image/jpeg"]}
                    allowMultiple={false}
                    onUpdateFiles={(e) => handelImagesChange(e, i)}
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
            options={yachts.map((yacht) => yacht.name_en)}
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
