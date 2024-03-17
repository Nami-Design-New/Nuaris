import React, { Fragment } from "react";
import photoSessionImg from "../../../../assets/images/photoSession.svg";
import fav from "../../../../assets/images/fav.png";
import CustomFileUpload from "../../../ui/form-elements/CustomFileUpload";
import { useState } from "react";
import { uploadFile } from "react-s3";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "../../../../util/axios";
import SubmitButton from "../../../ui/form-elements/SubmitButton";
window.Buffer = window.Buffer || require("buffer").Buffer;

const Media = () => {
  const createdYacht = sessionStorage.getItem("yacht_id");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    image: Array(5).fill(""),
    video_link: ""
  });

  const [currentUploading, setCurrentUploading] = useState([]);
  const config = {
    bucketName: "nuaris",
    region: "us-east-1",
    accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_s3_SECRET_ACCESS_KEY
  };

  async function handleUploadMedia(e) {
    try {
      const file = e[0].file;
      var blob = file.slice(0, file.size, file.type);
      const newFile = new File([blob], `${Date.now()}${file.name.slice(-5)}`, {
        type: file.type
      });
      const data = await uploadFile(newFile, config);
      return data.location;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  }

  function handleVideoChange(e) {
    if (e.length >= 1) {
      const id = e[0].id;
      if (!currentUploading.includes(id)) {
        handleUploadMedia(e)
          .then((link) => {
            setFormData((prev) => ({ ...prev, video_link: link }));
          })
          .catch((error) => {
            console.error("Error handling video upload:", error);
          })
          .finally(() => {
            setCurrentUploading(currentUploading.filter((e) => e !== id));
          });
      }
    } else {
      // Handle case when no file is selected
    }
  }

  function handleImageChange(e, i) {
    if (e.length >= 1) {
      const id = e[0].id;
      if (!currentUploading.includes(id)) {
        setCurrentUploading(currentUploading.push(id));
        handleUploadMedia(e)
          .then((link) => {
            setFormData((prev) => {
              const image = [...prev.image];
              image[i] = link;
              return {
                ...prev,
                image
              };
            });
          })
          .finally(() => {
            setCurrentUploading(currentUploading.filter((e) => e !== id));
          });
      }
    } else {
      setCurrentUploading(
        currentUploading.filter((e) => e !== formData.image[i])
      );
      // // deleteFile(formData.images[i], config).then(() => {
      // });
      setFormData((prev) => ({
        ...prev,
        image: prev.image.map((e, idx) => (idx === i ? "" : e))
      }));
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.patch(`/yachts/${createdYacht}/`, formData);
      if (response.status === 200) {
        toast.success("Yacht Media Saved Successfully");
        navigate("/dashboard/fleet/add-yacht/boat-specification");
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
                    .map((_, i) => {
                      return (
                        <Fragment key={i}>
                          <CustomFileUpload
                            pannelRatio={".88"}
                            accept={["image/png", "image/jpeg"]}
                            labelIdle={`${
                              i === 0
                                ? '<label class="mainImg">Main Image</label>'
                                : ""
                            } <img src=${fav} alt="fav"/>`}
                            onUpdateFiles={(e) => handleImageChange(e, i)}
                          />
                        </Fragment>
                      );
                    })}
                </div>
              </div>
            </div>
            {/* video upload */}
            <div className="col-12 p-2">
              <CustomFileUpload
                label="Upload Video"
                hint="( Max Size 20MB )"
                labelIdle="Drag & Drop your files or Browse"
                pannelRatio=".245"
                accept={["video/*"]}
                onUpdateFiles={(e) => handleVideoChange(e)}
              />
            </div>
            <div className="col-12 p-2 pt-4 d-flex gap-3 ">
              <SubmitButton
                className={"save_btn ms-auto"}
                loading={loading}
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
