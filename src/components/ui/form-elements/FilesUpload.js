import React from "react";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType
);

const FilesUpload = ({
  htmlFor,
  label,
  hint,
  pannelRatio,
  labelIdle,
  accept,
  allowMultiple,
  setFormData,
}) => {
  const handleFileChange = (files) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [htmlFor]: files && files.length > 0 ? files[0].file : null,
    }));
  };

  return (
    <div className="input-field files">
      <label htmlFor={htmlFor}>
        {label} <span>{hint}</span>
      </label>
      <FilePond
        acceptedFileTypes={accept}
        allowMultiple={allowMultiple}
        stylePanelLayout="compact"
        labelIdle={labelIdle}
        id={htmlFor}
        stylePanelAspectRatio={pannelRatio}
        onupdatefiles={handleFileChange}
      />
    </div>
  );
};

export default FilesUpload;
