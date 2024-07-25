import { toast } from "react-toastify";
import { uploadFile } from "react-s3";
import { S3Config } from "./contants";

export const handleUploadMedia = async (file, setFileLoading, fileLoading) => {
  if (fileLoading) {
    return "";
  }
  setFileLoading(true);
  try {
    const blob = file.slice(0, file.size, file.type);
    const newFile = new File([blob], `${Date.now()}${file.name.slice(-3)}`, {
      type: file.type
    });
    const data = await uploadFile(newFile, S3Config);
    return data.location;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  } finally {
    setFileLoading(false);
  }
};

export async function handleFilesListUpload(
  e,
  key,
  setFormData,
  fileLoading,
  setFileLoading
) {
  if (fileLoading) {
    return;
  }
  try {
    const uploadPromises = e.map((fileWrapper) =>
      handleUploadMedia(fileWrapper.file, setFileLoading, fileLoading)
    );
    const uploadedFiles = await Promise.all(uploadPromises);
    setFormData((prev) => ({
      ...prev,
      [key]: uploadedFiles
    }));
  } catch (error) {
    console.error("Error uploading files:", error);
    toast.error("Error uploading files");
  } finally {
    setFileLoading(false);
  }
}

export async function handleSingleFileUpload(
  e,
  key,
  setFormData,
  fileLoading,
  setFileLoading
) {
  if (fileLoading) {
    return;
  }
  try {
    const file = e[0].file;
    const link = await handleUploadMedia(file, setFileLoading, fileLoading);
    setFormData((prev) => ({
      ...prev,
      [key]: link
    }));
  } catch (error) {
    console.error("Error uploading file:", error);
    toast.error("Error uploading file");
  } finally {
    setFileLoading(false);
  }
}
