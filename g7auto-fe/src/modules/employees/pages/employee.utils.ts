import { ACTIVE, CREATE, DELETE, LEAVED, UPDATE } from "@/libs/constants";

export const parseEmployeeStatusDisplay = (data: string) => {
  switch (data) {
    case ACTIVE:
      return "Hoạt động";
    case LEAVED:
      return "Đã nghỉ";
    default:
      return "";
  }
};

export const parseActionDisplay = (action: string) => {
  switch (action) {
    case CREATE:
      return "Thêm mới";
    case UPDATE:
      return "Cập nhật";
    case DELETE:
      return "Xóa";
    default:
      return "Không xác định";
  }
};
