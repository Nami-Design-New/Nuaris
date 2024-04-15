import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { uploadFile } from "react-s3";
import { S3Config } from "../../../../constants";
import fav from "../../../../assets/images/fav.png";
import CustomFileUpload from "./../../../ui/form-elements/CustomFileUpload";
import CustomInputField from "./../../../ui/form-elements/CustomInputField";
import CustomSelectField from "./../../../ui/form-elements/CustomSelectField";
import CommentField from "../../../ui/form-elements/CommentField";
import axios from "./../../../../util/axios";
import { useSelector } from "react-redux";
import Vat from "../Vat";
import { Form } from "react-bootstrap";
import SubmitButton from "../../../ui/form-elements/SubmitButton";

const MainInfoForm = ({ setForm }) => {
  const user = useSelector((state) => state.user?.user);
  const subUser = user?.subuser_set?.filter(
    (u) => u.role === user.current_role
  )[0]?.id;
  const [videoLink, setVideoLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [fileLoading, setFileLoading] = useState(false);
  const [hasParentYacht, setHasParentYacht] = useState(false);
  const [yachts, setYachts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    yacht: "",
    need_to_know: "",
    capacity: "",
    quantity: "",
    images_list: Array(3).fill("")
  });

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
  // ========= media ========== //
  const handleUploadMedia = async (file) => {
    if (fileLoading) {
      return "";
    }
    setFileLoading(true);
    try {
      const blob = file.slice(0, file.size, file.type);
      const newFile = new File([blob], `${Date.now()}${file.name.slice(-3)}`, {
        type: file.type
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
    if (e?.length === 0) {
      setFormData((prev) => {
        const images_list = [...prev.images_list];
        images_list[i] = "";
        return {
          ...prev,
          images_list: images_list
        };
      });
      return;
    }
    if (fileLoading) {
      return;
    }
    try {
      const file = e[0].file;
      const link = await handleUploadMedia(file);
      setFormData((prev) => {
        const images_list = [...prev.images_list];
        images_list[i] = link;
        return {
          ...prev,
          images_list: images_list
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
      setVideoLink("");
      return;
    }
    if (fileLoading) {
      return;
    }
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
  // ========= end of media ========= //
  const handleNext = (e) => {
    setForm("Location & Working hours");
  };
  return (
    <form className="form-ui">
      <div className="row m-0">
        <div className="col-12 p-2">
          <h6 className="form_title">Package Info</h6>
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
                      formData.images_list[i] ? [formData.images_list[i]] : null
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
            files={videoLink ? [videoLink] : null}
            onUpdateFiles={(e) => handleVideoChange(e)}
          />
        </div>
        {/* package name */}
        <div className="col-lg-6 col-12 p-2">
          <CustomInputField
            label="Activity Name"
            value={formData.name}
            placeHolder="Write here"
            name="name"
            id="name"
            onChange={(e) =>
              setFormData((prev) => {
                return {
                  ...prev,
                  name: e.target.value
                };
              })
            }
          />
        </div>
        {/* category */}
        <div className="col-lg-6 col-12 p-2">
          <CustomSelectField
            label="Catagory"
            value={formData.category}
            name="category"
            id="category"
            onChange={(e) =>
              setFormData((prev) => {
                return {
                  ...prev,
                  category: e.target.value
                };
              })
            }
            options={[
              {
                name: "All",
                value: "all"
              },
              {
                name: "Yacht",
                value: "yacht"
              },
              {
                name: "Cabin",
                value: "cabin"
              },
              {
                name: "Cruise",
                value: "cruise"
              }
            ]}
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
        {/* capacity */}
        <div className="col-lg-6 col-12 p-2">
          <CustomInputField
            label="Capacity"
            value={formData.capacity}
            placeHolder="00"
            type="number"
            name="capacity"
            id="capacity"
            onChange={(e) =>
              setFormData((prev) => {
                return {
                  ...prev,
                  capacity: e.target.value
                };
              })
            }
          />
        </div>
        {/* quantity */}
        <div className="col-lg-6 col-12 p-2">
          <CustomInputField
            label="Quantity"
            value={formData.quantity}
            placeHolder="00"
            type="number"
            name="quantity"
            id="quantity"
            onChange={(e) =>
              setFormData((prev) => {
                return {
                  ...prev,
                  quantity: e.target.value
                };
              })
            }
          />
        </div>
        {/* Need to know & restrictions about activity */}
        <div className="col-12 p-2">
          <CommentField
            htmlFor="need_to_know"
            label="Need to know & restrictions about activity"
            id="description"
            placeholder="Write here"
            value={formData.need_to_know}
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
