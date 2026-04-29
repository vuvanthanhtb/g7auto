import {
  ACTIVE,
  APPROVED,
  INACTIVE,
  LOCK,
  LOCKED,
  REJECTED,
  UNLOCK,
} from "@/libs/constants";

export const getAccountStatusDisplay = (status: string) => {
  switch (status) {
    case ACTIVE:
      return "Đang hoạt động";
    case INACTIVE:
      return "Ngừng hoạt động";
    case LOCKED:
      return "Đã khóa";
    default:
      return status;
  }
};

export const getActionDisplay = (status: string) => {
  switch (status) {
    case ACTIVE:
      return "Kích hoạt";
    case INACTIVE:
      return "Ngừng hoạt động";
    case LOCK:
      return "Khóa tài khoản";
    case UNLOCK:
      return "Mở khóa tài khoản";
    default:
      return status;
  }
};

export const getAccountApprovalStatusDisplay = (status: string) => {
  switch (status) {
    case APPROVED:
      return "Đã duyệt";
    case REJECTED:
      return "Đã từ chối";
    default:
      return status;
  }
};
