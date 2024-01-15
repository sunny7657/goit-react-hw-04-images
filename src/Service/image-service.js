import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '40411285-e0a8815789142127d1d60a3c2';

export const getImages = async (query, page) => {
  const options = new URLSearchParams({
    key: API_KEY,
    q: `${query}`,
    orientation: 'horizontal',
    per_page: 12,
    image_type: 'photo',
    page,
  });
  const { data } = await axios.get(`?${options}`);
  return data;
};
