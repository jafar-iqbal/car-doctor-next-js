import axios from 'axios';

export const getServicesFromDB = async () => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/services/api/get-all`);
    return res.data;
  } catch (error) {
    throw new Error('Failed to fetch services');
  }
};

export const getServicesDetailsFromDB = async (id) => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/services/api/${id}`);
    return res.data;
  } catch (error) {
    throw new Error('Failed to fetch service details');
  }
};
