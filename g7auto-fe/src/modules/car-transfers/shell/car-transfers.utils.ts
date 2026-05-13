export const parseCarTransferStatus = (status: string) => {
  switch (status) {
    case "PENDING":
      return "Chờ điều chuyển";
    case "EXPORTED":
      return "Đã xuất xe";
    case "RECEIVED":
      return "Đã nhận xe";
    case "CANCELLED":
      return "Đã hủy điều chuyển";
    default:
      return status;
  }
};
