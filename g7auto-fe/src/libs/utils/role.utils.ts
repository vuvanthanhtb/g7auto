export const parseRoleDisplay = (role: string) => {
  switch (role) {
    case "SUPERADMIN":
      return "Quản trị viên hệ thống";
    case "ADMIN":
      return "Quản trị viên";
    case "DIRECTOR":
      return "Giám đốc";
    case "SHOWROOM_MANAGER":
      return "Quản lý showroom";
    case "SALES":
      return "Nhân viên Sale";
    case "WAREHOUSE":
      return "Kho xe";
    case "ACCOUNTANT":
      return "Kế toán";
    default:
      return "";
  }
};
