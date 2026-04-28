import {
  BTN_SUBMIT,
  BTN_DETAIL,
  BTN_SEARCH,
  BTN_REFRESH,
  BTN_EXPORT,
} from "@/libs/constants/button.constant";
import {
  BUTTON,
  NUMBER_INPUT,
  DATETIME,
  SELECT,
} from "@/libs/constants/form.constant";
import { BUTTON as TBTN, STRING } from "@/libs/constants/table.constant";
import type { IBaseFormConfig } from "@/libs/types/config-form.type";
import type { BaseTableColumn } from "@/libs/types/table.type";

export const testDriveColumns: BaseTableColumn[] = [
  { name: "customerName", label: "Khách hàng", type: STRING },
  { name: "carName", label: "Xe", type: STRING },
  { name: "showroomName", label: "Showroom", type: STRING },
  { name: "startTime", label: "Thời gian bắt đầu", type: STRING },
  { name: "status", label: "Trạng thái", type: STRING },
  {
    name: "action",
    label: "Thao tác",
    type: TBTN,
    btnGroup: [{ title: "Chi tiết", type: "button", action: BTN_DETAIL }],
  },
];

export const testDrivesFormConfig: IBaseFormConfig = {
  fields: [
    {
      type: NUMBER_INPUT,
      name: "customerId",
      label: "Mã khách hàng",
      required: true,
      size: 6,
    },
    {
      type: NUMBER_INPUT,
      name: "carId",
      label: "Mã xe",
      required: true,
      size: 6,
    },
    {
      type: NUMBER_INPUT,
      name: "showroomId",
      label: "Mã showroom",
      required: true,
      size: 6,
    },
    { type: NUMBER_INPUT, name: "employeeId", label: "Mã nhân viên", size: 6 },
    {
      type: DATETIME,
      name: "startTime",
      label: "Thời gian bắt đầu",
      required: true,
      size: 6,
    },
    { type: DATETIME, name: "endTime", label: "Thời gian kết thúc", size: 6 },
    {
      type: BUTTON,
      size: 12,
      childs: [
        { title: "Đăng ký lái thử", type: "submit", action: BTN_SUBMIT },
      ],
    },
  ],
};

export const testDrivesInitialValues = {
  customerId: "",
  carId: "",
  showroomId: "",
  employeeId: "",
  startTime: "",
  endTime: "",
};

export const testDriveSearchConfig: IBaseFormConfig = {
  fields: [
    {
      type: SELECT,
      name: "status",
      label: "Trạng thái",
      option: "testDriveStatusOptions",
      size: 3,
    },
    {
      type: BUTTON,
      size: 9,
      childs: [
        {
          title: "Làm mới",
          type: "button",
          action: BTN_REFRESH,
          style: { background: "#757575", color: "#fff" },
        },
        {
          title: "Tìm kiếm",
          type: "button",
          action: BTN_SEARCH,
          style: { background: "#1976d2", color: "#fff" },
        },
        {
          title: "Xuất Excel",
          type: "button",
          action: BTN_EXPORT,
          style: { background: "#2e7d32", color: "#fff" },
        },
      ],
    },
  ],
};
