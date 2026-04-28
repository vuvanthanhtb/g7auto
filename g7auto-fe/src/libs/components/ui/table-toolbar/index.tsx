import BaseFormComponent from "@/libs/components/ui/base-form";
import { BUTTON, SELECT, TEXT } from "@/libs/constants/form.constant";
import type { IField } from "@/libs/types/config-form.type";

const BTN_SEARCH = "search";
const BTN_REFRESH = "refresh";
const BTN_EXPORT = "export";

export type SearchField =
  | { key: string; label: string; type: "text"; size?: number }
  | { key: string; label: string; type: "select"; optionKey: string; size?: number };

type Props = {
  fields?: SearchField[];
  options?: Record<string, unknown>;
  onSearch?: (values: Record<string, unknown>) => void;
  onRefresh: () => void;
  onExport?: () => void;
};

const TableToolbar = ({ fields = [], options, onSearch, onRefresh, onExport }: Props) => {
  const inputFields: IField[] = fields.map((f) => ({
    name: f.key,
    label: f.label,
    type: f.type === "select" ? SELECT : TEXT,
    option: f.type === "select" ? f.optionKey : undefined,
    size: f.size ?? 3,
  }));

  const buttons = [
    { title: "Tìm kiếm", type: "button" as const, action: BTN_SEARCH, style: { background: "#1976d2", color: "#fff" } },
    { title: "Làm mới", type: "button" as const, action: BTN_REFRESH, style: { background: "#757575", color: "#fff" } },
    ...(onExport
      ? [{ title: "Xuất Excel", type: "button" as const, action: BTN_EXPORT, style: { background: "#2e7d32", color: "#fff" } }]
      : []),
  ];

  const formConfig = {
    fields: [
      ...inputFields,
      {
        type: BUTTON,
        size: 12,
        childs: buttons,
        style: { display: "flex", alignItems: "flex-end", paddingBottom: "4px" },
      } as IField,
    ],
  };

  const normalize = (values: Record<string, unknown>): Record<string, unknown> => {
    const result: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(values)) {
      if (v !== null && typeof v === "object" && "value" in v) {
        result[k] = (v as { value: unknown }).value;
      } else {
        result[k] = v;
      }
    }
    return result;
  };

  const handlers = {
    [BTN_SEARCH]: (values: Record<string, unknown>) => {
      onSearch?.(normalize(values));
    },
    [BTN_REFRESH]: () => {
      onRefresh();
    },
    [BTN_EXPORT]: async () => {
      await onExport?.();
    },
  };

  return (
    <BaseFormComponent
      formConfig={formConfig}
      options={options}
      handlers={handlers}
    />
  );
};

export default TableToolbar;
