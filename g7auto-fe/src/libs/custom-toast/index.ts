import { toast, type ToastOptions } from "react-toastify";
import { t } from "@/libs/i18n";

export const toastSuccess = (message: string, options: ToastOptions = {}) =>
  toast.success(message, options);

export const toastError = (message: string, options: ToastOptions = {}) =>
  toast.error(message?.trim() || t("COMMON_DEFAULT_ERROR"), options);

export const toastInfo = (message: string, options: ToastOptions = {}) =>
  toast.info(message, options);

export const toastWarning = (message: string, options: ToastOptions = {}) =>
  toast.warning(message, options);
