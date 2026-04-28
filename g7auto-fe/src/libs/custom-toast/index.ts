import { toast, type ToastOptions } from "react-toastify";

const DEFAULT_ERROR = "Hệ thống đang bận. Vui lòng thử lại sau.";

export const toastSuccess = (message: string, options: ToastOptions = {}) =>
  toast.success(message, options);

export const toastError = (message: string, options: ToastOptions = {}) =>
  toast.error(message?.trim() || DEFAULT_ERROR, options);

export const toastInfo = (message: string, options: ToastOptions = {}) =>
  toast.info(message, options);

export const toastWarning = (message: string, options: ToastOptions = {}) =>
  toast.warning(message, options);
