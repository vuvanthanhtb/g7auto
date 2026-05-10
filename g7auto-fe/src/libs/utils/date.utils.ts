import dayjs from "dayjs";

export const formatDate = (date: string | null | undefined): string =>
  date ? dayjs(date).format("DD/MM/YYYY") : "";

export const formatDateTime = (date: string | null | undefined): string =>
  date ? dayjs(date).format("DD/MM/YYYY HH:mm") : "";

export const formatCurrency = (value: number | null | undefined): string => {
  if (value == null) return "";
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
};

export const getDateBefore = (days: number = 30): Date => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
};
