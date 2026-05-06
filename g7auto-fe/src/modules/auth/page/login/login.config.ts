import { BTN_SUBMIT } from "@/libs/constants/button.constant";
import { BUTTON, TEXT } from "@/libs/constants/form.constant";
import type { IBaseFormConfig } from "@/libs/types/config-form.type";

export const getLoginConfig = (): IBaseFormConfig => ({
  fields: [
    { type: TEXT, name: "username", label: "LOGIN_FIELD_USERNAME", required: true, size: 12 },
    { type: TEXT, name: "password", label: "LOGIN_FIELD_PASSWORD", required: true, isPassword: true, size: 12 },
    {
      type: BUTTON, size: 12,
      childs: [{ title: "COMMON_BTN_LOGIN", type: "submit", action: BTN_SUBMIT, style: { width: "100%" } }],
    },
  ],
});

export const initialValues = { username: "", password: "" };
