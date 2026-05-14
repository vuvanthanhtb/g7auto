export const parseTestDriveStatus = (status: string): string => {
  switch (status) {
    case "PENDING":
      return "Chờ xác nhận";
    case "CONFIRMED":
      return "Đã xác nhận";
    case "COMPLETED":
      return "Đã hoàn thành lái thử";
    case "CANCELLED":
      return "Đã hủy lịch lái thử";
    default:
      return status;
  }
};
