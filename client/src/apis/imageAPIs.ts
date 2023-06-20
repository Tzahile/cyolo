import axios from "axios";

const baseURL = "http://localhost:3000";

export const uploadImage = async (file: File, retention: number) => {
  const formData = new FormData();
  // retention is in milliseconds
  formData.append("retention", String(retention));
  formData.append("image", file);
  const response = await axios.put(`${baseURL}/v1/file`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data; // sharable URL
};

export const getImage = async (fileURL: string) => {
  const response = await axios.get(`${baseURL}/${fileURL}`, {
    responseType: "blob",
  });
  return response.data;
};
