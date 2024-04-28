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
  onUpdateFiles,
  files,
  companyLogo
}) {
  return (
    <div className={`input-field ${companyLogo ? "" : "files"}`}>
      <label>
        {label} <span>{hint}</span>
      </label>
      <FilePond
        acceptedFileTypes={accept}
        files={
          files && files.map((e) => ({ source: e, options: { type: "local" } }))
        }
        server={{
          load: (source, load) => {
            let myRequest = new Request(source);
            fetch(myRequest)
              .then(function (response) {
                response.blob().then(function (myBlob) {
                  load(myBlob);
                });
              })
              .catch((err) => {
                load(null);
                console.error(err);
              });
          }
        }}
        allowMultiple={allowMultiple}
        stylePanelLayout="compact"
        labelIdle={labelIdle}
        stylePanelAspectRatio={pannelRatio}
        onupdatefiles={(fileItems) => {
          // Check if the file change was due to an upload by the user
          if (typeof fileItems[0]?.source === "object" || !fileItems[0]) {
            onUpdateFiles(fileItems);
          } else {
            return;
          }
        }}
      />
    </div>
  );
}
