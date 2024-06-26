import { uploadFile } from "react-s3";
import { S3Config } from "../constants";

export function checkIsItemActive(item, currentRoute) {
  let isActive = false;
  if (item?.submenu) {
    item.submenu?.forEach((item) => {
      if (item.path === currentRoute) {
        isActive = true;
      }
    });
  }
  return isActive;
}

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
