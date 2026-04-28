import { BTN_SUBMIT, BTN_EDIT, BTN_REFRESH, BTN_EXPORT } from "@/libs/constants/button.constant";
import { BUTTON, NUMBER_INPUT, TEXT, DATE } from "@/libs/constants/form.constant";
import { BUTTON as TBTN, STRING } from "@/libs/constants/table.constant";
import type { IBaseFormConfig } from "@/libs/types/config-form.type";
import type { BaseTableColumn } from "@/libs/types/table.type";

export const serviceHistoryColumns: BaseTableColumn[] = [
  { name: "carName", label: "Xe", type: STRING },
  { name: "serviceType", label: "Loại dịch vụ", type: STRING },
  { name: "showroomName", label: "Showroom", type: STRING },
  { name: "cost", label: "Chi phí", type: STRING },
  { name: "serviceDate", label: "Ngày thực hiện", type: STRING },
  { name: "action", label: "Thao tác", type: TBTN, btnGroup: [{ title: "Sửa", type: "button", action: BTN_EDIT }] },
];

export const serviceHistoryFormConfig: IBaseFormConfig = {
  fields: [
    { type: NUMBER_INPUT, name: "carId", label: "Mã xe", required: true, size: 6 },
    { type: NUMBER_INPUT, name: "showroomId", label: "Mã showroom", required: true, size: 6 },
    { type: NUMBER_INPUT, name: "employeeId", label: "Mã nhân viên", size: 6 },
    { type: TEXT, name: "serviceType", label: "Loại dịch vụ", required: true, size: 6 },
    { type: TEXT, name: "description", label: "Mô tả", size: 12 },
    { type: NUMBER_INPUT, name: "cost", label: "Chi phí (VND)", size: 6 },
    { type: DATE, name: "serviceDate", label: "Ngày thực hiện", size: 6 },
    { type: BUTTON, size: 12, childs: [{ title: "Lưu", type: "submit", action: BTN_SUBMIT }] },
  ],
};

export const serviceHistoryInitialValues = { carId: "", showroomId: "", employeeId: "", serviceType: "", description: "", cost: "", serviceDate: "" };

export const serviceHistorySearchConfig: IBaseFormConfig = {
  fields: [
    {
      type: BUTTON, size: 12,
      childs: [
        { title: "Làm mới", type: "button", action: BTN_REFRESH, style: { background: "#757575", color: "#fff" } },
        { title: "Xuất Excel", type: "button", action: BTN_EXPORT, style: { background: "#2e7d32", color: "#fff" } },
      ],
    },
  ],
};
