export const formatNumber = (value?: number | null): string => {
  if (value == null) return "0";

  return new Intl.NumberFormat("vi-VN").format(value);
};
