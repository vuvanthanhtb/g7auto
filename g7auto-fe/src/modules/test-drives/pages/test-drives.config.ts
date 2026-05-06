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
import {
  NUMERICAL_ORDER,
  TBL_BUTTON,
  TBL_STRING,
} from "@/libs/constants/table.constant";
import type { IBaseFormConfig } from "@/libs/types/config-form.type";
import type { BaseTableColumn } from "@/libs/types/table.type";

export const getTestDriveColumns = (): BaseTableColumn[] => [
  { name: "NUMERICAL_ORDER", label: "COMMON_LABEL_STT", type: NUMERICAL_ORDER },
  { name: "customerName", label: "COMMON_LABEL_CUSTOMER", type: TBL_STRING },
  { name: "carName", label: "COMMON_LABEL_CAR", type: TBL_STRING },
  { name: "showroomName", label: "COMMON_LABEL_SHOWROOM", type: TBL_STRING },
  { name: "startTime", label: "COMMON_LABEL_START_TIME", type: TBL_STRING },
  { name: "status", label: "COMMON_LABEL_STATUS", type: TBL_STRING },
  {
    name: "action",
    label: "COMMON_LABEL_ACTION",
    type: TBL_BUTTON,
    btnGroup: [{ title: "COMMON_BTN_DETAIL", type: "button", action: BTN_DETAIL }],
  },
];

export const getTestDrivesFormConfig = (): IBaseFormConfig => ({
  fields: [
    { type: NUMBER_INPUT, name: "customerId", label: "CONTRACTS_FIELD_CUSTOMER_ID", required: true, size: 6 },
    { type: NUMBER_INPUT, name: "carId", label: "CONTRACTS_FIELD_CAR_ID", required: true, size: 6 },
    { type: NUMBER_INPUT, name: "showroomId", label: "CARS_FIELD_SHOWROOM_ID", required: true, size: 6 },
    { type: NUMBER_INPUT, name: "employeeId", label: "CONTRACTS_FIELD_EMPLOYEE_ID", size: 6 },
    { type: DATETIME, name: "startTime", label: "TEST_DRIVES_FIELD_START_TIME", required: true, size: 6 },
    { type: DATETIME, name: "endTime", label: "TEST_DRIVES_FIELD_END_TIME", size: 6 },
    {
      type: BUTTON,
      size: 12,
      childs: [{ title: "TEST_DRIVES_BTN_REGISTER", type: "submit", action: BTN_SUBMIT }],
    },
  ],
});

export const testDrivesInitialValues = {
  customerId: "",
  carId: "",
  showroomId: "",
  employeeId: "",
  startTime: "",
  endTime: "",
};

export const getTestDriveSearchConfig = (): IBaseFormConfig => ({
  fields: [
    { type: SELECT, name: "status", label: "COMMON_LABEL_STATUS", option: "testDriveStatusOptions", size: 3 },
    {
      type: BUTTON,
      size: 9,
      childs: [
        { title: "COMMON_BTN_REFRESH", type: "button", action: BTN_REFRESH, style: { background: "#757575", color: "#fff" } },
        { title: "COMMON_BTN_SEARCH", type: "button", action: BTN_SEARCH, style: { background: "#1976d2", color: "#fff" } },
        { title: "COMMON_BTN_EXPORT", type: "button", action: BTN_EXPORT, style: { background: "#2e7d32", color: "#fff" } },
      ],
    },
  ],
});
