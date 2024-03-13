import React from "react";
import photoSessionImg from "../../../../assets/images/photoSession.svg";
import fav from "../../../../assets/images/fav.png";
import FilesUpload from "../../../ui/form-elements/FilesUpload";
import { useState } from "react";

const Media = () => {
  const [formData, setFormData] = useState({});

  // response => {images: [""], video_link: ""}

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
                      <FilesUpload
                        key={f}
                        labelIdle={`${
                          f === 0
                            ? '<label class="mainImg">Main Image</label>'
                            : ""
                        } <img src=${fav} alt="fav"/>`}
                        pannelRatio=".88"
                        accept={["image/png", "image/jpeg"]}
                        allowMultiple={false}
                        setFormData={setFormData}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
            {/* video upload */}
            <div className="col-12 p-2">
              <FilesUpload
                htmlFor="vidoe"
                label="Upload Video"
                hint="( Max Size 20MB )"
                labelIdle="Drag & Drop your files or Browse"
                pannelRatio=".245"
                accept={["video/*"]}
                allowMultiple={false}
                setFormData={setFormData}
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
