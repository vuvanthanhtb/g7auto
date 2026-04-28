import {
  SUPERADMIN,
  ADMIN,
  DIRECTOR,
  SHOWROOM_MANAGER,
  SALES,
  WAREHOUSE,
  ACCOUNTANT,
} from "./roles.constant";
import {
  ACTIVE,
  INACTIVE,
  LOCKED,
  NEW_ARRIVAL,
  AVAILABLE,
  DEPOSITED,
  IN_TRANSFER,
  SOLD,
  DEMO,
  DISCONTINUED,
  HOLDING,
  CONVERTED,
  REFUNDED,
  CANCELLED,
  PENDING,
  CONFIRMED,
  COMPLETED,
  DRAFT,
  SENT,
  ACCEPTED,
  NEW,
  IN_PAYMENT,
  EXPORTED,
  RECEIVED,
  LEAVED,
  STOPPED,
  APPROVED,
  REJECTED,
} from "./status.constant";

export const defaultSelectOption = { label: "Tất cả", value: "" };

export const roleOptions = [
  { label: "Super Admin", value: SUPERADMIN },
  { label: "Quản trị viên", value: ADMIN },
  { label: "Giám đốc", value: DIRECTOR },
  { label: "Quản lý showroom", value: SHOWROOM_MANAGER },
  { label: "Nhân viên Sale", value: SALES },
  { label: "Kho xe", value: WAREHOUSE },
  { label: "Kế toán", value: ACCOUNTANT },
];

export const accountStatusOptions = [
  { label: "Hoạt động", value: ACTIVE },
  { label: "Không hoạt động", value: INACTIVE },
  { label: "Đã khóa", value: LOCKED },
];

export const carStatusOptions = [
  { label: "Xe mới về", value: NEW_ARRIVAL },
  { label: "Có sẵn", value: AVAILABLE },
  { label: "Đã đặt cọc", value: DEPOSITED },
  { label: "Đang điều chuyển", value: IN_TRANSFER },
  { label: "Đã bán", value: SOLD },
  { label: "Xe demo", value: DEMO },
  { label: "Ngừng kinh doanh", value: DISCONTINUED },
];

export const showroomStatusOptions = [
  { label: "Hoạt động", value: ACTIVE },
  { label: "Không hoạt động", value: INACTIVE },
];

export const depositStatusOptions = [
  { label: "Đang giữ xe", value: HOLDING },
  { label: "Đã chuyển hợp đồng", value: CONVERTED },
  { label: "Đã hoàn cọc", value: REFUNDED },
  { label: "Đã hủy", value: CANCELLED },
];

export const contractStatusOptions = [
  { label: "Mới", value: NEW },
  { label: "Đang thanh toán", value: IN_PAYMENT },
  { label: "Hoàn thành", value: COMPLETED },
  { label: "Đã hủy", value: CANCELLED },
];

export const quotationStatusOptions = [
  { label: "Nháp", value: DRAFT },
  { label: "Đã gửi", value: SENT },
  { label: "Đã chấp nhận", value: ACCEPTED },
  { label: "Đã hủy", value: CANCELLED },
];

export const testDriveStatusOptions = [
  { label: "Chờ xác nhận", value: PENDING },
  { label: "Đã xác nhận", value: CONFIRMED },
  { label: "Hoàn thành", value: COMPLETED },
  { label: "Đã hủy", value: CANCELLED },
];

export const transferStatusOptions = [
  { label: "Chờ xử lý", value: PENDING },
  { label: "Đã xuất kho", value: EXPORTED },
  { label: "Đã nhận xe", value: RECEIVED },
  { label: "Đã hủy", value: CANCELLED },
];

export const employeeStatusOptions = [
  { label: "Đang làm", value: ACTIVE },
  { label: "Đã nghỉ", value: LEAVED },
];

export const carModelStatusOptions = [
  { label: "Đang bán", value: ACTIVE },
  { label: "Ngừng bán", value: STOPPED },
];

export const paymentMethodOptions = [
  { label: "Tiền mặt", value: "CASH" },
  { label: "Chuyển khoản", value: "BANK_TRANSFER" },
  { label: "Thẻ tín dụng", value: "CREDIT_CARD" },
  { label: "Vay ngân hàng", value: "BANK_LOAN" },
];

export const depositPaymentMethodOptions = [
  { label: "Tiền mặt", value: "CASH" },
  { label: "Chuyển khoản", value: "BANK_TRANSFER" },
];

export const contactTypeOptions = [
  { label: "Gọi điện", value: "CALL" },
  { label: "Email", value: "EMAIL" },
  { label: "Gặp trực tiếp", value: "MEETING" },
  { label: "Zalo/Message", value: "MESSAGE" },
];

export const userApproveActionOptions = [
  { label: "Tạo mới", value: "CREATE" },
  { label: "Cập nhật", value: "UPDATE" },
  { label: "Xóa", value: "DELETE" },
];

export const userApproveStatusOptions = [
  { label: "Chờ duyệt", value: PENDING },
  { label: "Đã duyệt", value: APPROVED },
  { label: "Từ chối", value: REJECTED },
];

export const carTransferStatusOptions = [
  { label: "Chờ xuất kho", value: PENDING },
  { label: "Đã xuất kho", value: EXPORTED },
  { label: "Đã nhận", value: RECEIVED },
  { label: "Đã hủy", value: CANCELLED },
];
