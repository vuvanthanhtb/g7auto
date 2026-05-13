import {
  BTN_SUBMIT,
  BTN_DETAIL,
  BTN_SEARCH,
  BTN_REFRESH,
  BTN_EXPORT,
  BTN_CONFIRM,
  BTN_COMPLETE,
  BTN_CANCEL,
} from "@/libs/constants/button.constant";
import {
  BUTTON,
  NUMBER_INPUT,
  DATETIME,
  SELECT,
  TEXT,
} from "@/libs/constants/form.constant";
import {
  NUMERICAL_ORDER,
  TBL_BUTTON,
  TBL_STRING,
} from "@/libs/constants/table.constant";
import type { IBaseFormConfig } from "@/libs/types/config-form.type";
import type { BaseTableColumn } from "@/libs/types/table.type";
import type { TestDriveCreateFormValues, TestDriveDetailFormValues } from "../shell/test-drives.type";

export const getTestDriveColumns = (): BaseTableColumn[] => [
  { name: "NUMERICAL_ORDER", label: "COMMON_LABEL_STT", type: NUMERICAL_ORDER },
  { name: "customerFullName", label: "COMMON_LABEL_CUSTOMER", type: TBL_STRING },
  { name: "carChassisNumber", label: "CARS_FIELD_CHASSIS_NUMBER", type: TBL_STRING },
  { name: "showroomName", label: "COMMON_LABEL_SHOWROOM", type: TBL_STRING },
  { name: "startTime", label: "TEST_DRIVES_FIELD_START_TIME", type: TBL_STRING },
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
    { type: NUMBER_INPUT, name: "showroomId", label: "CARS_FIELD_SHOWROOM_ID", size: 6 },
    { type: NUMBER_INPUT, name: "employeeId", label: "CONTRACTS_FIELD_EMPLOYEE_ID", size: 6 },
    { type: DATETIME, name: "startTime", label: "TEST_DRIVES_FIELD_START_TIME", required: true, size: 6 },
    { type: DATETIME, name: "endTime", label: "TEST_DRIVES_FIELD_END_TIME", required: true, size: 6 },
    { type: TEXT, name: "notes", label: "CONTRACTS_FIELD_NOTES", size: 12 },
    {
      type: BUTTON,
      size: 12,
      childs: [{ title: "TEST_DRIVES_BTN_REGISTER", type: "submit", action: BTN_SUBMIT }],
    },
  ],
});

export const getTestDrivesDetailFormConfig = (): IBaseFormConfig => ({
  fields: [
    { type: TEXT, name: "notes", label: "CONTRACTS_FIELD_NOTES", size: 12 },
    {
      type: BUTTON,
      size: 12,
      childs: [
        { title: "TEST_DRIVES_BTN_CONFIRM", type: "button", action: BTN_CONFIRM, style: { background: "#1976d2", color: "#fff" } },
        { title: "TEST_DRIVES_BTN_COMPLETE", type: "button", action: BTN_COMPLETE, style: { background: "#2e7d32", color: "#fff" } },
        { title: "TEST_DRIVES_BTN_CANCEL", type: "button", action: BTN_CANCEL, style: { background: "#d32f2f", color: "#fff" } },
      ],
    },
  ],
});

export const initTestDriveSearchForm = { status: "", page: 1, size: 10 };

export const testDrivesInitialValues: TestDriveCreateFormValues = {
  customerId: "",
  carId: "",
  showroomId: "",
  employeeId: "",
  startTime: "",
  endTime: "",
  notes: "",
};

export const testDriveDetailInitialValues: TestDriveDetailFormValues = {
  notes: "",
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
