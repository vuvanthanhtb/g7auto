import type * as yup from "yup";
import type { ButtonProps } from "./button.type";

export type IField = {
  name?: string;
  label?: string;
  type: string;
  placeholder?: string;
  disabled?: boolean;
  size: number;
  required?: boolean;
  option?: string;
  childs?: ButtonProps[];
  isMulti?: boolean;
  isPassword?: boolean;
  inputType?: string;
  style?: React.CSSProperties;
  childFields?: IField[];
  buttonLabel?: string;
  visibleWhen?: (values: Record<string, unknown>) => boolean;
};

export type IBaseFormConfig = { fields: IField[] };

export type FormHandler = (
  values: Record<string, unknown>,
  ctx: {
    submit: () => Promise<void>;
    setFieldValue: (field: string, value: unknown) => void;
  },
) => void | boolean | Promise<void | boolean>;

export type HandlersMap = Record<string, FormHandler | any>;

export interface BaseFormComponentProps<T = Record<string, unknown>> {
  formConfig: IBaseFormConfig;
  validationSchema?: yup.AnyObjectSchema;
  onChange?: (data: T) => void;
  handleBlur?: (data: T) => void;
  values?: T;
  options?: Record<string, unknown>;
  handlers?: HandlersMap;
}
