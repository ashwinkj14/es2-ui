/* eslint-disable max-len */
import axios from 'axios';
import {FAILURE, displayToast} from '../components/ToastUtil';
import {BASE_URL} from '../server-constants';

const httpClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request Interceptor
httpClient.interceptors.request.use((request) => {
  const token = localStorage.getItem('token');
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
}, (error) => {
  return Promise.reject(error);
});

// Response Interceptor
httpClient.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response) {
    // Handle common errors centrally
    switch (error.response.status) {
      case 401: // Unauthorized
        displayToast('You are not authorized to perform this action.', FAILURE);
        localStorage.removeItem('token');
        window.location = '/';
        break;
      case 403: // Forbidden
        displayToast('You do not have permission to perform this action.', FAILURE);
        break;
      case 429: // Too many requests
        displayToast('You have performed too many requests. Please wait for a minute before performing any request.', FAILURE);
        break;
      case 500: // Server Error
        displayToast('Internal server error occurred. Please try again later.', FAILURE);
        break;
      default:
        displayToast('An error occurred. Please try again.', FAILURE);
        break;
    }
  }
  return Promise.reject(error);
});

export default httpClient;
