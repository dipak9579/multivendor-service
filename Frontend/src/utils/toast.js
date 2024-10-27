// src/utils/toast.js
import { toast } from 'react-toastify';

const toastOptions = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
};

// Function to show success toast
export const showSuccessToast = (message) => {
    toast.success(message, toastOptions);
};

// Function to show error toast
export const showErrorToast = (message) => {
    toast.error(message, toastOptions);
};

// Function to show info toast
export const showInfoToast = (message) => {
    toast.info(message, toastOptions);
};
