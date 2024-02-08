import React from "react";
// filepond
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);


const HostForm = () => {
  return (
    <div className="regiesteration-form">
      <div className="container p-0">
        <div className="row m-0">
          <div className="col-lg-6 col-12 p-2">
            <div className="input-field mb-3">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                placeholder="Ex: mahmoud"
                id="firstName"
                name="firstName"
              />
            </div>
            <div className="input-field">
              <label htmlFor="lastName">Family Name</label>
              <input
                type="text"
                placeholder="Ex: mahmoud"
                id="lastName"
                name="lastName"
              />
            </div>
          </div>
          <div className="col-lg-6 col-12 p-2">
            <div className="input-field">
              <label htmlFor="logo">Upload Your Logo</label>
              <FilePond
                stylePanelLayout="compact"
                acceptedFileTypes={["image/*"]}
                labelIdle="LOGO"
                stylePanelAspectRatio="0.5"
              />
            </div>
          </div>
          <div className="col-lg-6 col-12 p-2">
            <div className="input-field">
              <label htmlFor="email">Email Address</label>
              <input
                placeholder="EX: mail@mail.com"
                type="email"
                id="email"
                name="email"
              />
            </div>
          </div>
          <div className="col-lg-6 col-12 p-2">
            <div className="input-field">
              <label htmlFor="phone">Mobile Number</label>
              <input
                placeholder="EX: mail@mail.com"
                type="tel"
                id="email"
                name="email"
              />
            </div>
          </div>
          <div className="col-lg-6 col-12 p-2">
            <div className="input-field">
              <label htmlFor="userName">Username</label>
              <input
                placeholder="EX: mahmoudgmal"
                type="text"
                id="userName"
                name="userName"
              />
            </div>
          </div>
          <div className="col-lg-6 col-12 p-2">
            <div className="input-field">
              <label htmlFor="password">Password</label>
              <input
                placeholder="************"
                type="password"
                id="password"
                name="password"
              />
            </div>
          </div>
          <div className="col-lg-6 col-12 p-2">
            <div className="input-field">
              <label htmlFor="commercialName">Commercial Name</label>
              <input
                placeholder="EX: luxury "
                type="text"
                id="commercialName"
                name="commercialName"
              />
            </div>
          </div>
          <div className="col-lg-6 col-12 p-2">
            <div className="input-field">
              <label htmlFor="commercialRegistrationType">
                Commercial registration Type
              </label>
              <select className="wide">
                <option value="india">India</option>
                <option value="italy">Italy</option>
                <option value="spain">Spain</option>
                <option value="france">France</option>
                <option value="brazil">Brazil</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostForm;
