import React from "react";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const LogoUploadField = ({ htmlFor, label }) => {
  return (
    <div className="input-field">
      <label htmlFor={htmlFor}>
        {label}
      </label>
      <FilePond
        stylePanelLayout="compact"
        acceptedFileTypes={["image/*"]}
        labelIdle="LOGO"
        id={htmlFor}
        stylePanelAspectRatio="0.415"
      />
    </div>
  );
};

export default LogoUploadField;
