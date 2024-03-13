import React, { Fragment } from "react";
import photoSessionImg from "../../../../assets/images/photoSession.svg";
import fav from "../../../../assets/images/fav.png";
import CustomFileUpload from "../../../ui/form-elements/CustomFileUpload";
import { useState } from "react";
import { uploadFile } from "react-s3";
window.Buffer = window.Buffer || require("buffer").Buffer;

const Media = () => {
  const [formData, setFormData] = useState({
    images: [{}],
    video_link: "",
  });

  function handleFileChange(e, type) {
    if (e.length === 0) {
      // delete video from form data
      if (type === "video") {
        setFormData((prev) => ({ ...prev, video_link: "" }));
      }

      // or delete image from images array
      if (type === "image") {
        // setFormData((prev) => ({...prev, images: prev.images.filter()}))
      }
    }

    const config = {
      bucketName: "nuaris",
      region: "us-east-1",
      accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY,
      secretAccessKey: process.env.REACT_APP_s3_SECRET_ACCESS_KEY,
    };

    const file = e[0].file;
    // if (type === "video") {
    uploadFile(file, config)
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
    // } else {
    // return;
    // }
  }

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
                  {[0, 1, 2, 3, 4].map((f) => {
                    return (
                      <Fragment key={f}>
                        <CustomFileUpload
                          pannelRatio={".88"}
                          accept={["image/png", "image/jpeg"]}
                          labelIdle={`${
                            f === 0
                              ? '<label class="mainImg">Main Image</label>'
                              : ""
                          } <img src=${fav} alt="fav"/>`}
                          onUpdateFiles={(e) => handleFileChange(e, "image")}
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
                onUpdateFiles={(e) => handleFileChange(e, "video")}
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
