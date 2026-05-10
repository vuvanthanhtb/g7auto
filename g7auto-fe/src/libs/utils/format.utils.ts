export const formatNumber = (value?: number | null): string => {
  if (value == null) return "0";

  return new Intl.NumberFormat("vi-VN").format(value);
};

export function formatPhoneNumber(phone?: string | null): string {
  if (!phone) return "";

  const cleaned = phone.replace(/\D/g, "");

  return cleaned.replace(/(\d{4})(\d{3})(\d{3})/, "$1 $2 $3");
}
