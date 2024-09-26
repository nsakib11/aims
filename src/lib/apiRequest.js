import axios from 'axios';
import { toast } from 'react-toastify';

/**
 * Make an API request and handle responses with toast notifications.
 * @param {Object} options - Axios request configuration object.
 * @returns {Promise<Object>} - Response data or error object.
 */
const apiRequest = async (options) => {
  try {
    const response = await axios(options);
    const data = response.data;

    if (data.success) {
      if (data.response && data.response.length > 0) {
        if (data.response[0].message) {
          toast.success(data.response[0].message);
        } else {
          toast.success('Request successful!');
        }
      }
      return data.response[0];
    } else {
      if (data.errors && data.errors.length > 0) {
        const errorMessage = data.errors.map(error => error.message).join(', ');
        toast.error(errorMessage);
        throw new Error(errorMessage);
      } else {
        throw new Error('An unknown error occurred');
      }
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred';
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};

export default apiRequest;
