// Image upload service - handles image uploads to backend
import axios from 'axios';

export async function uploadImage(file) {
  const formData = new FormData();
  formData.append('image', file);

  const { data } = await axios.post(
    `${import.meta.env.VITE_API_ENDPOINT}/upload`,
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' }
    }
  );
  return data;
}
