import {
  BTN_SUBMIT,
  BTN_EDIT,
  BTN_REFRESH,
  BTN_EXPORT,
} from "@/libs/constants/button.constant";
import {
  BUTTON,
  NUMBER_INPUT,
  TEXT,
  DATE,
} from "@/libs/constants/form.constant";
import {
  NUMERICAL_ORDER,
  TBL_BUTTON,
  TBL_STRING,
} from "@/libs/constants/table.constant";
import type { IBaseFormConfig } from "@/libs/types/config-form.type";
import type { BaseTableColumn } from "@/libs/types/table.type";

export const getServiceHistoryColumns = (): BaseTableColumn[] => [
  { name: "NUMERICAL_ORDER", label: "COMMON_LABEL_STT", type: NUMERICAL_ORDER },
  { name: "carName", label: "COMMON_LABEL_CAR", type: TBL_STRING },
  { name: "serviceType", label: "COMMON_LABEL_SERVICE_TYPE", type: TBL_STRING },
  { name: "showroomName", label: "COMMON_LABEL_SHOWROOM", type: TBL_STRING },
  { name: "cost", label: "COMMON_LABEL_COST", type: TBL_STRING },
  { name: "serviceDate", label: "COMMON_LABEL_SERVICE_DATE", type: TBL_STRING },
  {
    name: "action",
    label: "COMMON_LABEL_ACTION",
    type: TBL_BUTTON,
    btnGroup: [{ title: "COMMON_BTN_EDIT", type: "button", action: BTN_EDIT }],
  },
];

export const getServiceHistoryFormConfig = (): IBaseFormConfig => ({
  fields: [
    { type: NUMBER_INPUT, name: "carId", label: "CONTRACTS_FIELD_CAR_ID", required: true, size: 6 },
    { type: NUMBER_INPUT, name: "showroomId", label: "CARS_FIELD_SHOWROOM_ID", required: true, size: 6 },
    { type: NUMBER_INPUT, name: "employeeId", label: "CONTRACTS_FIELD_EMPLOYEE_ID", size: 6 },
    { type: TEXT, name: "serviceType", label: "SERVICE_HISTORY_FIELD_TYPE", required: true, size: 6 },
    { type: TEXT, name: "description", label: "CAR_MODELS_FIELD_DESCRIPTION", size: 12 },
    { type: NUMBER_INPUT, name: "cost", label: "SERVICE_HISTORY_FIELD_COST", size: 6 },
    { type: DATE, name: "serviceDate", label: "SERVICE_HISTORY_FIELD_DATE", size: 6 },
    {
      type: BUTTON,
      size: 12,
      childs: [{ title: "COMMON_BTN_SAVE", type: "submit", action: BTN_SUBMIT }],
    },
  ],
});

export const serviceHistoryInitialValues = {
  carId: "",
  showroomId: "",
  employeeId: "",
  serviceType: "",
  description: "",
  cost: "",
  serviceDate: "",
};

export const getServiceHistorySearchConfig = (): IBaseFormConfig => ({
  fields: [
    {
      type: BUTTON,
      size: 12,
      childs: [
        { title: "COMMON_BTN_REFRESH", type: "button", action: BTN_REFRESH, style: { background: "#757575", color: "#fff" } },
        { title: "COMMON_BTN_EXPORT", type: "button", action: BTN_EXPORT, style: { background: "#2e7d32", color: "#fff" } },
      ],
    },
  ],
});
