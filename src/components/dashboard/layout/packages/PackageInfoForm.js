import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { handleUploadMedia } from "../../../../util/helpers";
import fav from "../../../../assets/images/fav.png";
import CustomFileUpload from "../../../ui/form-elements/CustomFileUpload";
import CustomInputField from "./../../../ui/form-elements/CustomInputField";
import axios from "./../../../../util/axios";
import CustomSelectField from "../../../ui/form-elements/CustomSelectField";
import CommentField from "../../../ui/form-elements/CommentField";
import SubmitButton from "../../../ui/form-elements/SubmitButton";
import CustomDatePicker from "../../../ui/form-elements/CustomDatePicker";
import AddonsToConnect from "./AddonsToConnect";
import ActivitiesToConnect from "./ActivitiesToConnect";

const PackageInfoForm = ({
  setForm,
  tripPackage,
  formData,
  setFormData,
  subUser,
  addonsInitial,
  activitiesInitial,
  isMainInfoValid,
  setIsMainInfoValid
}) => {
  const [yachts, setYachts] = useState([]);
  const [addons, setAddons] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fileLoading, setFileLoading] = useState(false);

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
    axios
      .get(`/activities/?sub_user=${subUser}&page_size=1000`)
      .then((res) => {
        setActivities(res?.data?.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [subUser]);

  const handleNext = (e) => {
    e.preventDefault();
    if (isMainInfoValid) {
      setForm("Package Time & Price");
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
      const link = await handleUploadMedia(file, setFileLoading, fileLoading);
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
  // ========= end of media ========= //

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const filteredImagesList = formData.images_list.filter(
        (img) => img !== ""
      );
      const response = await axios.request({
        method: tripPackage ? "PATCH" : "POST",
        url: `/trip-packages/${tripPackage ? `${tripPackage.id}/` : ""}`,
        data: {
          ...formData,
          video_link: formData.video_link ? formData.video_link : null,
          images_list: filteredImagesList
        }
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
            files={formData.video_link ? [formData.video_link] : null}
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
              value: yacht.id
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
                    period_of_activation_from: e.target.value
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
                    period_of_activation_to: e.target.value
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
          addons={addons}
          formData={formData}
          setFormData={setFormData}
          addonsInitial={addonsInitial}
        />
        <ActivitiesToConnect
          formData={formData}
          activities={activities}
          setFormData={setFormData}
          activitiesInitial={activitiesInitial}
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
