import React from "react";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType
);

const LogoUploadField = ({ htmlFor, label, setFormData }) => {
  const handleFileChange = (files) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      logo: files && files.length > 0 ? files[0].file : null,
    }));
  };

  return (
    <div className="input-field">
      <label htmlFor={htmlFor}>
        {label} <span>(PNG or JPG)</span>
      </label>
      <FilePond
        stylePanelLayout="compact"
        acceptedFileTypes={["image/png", "image/jpeg"]}
        labelIdle="LOGO"
        id={htmlFor}
        stylePanelAspectRatio="0.415"
        onupdatefiles={handleFileChange}
      />
    </div>
  );
};

export default LogoUploadField;
