export const parseCarStatus = (status: string) => {
  switch (status) {
    case "NEW_ARRIVAL":
      return "Xe mới về";
    case "AVAILABLE":
      return "Sẵn sàng bán";
    case "DEPOSITED":
      return "Đã đặt cọc";
    case "IN_TRANSFER":
      return "Đang vận chuyển";
    case "SOLD":
      return "Đã bán";
    case "DEMO":
      return "Xe chạy thử";
    case "DISCONTINUED":
      return "Ngừng kinh doanh";
    default:
      return status;
  }
};
