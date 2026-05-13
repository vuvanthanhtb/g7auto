export const parseQuotationStatus = (status: string): string => {
  switch (status) {
    case "DRAFT":
      return "Nháp";
    case "SENT":
      return "Đã gửi";
    case "ACCEPTED":
      return "Đã chấp nhận";
    case "CANCELLED":
      return "Đã hủy";
    default:
      return status;
  }
};
