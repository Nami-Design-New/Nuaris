import { useState, useMemo, useRef } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import { useQueryClient } from "@tanstack/react-query";

import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginMediaPreview from "filepond-plugin-media-preview";

import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "filepond-plugin-media-preview/dist/filepond-plugin-media-preview.css";

registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginMediaPreview,
  FilePondPluginFileValidateType,
  FilePondPluginFileEncode
);

export default function MediaUploadField({
  label,
  hint,
  labelIdle,
  pannelRatio,
  accept = "image/*,video/*",
  allowMultiple = false,
  files = [],
  companyLogo = false,
  handleFileUpload,
  handleRemoveMedia,
  itemId,
  itemType,
  mediaId,
}) {
  const uploadingFileRef = useRef(null);

  const queryClient = useQueryClient();

  const [isUploading, setIsUploading] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  const queryMap = useMemo(
    () => ({
      ACTIVITY: ["activity", itemId],
      TRIP: ["trip-package", itemId],
      ADDON: ["addon", itemId],
      FLEET: ["yacht", itemId],
      LOGO: ["organization-info"],
    }),
    [itemId]
  );

  const invalidateCache = () => {
    const queryKey = queryMap[itemType];
    if (queryKey) {
      queryClient.invalidateQueries(queryKey);
    }
  };

  const handleUpload = async (fileItems) => {
    if (isUploading || isRemoving) return;
    const file = fileItems[0]?.file;
    if (!file) return;

    if (uploadingFileRef.current === file.name) return;
    uploadingFileRef.current = file.name;

    setIsUploading(true);
    try {
      const s3url = await handleFileUpload(file);
      if (s3url) {
        invalidateCache();
      }
    } catch (error) {
      console.error("Error uploading file:", error.message);
    } finally {
      setIsUploading(false);
      uploadingFileRef.current = null;
    }
  };

  const handleRemove = async () => {
    if (!mediaId || isUploading || isRemoving) return;
    setIsRemoving(true);
    try {
      await handleRemoveMedia(mediaId, itemId, itemType);
      invalidateCache();
    } catch (error) {
      console.error("Error removing media:", error.message);
    } finally {
      setIsRemoving(false);
    }
  };

  const loadFile = async (source, load, error) => {
    try {
      const response = await fetch(source);
      if (!response.ok)
        throw new Error(`Failed to fetch media: ${response.status}`);
      const blob = await response.blob();

      const mimeType = source.endsWith(".png")
        ? "image/png"
        : source.endsWith(".jpg") || source.endsWith(".jpeg")
        ? "image/jpeg"
        : source.endsWith(".webp")
        ? "image/webp"
        : source.endsWith(".mp4") || source.endsWith(".webm")
        ? "video/mp4"
        : blob.type || "application/octet-stream";

      const file = new File([blob], source.split("/").pop(), {
        type: mimeType,
      });
      load(file);
    } catch (err) {
      console.error("Error loading media:", err.message);
      error(err);
    }
  };

  return (
    <div className={`input-field ${companyLogo ? "" : "files"}`}>
      <label>
        {label} <span>{hint}</span>
      </label>
      <FilePond
        labelIdle={labelIdle}
        stylePanelLayout="compact"
        stylePanelAspectRatio={pannelRatio}
        acceptedFileTypes={accept}
        allowMultiple={allowMultiple}
        onupdatefiles={(fileItems) => {
          if (fileItems.length > 0 && !isUploading && !isRemoving) {
            const newFiles = fileItems.filter(
              (item) => item.origin === 1 && !item.serverId
            );
            if (newFiles.length > 0) {
              handleUpload(newFiles);
            }
          }
        }}
        beforeRemoveFile={() => {
          handleRemove();
          return false;
        }}
        server={{ load: loadFile }}
        allowRevert={false}
        files={files?.map((file) => ({
          source: file,
          options: { type: "local", serverId: file },
        }))}
      />
    </div>
  );
}
