import React, { useEffect, useState } from "react";
import photoSessionImg from "../../../../assets/images/photoSession.svg";
import fav from "../../../../assets/images/fav.png";
import CustomFileUpload from "../../../ui/form-elements/CustomFileUpload";
import { uploadFile } from "react-s3";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "../../../../util/axios";
import SubmitButton from "../../../ui/form-elements/SubmitButton";
import { S3Config } from "../../../../constants";
window.Buffer = window.Buffer || require("buffer").Buffer;

const Media = ({ yacht }) => {
  const createdYacht = sessionStorage.getItem("yacht_id");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fileLoading, setFileLoading] = useState(false);
  const [formData, setFormData] = useState({
    image: Array(5).fill(""),
    video_link: "",
  });

  useEffect(() => {
    setFormData({
      image: yacht?.images || Array(5).fill(""),
      video_link: yacht?.video_link || "",
    });
  }, [yacht]);

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
        const image = [...prev.image];
        image[i] = "";
        return {
          ...prev,
          image: image,
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
        const image = [...prev.image];
        image[i] = link;
        return {
          ...prev,
          image: image,
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
      setFormData({
        ...formData,
        video_link: "",
      });
      return;
    }
    if (fileLoading) {
      return;
    }
    try {
      const file = e[0].file;
      const link = await handleUploadMedia(file);
      setFormData({
        ...formData,
        video_link: link,
      });
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
      let url = yacht?.id
        ? `/yachts/${yacht?.id}/`
        : `/yachts/${createdYacht}/`;

      const response = await axios.patch(url, formData);
      if (response.status === 200) {
        yacht
          ? toast.success("Yacht Media Updated Successfully")
          : toast.success("Yacht Media Saved Successfully");
        yacht
          ? navigate(
              `/dashboard/fleet/add-yacht/${yacht?.id}/boat-specification`
            )
          : navigate("/dashboard/fleet/add-yacht/boat-specification");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fleet_form__wrapper">
      <div className="bg_white_card">
        <form className="form-ui" onSubmit={handleSubmit}>
          <div className="row m-0">
            <div className="col-12 p-2">
              <h6 className="form_title">Media & Photos</h6>
            </div>
            <div className="col-12 p-2">
              <div className="request_photo_session">
                <div className="content">
                  <h5>Request a Photo session</h5>
                  <p>
                    luxurious documentation that creatively highlights the
                    beauty and luxury of the yacht.
                  </p>
                  <button>Request Now</button>
                </div>
                <div className="bread_crumb">
                  <img src={photoSessionImg} alt="breadCrumb" />
                </div>
              </div>
            </div>
            {/* photo upload */}
            <div className="col-12 p-2">
              <div className="input-field">
                <label htmlFor="photos">
                  Upload Photos <span>( Maximum 5 Pictures )</span>
                </label>
                <div className="photos">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <CustomFileUpload
                        key={i}
                        labelIdle={`${
                          i === 0
                            ? '<label class="mainImg">Main Image</label>'
                            : ""
                        } <img src=${fav} alt="fav"/>`}
                        pannelRatio=".88"
                        files={formData.image[i] ? [formData.image[i]] : null}
                        value
                        allowMultiple={false}
                        onUpdateFiles={(e) => handleImagesChange(e, i)}
                      />
                    ))}
                </div>
              </div>
            </div>
            {/* video upload */}
            <div className="col-12 p-2">
              <CustomFileUpload
                label="Upload Video"
                hint="( Max Size 20MB )"
                labelIdle="Drag & Drop your files or Browse"
                pannelRatio=".283"
                accept={["video/*"]}
                allowMultiple={false}
                files={formData?.video_link ? [formData?.video_link] : null}
                onUpdateFiles={(e) => handleVideoChange(e)}
              />
            </div>
            <div className="col-12 p-2 pt-4 d-flex gap-3 ">
              <SubmitButton
                className={"save_btn ms-auto"}
                loading={loading}
                fileLoading={fileLoading}
                name={"Save"}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Media;
