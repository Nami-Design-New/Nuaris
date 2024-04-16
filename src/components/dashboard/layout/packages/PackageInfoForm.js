import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { uploadFile } from "react-s3";
import { S3Config } from "../../../../constants";
import { useSelector } from "react-redux";
import fav from "../../../../assets/images/fav.png";
import CustomFileUpload from "../../../ui/form-elements/CustomFileUpload";
import CustomInputField from "./../../../ui/form-elements/CustomInputField";
import axios from "./../../../../util/axios";
import CustomSelectField from "../../../ui/form-elements/CustomSelectField";
import CommentField from "../../../ui/form-elements/CommentField";
import SubmitButton from "../../../ui/form-elements/SubmitButton";
import CustomDatePicker from "../../../ui/form-elements/CustomDatePicker";
import AddonsToConnect from "./AddonsToConnect";

const PackageInfoForm = ({ setForm, tripPackage }) => {
  const user = useSelector((state) => state.user?.user);
  const subUser = user?.subuser_set?.filter(
    (u) => u.role === user.current_role
  )[0]?.id;
  const [yachts, setYachts] = useState([]);
  const [addons, setAddons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [videoLink, setVideoLink] = useState("");
  const [fileLoading, setFileLoading] = useState(false);

  const addonsInitial = {
    addon: "",
    quantity: "",
  };
  const [formData, setFormData] = useState({
    sub_user: subUser,
    name: "",
    description: "",
    period_of_activation_from: "",
    period_of_activation_to: "",
    yacht: "",
    images_list: Array(3).fill(""),
    addons_list: [addonsInitial],
  });

  useEffect(() => {
    setFormData({
      ...formData,
      yacht: tripPackage?.yacht || "",
      name: tripPackage?.name || "",
      description: tripPackage?.description || "",
      period_of_activation_from: tripPackage?.period_of_activation_from || "",
      period_of_activation_to: tripPackage?.period_of_activation_to || "",
      images_list: tripPackage?.images || Array(3).fill(""),
      addons_list: tripPackage?.addons || [addonsInitial],
    });
    if (tripPackage?.images[3]) {
      setVideoLink(tripPackage?.images[3]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tripPackage]);

  useEffect(() => {
    axios
      .get(`/yachts/?page_size=1000/&sub_user=${subUser}`)
      .then((res) => {
        setYachts(res?.data?.results);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`/addons/?sub_user=${subUser}&page_size=1000`)
      .then((res) => {
        setAddons(res?.data?.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [subUser]);

  const handleNext = (e) => {
    e.preventDefault();
    setForm("Package Time & Price");
  };

  // ========= media ========== //
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
        const images_list = [...prev.images_list];
        images_list[i] = "";
        return {
          ...prev,
          images_list: images_list,
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
          images_list: images_list,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.request({
        method: tripPackage ? "PATCH" : "POST",
        url: `/trip-packages/${tripPackage ? `${tripPackage.id}/` : ""}`,
        data: {
          ...formData,
          video_link: videoLink,
        },
      });
      if (response.status === 201 || response.status === 200) {
        toast.success("Package Info Saved Successfully");
        setForm("Package Time & Price");
        sessionStorage.setItem("package_id", response.data.id);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form-ui" onSubmit={handleSubmit}>
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
              <CustomDatePicker
                beforeContent={"From"}
                value={formData.period_of_activation_from}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    period_of_activation_from: e.target.value,
                  })
                }
              />
            </div>
            <div className="col-lg-6 col-12 p-2">
              <CustomDatePicker
                beforeContent={"To"}
                value={formData.period_of_activation_to}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    period_of_activation_to: e.target.value,
                  })
                }
              />
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
        <AddonsToConnect
          formData={formData}
          addons={addons}
          setFormData={setFormData}
          addonsInitial={addonsInitial}
        />
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
