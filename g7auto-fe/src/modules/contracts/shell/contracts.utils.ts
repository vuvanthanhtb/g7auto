export const parseContractStatus = (status: string) => {
  switch (status) {
    case "NEW":
      return "Hợp đồng mới";
    case "IN_PAYMENT":
      return "Đang thanh toán";
    case "COMPLETED":
      return "Hoàn tất hợp đồng";
    case "CANCELLED":
      return "Đã hủy hợp đồng";
    default:
      return "";
  }
};
