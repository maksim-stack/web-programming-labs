import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const uploadFile = (file: File, onProgress: (p: number) => void) => {
  const formData = new FormData();
  formData.append("file", file);

  return axios.post(`${API}/files`, formData, {
    onUploadProgress: (event) => {
      if (!event.total) return;
      const percent = Math.round((event.loaded * 100) / event.total);
      onProgress(percent);
    },
  });
};

export const getFiles = () => axios.get(`${API}/files`);