/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './General.css';
export const SUCCESS = 1;
export const FAILURE = 2;

export const displayToast = (message, status) => {
  const toastProgressClassname = (status === SUCCESS)? 'custom-toast-success' : 'custom-toast-error';
  toast(message, {
    position: toast.POSITION.TOP_RIGHT,
    progressClassName: toastProgressClassname,
  });
};
