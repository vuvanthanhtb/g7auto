export const parseDepositStatus = (status?: string) => {
  switch (status) {
    case "HOLDING":
      return "Đang giữ cọc";
    case "CONVERTED":
      return "Đã chuyển thành giao dịch";
    case "REFUNDED":
      return "Đã hoàn cọc";
    case "CANCELLED":
      return "Đã hủy cọc";
    default:
      return "";
  }
};
