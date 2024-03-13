import React, { Fragment, useEffect } from "react";
import photoSessionImg from "../../../../assets/images/photoSession.svg";
import fav from "../../../../assets/images/fav.png";
import CustomFileUpload from "../../../ui/form-elements/CustomFileUpload";
import { useState } from "react";
import { uploadFile, deleteFile } from "react-s3";
window.Buffer = window.Buffer || require("buffer").Buffer;

const Media = () => {
  const [formData, setFormData] = useState({
    images: Array(5).fill(""),
    video_link: "",
  });

  const [currentUploading, setCurrentUploading] = useState([]);
  const config = {
    bucketName: "nuaris",
    region: "us-east-1",
    accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_s3_SECRET_ACCESS_KEY,
  };

  async function handleUploadMedia(e) {
    const file = e[0].file;
    var blob = file.slice(0, file.size, file.type);
    const newFile = new File([blob], `${Date.now()}${file.name.slice(-5)}`, {
      type: file.type,
    });
    return await uploadFile(newFile, config)
      .then((data) => {
        return data.location;
      })
      .catch((err) => console.error(err));
  }

  function handleVideoChange(e) {
    if (e.length >= 1) {
      const id = e[0].id;
      if (!currentUploading.includes(id)) {
        handleUploadMedia(e)
          .then((link) => {
            setFormData((prev) => ({ ...prev, video_link: link }));
          })
          .finally(() => {
            setCurrentUploading(currentUploading.filter((e) => e !== id));
          });
      }
    } else {
      setCurrentUploading(
        currentUploading.filter((e) => e !== formData.video_link)
      );
      // TODO: Delete file on delete when user cancels it
      // deleteFile(formData.video_link, config).then(() => {
      // });
      setFormData((prev) => ({ ...prev, video_link: "" }));
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
              const images = [...prev.images];
              images[i] = link;
              return {
                ...prev,
                images,
              };
            });
          })
          .finally(() => {
            setCurrentUploading(currentUploading.filter((e) => e !== id));
          });
      }
    } else {
      setCurrentUploading(
        currentUploading.filter((e) => e !== formData.images[i])
      );
      // // deleteFile(formData.images[i], config).then(() => {
      // });
      setFormData((prev) => ({
        ...prev,
        images: prev.images.map((e, idx) => (idx === i ? "" : e)),
      }));
    }
  }

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <div className="fleet_form__wrapper">
      <div className="bg_white_card">
        <form className="form-ui">
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
              <button className="save_btn ms-auto">Save</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Media;
