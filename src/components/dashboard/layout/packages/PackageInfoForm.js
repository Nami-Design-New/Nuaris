import React, { useEffect, useState } from "react";
import fav from "../../../../assets/images/fav.png";
import CustomFileUpload from "../../../ui/form-elements/CustomFileUpload";
import { toast } from "react-toastify";
import { uploadFile } from "react-s3";
import { S3Config } from "../../../../constants";
import CustomInputField from "./../../../ui/form-elements/CustomInputField";
import { useSelector } from "react-redux";
import axios from "./../../../../util/axios";
import CustomSelectField from "../../../ui/form-elements/CustomSelectField";
import CommentField from "../../../ui/form-elements/CommentField";
import SubmitButton from "../../../ui/form-elements/SubmitButton";
import CustomDatePicker from "../../../ui/form-elements/CustomDatePicker";

const PackageInfoForm = ({ setForm }) => {
  const user = useSelector((state) => state.user?.user);
  const subUser = user?.subuser_set?.filter(
    (u) => u.role === user.current_role
  )[0]?.id;
  const [yachts, setYachts] = useState([]);
  const [videoLink, setVideoLink] = useState("");
  const [loading] = useState(false);
  const [fileLoading, setFileLoading] = useState(false);
  const [formData, setFormData] = useState({
    attachment: Array(3).fill(""),
    name: "",
    yacht: null,
    license_expiration_date: "",
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

  const handleNext = (e) => {
    e.preventDefault();
    setForm("Package Time & Price");
  };

  // ========= media ==========//
  const handleUploadMedia = async (file) => {
    if (fileLoading) {
      return "";
    }
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
    if (e?.length === 0) {
      setFormData((prev) => {
        const attachment = [...prev.attachment];
        attachment[i] = "";
        return {
          ...prev,
          attachment: attachment,
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
        const attachment = [...prev.attachment];
        attachment[i] = link;
        return {
          ...prev,
          attachment: attachment,
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
            files={videoLink ? [videoLink] : null}
            onUpdateFiles={(e) => handleVideoChange(e)}
          />
        </div>
        {/* package name */}
        <div className="col-lg-6 col-12">
          <CustomInputField
            label="Package Name"
            name="package_name"
            type="text"
            placeholder="write here"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        {/* yacht */}
        <div className="col-lg-6 col-12 p-2">
          <CustomSelectField
            label="Parent Yacht"
            id="yacht"
            value={formData.yacht}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, yacht: e.target.value }));
            }}
            options={yachts?.map((yacht) => ({
              name: yacht.name_en,
              value: yacht.id,
            }))}
          />
        </div>
        <div className="col-lg-12 p-2 input-field">
          <label>Period of package activation </label>
          <div className="row px-2">
            <div className="col-lg-6 col-12 p-2">
              <CustomDatePicker beforeContent={"From"} />
            </div>
            <div className="col-lg-6 col-12 p-2">
              <CustomDatePicker beforeContent={"To"} />
            </div>
          </div>
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
        {/* license expiration date */}
        <div className="col-12 p-2">
          <CustomInputField
            label="License expiration date"
            name="license_expiration_date"
            type="date"
            value={formData.license_expiration_date}
            onChange={(e) =>
              setFormData({
                ...formData,
                license_expiration_date: e.target.value,
              })
            }
          />
        </div>
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

export default PackageInfoForm;
