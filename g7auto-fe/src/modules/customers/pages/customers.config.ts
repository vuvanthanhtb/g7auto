import {
  BTN_SUBMIT,
  BTN_EDIT,
  BTN_DELETE,
  BTN_SEARCH,
  BTN_REFRESH,
  BTN_EXPORT,
} from "@/libs/constants/button.constant";
import { BUTTON, TEXT, DATE, TEXTAREA } from "@/libs/constants/form.constant";
import {
  TBL_STRING,
  TBL_BUTTON,
  NUMERICAL_ORDER,
} from "@/libs/constants/table.constant";
import type { IBaseFormConfig } from "@/libs/types/config-form.type";
import type { BaseTableColumn } from "@/libs/types/table.type";
import type {
  CustomerFormValues,
  CustomerSearchForm,
} from "../shell/customers.type";
import { getDateBefore } from "@/libs/utils";

export const customerCreateInitialValues: CustomerFormValues = {
  fullName: "",
  phone: "",
  email: "",
  nationalId: "",
  address: "",
  birthDate: "",
  sourceType: "",
  carInterest: "",
  notes: "",
};

export const getCustomerColumns = (): BaseTableColumn[] => [
  { name: "NUMERICAL_ORDER", label: "COMMON_LABEL_STT", type: NUMERICAL_ORDER },
  { name: "fullName", label: "COMMON_LABEL_FULL_NAME", type: TBL_STRING },
  {
    name: "phoneDisplay",
    label: "COMMON_LABEL_PHONE",
    type: TBL_STRING,
    styleCell: { textAlign: "center" },
  },
  { name: "email", label: "COMMON_LABEL_EMAIL", type: TBL_STRING },
  {
    name: "nationalId",
    label: "CUSTOMERS_FIELD_NATIONAL_ID",
    type: TBL_STRING,
    styleCell: { textAlign: "center" },
  },
  {
    name: "assignedEmployeeName",
    label: "CUSTOMERS_FIELD_ASSIGNED_EMPLOYEE",
    type: TBL_STRING,
  },
  {
    name: "action",
    label: "COMMON_LABEL_ACTION",
    type: TBL_BUTTON,
    styleCell: { justifyContent: "center" },
    btnGroup: [
      { title: "COMMON_BTN_EDIT", type: "button", action: BTN_EDIT },
      {
        title: "COMMON_BTN_DELETE",
        type: "button",
        action: BTN_DELETE,
        style: { background: "#d32f2f", color: "#fff" },
      },
    ],
  },
];

export const getCustomerFormConfig = (): IBaseFormConfig => ({
  fields: [
    {
      type: TEXT,
      name: "fullName",
      label: "COMMON_LABEL_FULL_NAME",
      required: true,
      size: 12,
    },
    {
      type: TEXT,
      name: "phone",
      label: "CUSTOMERS_FIELD_PHONE",
      required: true,
      size: 6,
    },
    { type: TEXT, name: "email", label: "COMMON_LABEL_EMAIL", size: 6 },
    {
      type: TEXT,
      name: "nationalId",
      label: "CUSTOMERS_FIELD_NATIONAL_ID",
      size: 6,
    },
    {
      type: DATE,
      name: "birthDate",
      label: "CUSTOMERS_FIELD_BIRTH_DATE",
      size: 6,
    },
    { type: TEXT, name: "address", label: "CUSTOMERS_FIELD_ADDRESS", size: 12 },
    {
      type: TEXT,
      name: "sourceType",
      label: "CUSTOMERS_FIELD_SOURCE_TYPE",
      size: 6,
    },
    {
      type: TEXT,
      name: "carInterest",
      label: "CUSTOMERS_FIELD_CAR_INTEREST",
      size: 6,
    },
    { type: TEXTAREA, name: "notes", label: "CUSTOMERS_FIELD_NOTES", size: 12 },
    {
      type: BUTTON,
      size: 12,
      childs: [
        { title: "COMMON_BTN_SAVE", type: "submit", action: BTN_SUBMIT },
      ],
    },
  ],
});

export const getCustomerSearchConfig = (): IBaseFormConfig => ({
  fields: [
    {
      type: TEXT,
      name: "fullName",
      label: "CUSTOMERS_FIELD_FULL_NAME_SEARCH",
      size: 3,
    },
    { type: TEXT, name: "phone", label: "CUSTOMERS_FIELD_PHONE", size: 3 },
    { type: TEXT, name: "email", label: "COMMON_LABEL_EMAIL", size: 3 },
    {
      type: TEXT,
      name: "nationalId",
      label: "CUSTOMERS_FIELD_NATIONAL_ID",
      size: 3,
    },
    {
      type: DATE,
      name: "fromDate",
      label: "COMMON_LABEL_FROM_DATE",
      size: 3,
    },
    { type: DATE, name: "toDate", label: "COMMON_LABEL_TO_DATE", size: 3 },
    {
      type: BUTTON,
      size: 12,
      childs: [
        {
          title: "COMMON_BTN_REFRESH",
          type: "button",
          action: BTN_REFRESH,
          style: { background: "#757575", color: "#fff" },
        },
        {
          title: "COMMON_BTN_SEARCH",
          type: "button",
          action: BTN_SEARCH,
          style: { background: "#1976d2", color: "#fff" },
        },
        {
          title: "COMMON_BTN_EXPORT",
          type: "button",
          action: BTN_EXPORT,
          style: { background: "#2e7d32", color: "#fff" },
        },
      ],
    },
  ],
});

export const initCustomerSearchForm: CustomerSearchForm = {
  fullName: "",
  phone: "",
  email: "",
  nationalId: "",
  fromDate: getDateBefore(),
  toDate: new Date(),
  page: 1,
  size: 10,
};
