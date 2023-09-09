import axios from 'axios';

const fetchData = async (data) => {
  try {
    const response = await axios.post(import.meta.env.VITE_API, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return { data: response.data, status: response.status };
  } catch (error) {
    throw error;
  }
};
export default fetchData;
