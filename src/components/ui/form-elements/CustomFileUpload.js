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

export default function CustomFileUpload({
  label,
  hint,
  pannelRatio,
  labelIdle,
  accept = "image/*",
  allowMultiple = false,
  onUpdateFiles
}) {
  return (
    <div className="input-field files">
      <label>
        {label} <span>{hint}</span>
      </label>
      <FilePond
        acceptedFileTypes={accept}
        allowMultiple={allowMultiple}
        stylePanelLayout="compact"
        labelIdle={labelIdle}
        stylePanelAspectRatio={pannelRatio}
        onupdatefiles={onUpdateFiles}
      />
    </div>
  );
}
