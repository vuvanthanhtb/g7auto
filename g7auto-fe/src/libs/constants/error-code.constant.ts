export const SUCCESS_CODE = {
  LOGIN: "Đăng nhập thành công.",
  LOGOUT: "Đăng xuất thành công.",
  CREATE: "Tạo mới thành công.",
  UPDATE: "Cập nhật thành công.",
  DELETE: "Xóa thành công.",
  ACTION: "Thao tác thành công.",
};

export const ERROR_MESSAGE_MAP: Record<string, string> = {};

export const formatMessage = (msg: string): string => ERROR_MESSAGE_MAP[msg] ?? msg;
