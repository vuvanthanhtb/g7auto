# G7 Auto - Hệ thống Quản lý Showroom Ô tô

G7 Auto là một nền tảng quản lý toàn diện dành cho các showroom ô tô, giúp tối ưu hóa quy trình bán hàng, quản lý kho xe, chăm sóc khách hàng và theo dõi lịch sử dịch vụ.

## 🚀 Công nghệ sử dụng

### Backend (g7auto-be)
- **Ngôn ngữ:** Java 21
- **Framework:** Spring Boot 4.0.4
- **Cơ sở dữ liệu:** PostgreSQL
- **Kiến trúc:** Multi-module (API, Application, Domain, Infrastructure, Core, Start)
- **Thư viện chính:**
  - Spring Data JPA
  - Spring Security (JWT)
  - MapStruct (Mapping objects)
  - Lombok
  - SpringDoc OpenAPI (Swagger UI tại /swagger-ui.html)
  - Apache POI (Xử lý Excel)

### Frontend (g7auto-fe)
- **Framework:** React 18 (Vite)
- **Ngôn ngữ:** TypeScript
- **Quản lý trạng thái:** Redux Toolkit & Redux Persist
- **UI Framework:** Material UI (MUI) & React Bootstrap
- **Styling:** SCSS (Sass), Emotion
- **Thư viện chính:**
  - Axios (HTTP Client)
  - Formik & Yup (Quản lý form & Validation)
  - React Router DOM (Routing)
  - React Toastify (Thông báo)
  - Lucide React & React Icons (Icons)

## 📦 Cấu trúc dự án

```text
g7auto/
├── g7auto-be/          # Mã nguồn Backend (Spring Boot)
│   ├── g7auto-api/     # Cung cấp các giao diện API
│   ├── g7auto-app/      # Logic nghiệp vụ ứng dụng
│   ├── g7auto-core/    # Các thành phần dùng chung
│   ├── g7auto-domain/  # Domain entities và repository interfaces
│   ├── g7auto-infra/   # Triển khai repository, tích hợp bên thứ 3
│   └── g7auto-start/   # Module khởi chạy ứng dụng
└── g7auto-fe/          # Mã nguồn Frontend (React)
    ├── src/
    │   ├── modules/    # Các module chức năng (Cars, Customers, Orders...)
    │   ├── libs/       # Thành phần dùng chung (Components, Utils, Constants...)
    │   └── shell/      # Cấu hình core (Redux, Router, App wrapper)
```

## ✨ Tính năng chính

- **Quản lý tài khoản & Phân quyền:** Phân quyền chi tiết cho nhân viên, quản lý.
- **Quản lý kho xe:** Theo dõi danh mục mẫu xe, tình trạng xe tại showroom.
- **Quản lý khách hàng:** Lưu trữ thông tin, lịch sử tương tác và nhu cầu khách hàng.
- **Hợp đồng & Đặt cọc:** Quy trình xử lý hợp đồng mua bán và quản lý tiền cọc.
- **Báo giá & Lịch sử dịch vụ:** Tạo báo giá nhanh chóng và theo dõi bảo trì, bảo dưỡng.
- **Lái thử (Test Drive):** Quản lý lịch đăng ký và thực hiện lái thử xe.
- **Chuyển xe (Car Transfer):** Điều phối xe giữa các showroom trong hệ thống.

## 🛠 Hướng dẫn cài đặt

### Yêu cầu hệ thống
- Docker & Docker Compose
- Java 21 JDK
- Node.js (phiên bản mới nhất) & npm/yarn
- Maven

### Khởi chạy dự án
1. **Clone repository:**
   ```bash
   git clone <repository-url>
   cd g7auto
   ```

2. **Chạy cơ sở dữ liệu (nếu dùng Docker):**
   ```bash
   docker-compose up -d
   ```

3. **Chạy Backend:**
   ```bash
   cd g7auto-be
   mvn clean install
   mvn spring-boot:run -pl g7auto-start
   ```

4. **Chạy Frontend:**
   ```bash
   cd g7auto-fe
   npm install
   npm run dev
   ```

