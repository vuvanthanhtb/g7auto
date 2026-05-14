export const parsePaymentStatus = (status: string): string => {
  switch (status) {
    case "PENDING":
      return "Chờ thanh toán";
    case "CONFIRMED":
      return "Thanh toán thành công";
    case "FAILED":
      return "Thanh toán thất bại";
    default:
      return status;
  }
};

export const parsePaymentMethod = (method: string): string => {
  switch (method) {
    case "BANK_TRANSFER":
      return "Chuyển khoản ngân hàng";
    case "CASH":
      return "Tiền mặt";
    case "CREDIT_CARD":
      return "Thẻ tín dụng";
    case "BANK_LOAN":
      return "Vay ngân hàng";
    default:
      return method;
  }
};
