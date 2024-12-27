import { EXCEPTION_MESSAGES, s3Url } from "./constants";
import { toast } from "react-toastify";
import axiosInstance from "./axiosInstance";

export const handleChange = (e, setFormData) => {
  setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
};

export const handlePhoneChange = (value, name, setFormData) => {
  setFormData((prev) => ({ ...prev, [name]: value }));
};

export const filterEmptyKeys = (obj) => {
  return Object.fromEntries(
    Object.entries(obj).filter(
      // eslint-disable-next-line no-unused-vars
      ([_, value]) => value !== null && value !== undefined && value !== ""
    )
  );
};

export const formatNumber = (value) => {
  return value.replace(/(\d{4})(?=\d)/g, "$1 ");
};

export const stripSpaces = (value) => {
  return value.replace(/\s+/g, "");
};

export const checkPasswordStrength = (password) => {
  const hasMinLength = password.length >= 8;
  const hasLetters = /[a-zA-Z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSymbols = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return hasMinLength && hasLetters && hasNumbers && hasSymbols;
};

export const checkIfDateOfBookingInSeason = (seasonPrices, dateOfBooking) => {
  const bookingDate = new Date(dateOfBooking);
  if (!seasonPrices || seasonPrices.length === 0) return false;
  return seasonPrices.filter((season) => {
    return season.dates.some(({ start_date, end_date }) => {
      const startDate = new Date(start_date);
      const endDate = new Date(end_date);
      return bookingDate >= startDate && bookingDate <= endDate;
    });
  });
};

export function capitalizeWord(word) {
  return word[0].toUpperCase() + word.slice(1);
}

export function getExceptionMessage(type, code) {
  const message = EXCEPTION_MESSAGES[type]?.[code];
  return message || null;
}

export function timeDifferenceInHours(startTime, endTime) {
  const [startHours, startMinutes, startSeconds] = startTime
    .split(":")
    .map(Number);
  const [endHours, endMinutes, endSeconds] = endTime.split(":").map(Number);

  const startTotalMinutes = startHours * 60 + startMinutes + startSeconds / 60;
  const endTotalMinutes = endHours * 60 + endMinutes + endSeconds / 60;

  let minutesDifference = endTotalMinutes - startTotalMinutes;

  if (minutesDifference < 0) {
    minutesDifference += 24 * 60;
  }

  const hours = Math.floor(minutesDifference / 60);
  const minutes = Math.floor(minutesDifference % 60);

  const hourText = `${hours} hour${hours !== 1 ? "s" : ""}`;
  const minuteText =
    minutes > 0 ? ` & ${minutes} minute${minutes !== 1 ? "s" : ""}` : "";

  return `${hourText}${minuteText}`;
}

/* ++++++++++++ Multipart Upload ++++++++++++++++++*/

export const initiateUpload = async (data) => {
  const response = await axiosInstance.post(`/media/initiate_upload`, data);
  return response.data;
};

export const uploadPart = async (formData) => {
  const response = await axiosInstance.post(`/media/upload_part`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const completeUpload = async (data) => {
  const response = await axiosInstance.post(`/media/complete_upload`, data);
  return response.data;
};

export const handleFileUpload = async (itemId, itemType, file) => {
  let filePath = "";

  if (file.size >= 200 * 1024 * 1024) {
    toast.error("File size should be less than 200MB");
    return;
  }

  try {
    const { upload_id, key } = await initiateUpload({
      item_id: itemId,
      item_type: itemType,
      media_extension: file.name.split(".").pop(),
    });

    filePath = key;

    const chunkSize = 8 * 1024 * 1024;
    const totalChunks = Math.ceil(file.size / chunkSize);

    for (let partNumber = 1; partNumber <= totalChunks; partNumber++) {
      const start = (partNumber - 1) * chunkSize;
      const end = Math.min(start + chunkSize, file.size);
      const chunk = file.slice(start, end);

      const formData = new FormData();
      formData.append("key", key);
      formData.append("upload_id", upload_id);
      formData.append("part_number", partNumber);
      formData.append("chunk", chunk);

      await uploadPart(formData);
    }

    const completeUploadResponse = await completeUpload({ key, upload_id });
    if (completeUploadResponse) {
      return s3Url + filePath;
    }
  } catch (error) {
    console.error("Error in file upload:", error);
    throw error;
  }
};

export const handleRemoveMedia = async (mediaId, itemId, mediaType) => {
  try {
    const response = await axiosInstance.delete(`/media/delete_media`, {
      data: { media_id: mediaId, item_id: itemId, item_type: mediaType },
    });
    return response.data;
  } catch (error) {
    console.error("Error in delete file :", error);
    throw error;
  }
};
