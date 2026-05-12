# G7 Auto Frontend - Hệ thống Quản lý Showroom Ô tô

Ứng dụng Frontend của hệ thống G7 Auto được xây dựng bằng **React**, **TypeScript** và **Vite**. Hệ thống cung cấp giao diện quản lý hiện đại, mượt mà cho các nghiệp vụ tại showroom ô tô.

## 🚀 Công nghệ sử dụng

- **Core**: React 18
- **Build Tool**: Vite
- **Language**: TypeScript
- **State Management**: Redux Toolkit & Redux Persist
- **UI Framework**: Material UI (MUI) v7 & React Bootstrap 5
- **Styling**: SCSS (Sass)
- **Form Management**: Formik & Yup
- **API Client**: Axios
- **Routing**: React Router DOM v7

## 📋 Yêu cầu hệ thống

- **Node.js**: Phiên bản 18.x trở lên
- **npm**: Phiên bản 9.x trở lên (hoặc yarn/pnpm tương đương)

## 🛠 Hướng dẫn cài đặt và sử dụng

### 1. Cài đặt Dependencies

Mở terminal tại thư mục `g7auto-fe` và chạy lệnh:

```bash
npm install
```

### 2. Cấu hình Biến môi trường

Tạo file `.env` tại thư mục gốc của frontend (tham khảo `.env.example` nếu có):

```env
VITE_API_URL=http://localhost:8080/api
```

### 3. Chạy ứng dụng ở chế độ Phát triển (Development)

```bash
npm run dev
```

Ứng dụng sẽ chạy tại địa chỉ mặc định: [http://localhost:5173](http://localhost:5173)

### 4. Kiểm tra lỗi (Linting)

```bash
npm run lint
```

### 5. Xây dựng bản sản phẩm (Build for Production)

```bash
npm run build
```

Kết quả sẽ nằm trong thư mục `dist/`.

## 📂 Cấu trúc thư mục

```text
src/
├── libs/           # Các thành phần dùng chung (UI components, utils, constants, i18n)
├── modules/        # Các module nghiệp vụ (auth, cars, customers, contracts...)
│   ├── [module]/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── shell/  # Route config cho module
├── shell/          # Cấu hình lõi (Redux store, main router, middleware)
├── styles/         # Global styles, variables, mixins
└── main.tsx        # Entry point của ứng dụng
```

## 🔐 Tài khoản dùng thử (Dữ liệu mặc định)

Bạn có thể đăng nhập bằng các tài khoản sau (Mật khẩu mặc định: `password`):

- **Admin**: `admin` (Toàn quyền hệ thống)
- **Sales**: `saleshn` (Quản lý khách hàng, báo giá, hợp đồng)
- **Kho**: `khohn` (Quản lý xe, điều chuyển kho)
- **Kế toán**: `ketoanhn` (Xác nhận thanh toán, theo dõi công nợ)

---
*Phát triển bởi Vũ Văn Thanh - Dự án G7 Auto.*
