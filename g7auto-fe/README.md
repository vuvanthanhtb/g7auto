# G7Auto Frontend

Dự án quản lý hệ thống G7Auto được xây dựng với React, TypeScript và Vite.

## 🛠 Công nghệ sử dụng (Tech Stack)

- **Framework**: React 18
- **Build Tool**: Vite
- **Language**: TypeScript
- **State Management**: Redux Toolkit, Redux Persist
- **UI Library**: Material UI (MUI) v7, Bootstrap 5, Lucide Icons, React Icons
- **Form Management**: Formik & Yup
- **Routing**: React Router Dom v7
- **Networking**: Axios
- **Styling**: SASS (SCSS)
- **Utilities**: Dayjs, File-saver, React Toastify

## 📂 Cấu trúc dự án (Project Structure)

Dự án được tổ chức theo hướng module hóa (Modular Architecture), tách biệt giữa logic nghiệp vụ và giao diện.

```text
src/
├── assets/             # Hình ảnh, font và các tài liệu tĩnh
├── libs/               # Các tài nguyên dùng chung cho toàn dự án
│   ├── components/     # UI components dùng chung (layout, ui kit)
│   │   ├── layout/     # Header, Sidebar, Footer...
│   │   └── ui/         # Base components (Table, Form, Modal, Button...)
│   ├── constants/      # Các hằng số định nghĩa (status, roles, options...)
│   ├── interceptor/    # Cấu hình Axios, Auth Interceptor, Token Service
│   ├── pages/          # Các trang hệ thống cơ bản (404, Loading)
│   ├── types/          # Định nghĩa kiểu dữ liệu TypeScript dùng chung
│   └── utils/          # Các hàm tiện ích (date, format...)
├── modules/            # Chứa các module nghiệp vụ của hệ thống
│   ├── auth/           # Quản lý đăng nhập, xác thực
│   ├── accounts/       # Quản lý tài khoản
│   ├── cars/           # Quản lý xe
│   ├── customers/      # Quản lý khách hàng
│   ├── ...             # Các module khác (contracts, employees, showrooms...)
│   │   ├── pages/      # Các component giao diện của module
│   │   └── shell/      # Logic nghiệp vụ (services, slices, routes, types)
├── shell/              # Cấu hình chính của ứng dụng
│   ├── redux/          # Cấu hình Redux store, middleware
│   ├── route/          # Cấu hình Routing tập trung (private, public routes)
│   └── app.tsx         # Entry point component (Providers setup)
├── styles/             # Cấu hình SCSS toàn cục (variables, mixins, base styles)
└── main.tsx            # File khởi tạo ứng dụng
```

### Chi tiết cấu trúc một Module

Mỗi module trong `src/modules` thường bao gồm:
- **pages/**: Chứa các màn hình (Index, Detail, Form) và cấu hình validation/config cho trang đó.
- **shell/**:
    - `*.service.ts`: Xử lý gọi API và logic nghiệp vụ.
    - `*.slice.ts`: Quản lý state của module bằng Redux Toolkit.
    - `*.route.tsx`: Định nghĩa các route thuộc module.
    - `*.type.ts`: Định nghĩa interface/type cho dữ liệu của module.
    - `*.endpoint.ts`: Danh sách các API endpoints.

## 🚀 Hướng dẫn phát triển

### Cài đặt
```bash
npm install
```

### Chạy ở chế độ Development
```bash
npm run dev
```

### Build Production
```bash
npm run build
```

## 📝 Đánh giá Code (Code Review)

- **Kiến trúc**: Cấu trúc module rõ ràng, giúp dễ dàng mở rộng và bảo trì. Việc tách biệt `shell` (logic) và `pages` (view) tuân thủ tốt nguyên lý Separation of Concerns.
- **UI/UX**: Sử dụng các component cơ sở (`base-table`, `base-form`) giúp đồng bộ hóa giao diện và giảm thiểu code lặp.
- **State Management**: Sử dụng Redux Toolkit là lựa chọn hiện đại, kết hợp với Redux Persist giúp duy trì trạng thái khi refresh trang.
- **Networking**: Hệ thống Interceptor xử lý tốt việc tự động đính kèm Token và cơ chế Refresh Token khi hết hạn (401 error).
- **Type Safety**: Sử dụng TypeScript triệt để giúp giảm thiểu lỗi runtime và tăng tốc độ phát triển.
