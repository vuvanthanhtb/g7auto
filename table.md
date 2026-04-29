# Kế hoạch nâng cấp BaseTableComponent với Generic Type

Tài liệu này mô tả kế hoạch cải tiến `BaseTableComponent` để hỗ trợ Generic Type, giúp tăng tính an toàn về kiểu (Type safety) và cải thiện trải nghiệm lập trình (IntelliSense).

## 1. Mục tiêu
- Loại bỏ việc sử dụng `Record<string, unknown>` (TableRow).
- Ràng buộc các thuộc tính trong `tableConfig` phải tồn tại trong Model dữ liệu.
- Cung cấp kiểu dữ liệu chính xác cho các hàm callback (`handleCellAction`, `showButton`, `isRowSelectable`).

## 2. Các bước thực hiện

### Bước 1: Cập nhật `g7auto-fe/src/libs/types/table.type.ts`
Chuyển đổi các Interface hiện tại sang dạng Generic.

```typescript
export interface BaseTableColumn<T = any> {
  name: keyof T | string; // Ưu tiên các key từ T
  label: string;
  type: string;
  style?: React.CSSProperties;
  styleCell?: React.CSSProperties;
  colorCustom?: Record<string, string>;
  btnGroup?: ButtonProps[];
  refColor?: string[];
}

export interface BaseTableConfig<T = any> {
  content: T[];
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
}
```

### Bước 2: Cập nhật `g7auto-fe/src/libs/components/ui/base-table/index.tsx`
Chuyển đổi component sang Generic Function.

```typescript
// Định nghĩa Props mới với Generic T
interface BaseTableProps<T> {
  tableConfig: BaseTableColumn<T>[];
  btnGroup?: ButtonProps[];
  reducer: keyof RootState;
  state: string;
  handleCellAction?: (row: T, key?: string) => void;
  handlePageChange?: (page: number) => void;
  handlers?: Record<string, (e?: React.MouseEvent) => void>;
  showButton?: (refShow: string[], action: string, row: T) => boolean;
  colorCell?: (refColor: string[], row: T) => string;
  btnGroupClassName?: string;
  onSelectionChange?: (ids: string[]) => void;
  isRowSelectable?: (row: T) => boolean;
}

// Chuyển component sang Generic Function
const BaseTableComponent = <T extends Record<string, any>>(props: BaseTableProps<T>) => {
    // ... code xử lý bên trong sẽ sử dụng T thay cho TableRow
}
```

## 3. Ví dụ sử dụng (Sau khi nâng cấp)

Khi sử dụng Table cho danh sách nhân viên (`Employee`):

```tsx
interface Employee {
  id: string;
  fullName: string;
  email: string;
  status: string;
}

const EmployeeTable = () => {
  return (
    <BaseTableComponent<Employee>
      tableConfig={[
        { name: "fullName", label: "Họ tên", type: TBL_STRING }, // "fullName" sẽ được IDE gợi ý
        { name: "email", label: "Email", type: TBL_STRING },
      ]}
      handleCellAction={(row) => {
        // row sẽ có kiểu Employee. Có thể truy cập row.email trực tiếp.
        console.log(row.email);
      }}
      reducer="employees"
      state="list"
    />
  );
};
```

## 4. Lợi ích
1. **Phát hiện lỗi sớm:** Nếu `name` trong `tableConfig` không khớp với trường nào trong Model, TypeScript sẽ báo lỗi ngay lúc code.
2. **Gợi ý mã (IntelliSense):** Tự động gợi ý các trường dữ liệu khi viết hàm xử lý logic cho dòng (row).
3. **Mã nguồn sạch hơn:** Không cần ép kiểu `(row as any)` hay sử dụng `row['field_name']`.
