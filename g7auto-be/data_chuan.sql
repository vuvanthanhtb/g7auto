-- ==========================================================
-- G7 AUTO - DỮ LIỆU CHUẨN (STANDARD DATA)
-- ==========================================================

-- 1. Showrooms (Quản lý các chi nhánh)
INSERT INTO showrooms (name, address, phone, email, manager, status, created_at, created_by) VALUES
('G7 Auto Hà Nội', 'Số 1 Cầu Giấy, P. Láng Thượng, Q. Đống Đa, Hà Nội', '024.3333.8888', 'hanoi@g7auto.vn', 'Nguyễn Văn An', 'ACTIVE', CURRENT_TIMESTAMP, 'SYSTEM'),
('G7 Auto Hồ Chí Minh', 'Số 100 Nguyễn Hữu Cảnh, P. 22, Q. Bình Thạnh, TP. HCM', '028.6666.9999', 'hcm@g7auto.vn', 'Lê Thị Bình', 'ACTIVE', CURRENT_TIMESTAMP, 'SYSTEM'),
('G7 Auto Đà Nẵng', 'Số 50 Duy Tân, P. Hòa Thuận Nam, Q. Hải Châu, Đà Nẵng', '0236.444.555', 'danang@g7auto.vn', 'Trần Văn Cường', 'ACTIVE', CURRENT_TIMESTAMP, 'SYSTEM');

-- 2. Accounts (Tài khoản người dùng)
-- Lưu ý: Mật khẩu dưới đây là 'password' đã được giả định mã hóa (BCrypt: $2a$10$8.UnVuG9HHgU.n9fR3U.8uG)
INSERT INTO accounts (username, password, email, full_name, roles, status, created_at, created_by) VALUES
('admin', '$2a$10$8.UnVuG9HHgU.n9fR3U.8uG', 'admin@g7auto.vn', 'Hệ Thống Admin', 'ADMIN', 'ACTIVE', CURRENT_TIMESTAMP, 'SYSTEM'),
('sales_hn_01', '$2a$10$8.UnVuG9HHgU.n9fR3U.8uG', 'sales1.hn@g7auto.vn', 'Nguyễn Văn Sale', 'SALES', 'ACTIVE', CURRENT_TIMESTAMP, 'SYSTEM'),
('kho_hn_01', '$2a$10$8.UnVuG9HHgU.n9fR3U.8uG', 'kho1.hn@g7auto.vn', 'Trần Văn Kho', 'KHO', 'ACTIVE', CURRENT_TIMESTAMP, 'SYSTEM'),
('ketoan_hn_01', '$2a$10$8.UnVuG9HHgU.n9fR3U.8uG', 'ketoan1.hn@g7auto.vn', 'Phạm Thị Kế Toán', 'KE_TOAN', 'ACTIVE', CURRENT_TIMESTAMP, 'SYSTEM'),
('sales_hcm_01', '$2a$10$8.UnVuG9HHgU.n9fR3U.8uG', 'sales1.hcm@g7auto.vn', 'Lê Văn Bán Xe', 'SALES', 'ACTIVE', CURRENT_TIMESTAMP, 'SYSTEM');

-- 3. Employees (Thông tin nhân viên)
INSERT INTO employees (full_name, phone, email, address, showroom_id, account_id, employee_status, join_date, created_at, created_by) VALUES
('Hệ Thống Admin', '0901111222', 'admin@g7auto.vn', 'Hà Nội', 1, 1, 'ACTIVE', '2024-01-01', CURRENT_TIMESTAMP, 'SYSTEM'),
('Nguyễn Văn Sale', '0902222333', 'sales1.hn@g7auto.vn', 'Cầu Giấy, Hà Nội', 1, 2, 'ACTIVE', '2024-01-15', CURRENT_TIMESTAMP, 'SYSTEM'),
('Trần Văn Kho', '0903333444', 'kho1.hn@g7auto.vn', 'Thanh Xuân, Hà Nội', 1, 3, 'ACTIVE', '2024-01-15', CURRENT_TIMESTAMP, 'SYSTEM'),
('Phạm Thị Kế Toán', '0904444555', 'ketoan1.hn@g7auto.vn', 'Hai Bà Trưng, Hà Nội', 1, 4, 'ACTIVE', '2024-02-01', CURRENT_TIMESTAMP, 'SYSTEM'),
('Lê Văn Bán Xe', '0905555666', 'sales1.hcm@g7auto.vn', 'Quận 1, TP. HCM', 2, 5, 'ACTIVE', '2024-02-01', CURRENT_TIMESTAMP, 'SYSTEM');

-- 4. Car Models (Danh mục mẫu xe)
INSERT INTO car_models (name, manufacturer, series, year, color, car_type, engine, transmission, listed_price, status, created_at, created_by) VALUES
('Toyota Camry 2.5Q', 'Toyota', 'Sedan', '2024', 'Đen', 'Xăng', '2.5L', 'Tự động 8 cấp', 1405000000.00, 'ACTIVE', CURRENT_TIMESTAMP, 'SYSTEM'),
('Toyota Vios 1.5G', 'Toyota', 'Sedan', '2024', 'Trắng', 'Xăng', '1.5L', 'Vô cấp CVT', 592000000.00, 'ACTIVE', CURRENT_TIMESTAMP, 'SYSTEM'),
('Honda CR-V L', 'Honda', 'Crossover', '2024', 'Đỏ', 'Xăng Turbo', '1.5L VTEC Turbo', 'Vô cấp CVT', 1159000000.00, 'ACTIVE', CURRENT_TIMESTAMP, 'SYSTEM'),
('Ford Ranger Wildtrak 2.0L 4x4', 'Ford', 'Pick-up', '2024', 'Cam', 'Dầu Turbo', 'Bi-Turbo 2.0L', 'Tự động 10 cấp', 979000000.00, 'ACTIVE', CURRENT_TIMESTAMP, 'SYSTEM'),
('Mazda CX-5 2.0 Premium', 'Mazda', 'Crossover', '2024', 'Xám', 'Xăng', '2.0L SkyActiv-G', 'Tự động 6 cấp', 829000000.00, 'ACTIVE', CURRENT_TIMESTAMP, 'SYSTEM');

-- 5. Cars (Danh sách xe vật lý)
INSERT INTO cars (chassis_number, engine_number, license_plate, car_model_id, showroom_id, status, sale_price, arrival_date, year, created_at, created_by) VALUES
('VIN888800001', 'ENG111001', '30K-123.45', 1, 1, 'AVAILABLE', 1405000000.00, '2024-03-01', 2024, CURRENT_TIMESTAMP, 'SYSTEM'),
('VIN888800002', 'ENG111002', NULL, 1, 1, 'DEPOSITED', 1395000000.00, '2024-03-01', 2024, CURRENT_TIMESTAMP, 'SYSTEM'),
('VIN999900001', 'ENG222001', '51L-999.88', 2, 2, 'SOLD', 585000000.00, '2024-03-05', 2024, CURRENT_TIMESTAMP, 'SYSTEM'),
('VIN777700001', 'ENG333001', NULL, 3, 1, 'AVAILABLE', 1159000000.00, '2024-03-10', 2024, CURRENT_TIMESTAMP, 'SYSTEM'),
('VIN666600001', 'ENG444001', NULL, 4, 3, 'AVAILABLE', 979000000.00, '2024-03-15', 2024, CURRENT_TIMESTAMP, 'SYSTEM');

-- 6. Customers (Hồ sơ khách hàng)
INSERT INTO customers (full_name, phone, email, address, source_type, car_interest, assigned_employee_id, created_at, created_by) VALUES
('Trần Minh Quân', '0912345678', 'quan.tm@gmail.com', 'Hoàn Kiếm, Hà Nội', 'Walk-in', 'Toyota Camry', 2, CURRENT_TIMESTAMP, 'SYSTEM'),
('Lê Thu Thủy', '0988776655', 'thuy.le@yahoo.com', 'Quận 3, TP. HCM', 'Facebook', 'Toyota Vios', 5, CURRENT_TIMESTAMP, 'SYSTEM'),
('Nguyễn Hoàng Long', '0909090909', 'long.nh@company.com', 'Hải Châu, Đà Nẵng', 'Online Web', 'Ford Ranger', 1, CURRENT_TIMESTAMP, 'SYSTEM');

-- 7. Quotations (Báo giá)
INSERT INTO quotations (customer_id, car_id, employee_id, car_price, accessories, promotion, other_costs, total_amount, created_date, status, created_at, created_by) VALUES
(1, 2, 2, 1395000000.00, 20000000.00, 15000000.00, 140000000.00, 1540000000.00, CURRENT_TIMESTAMP, 'APPROVED', CURRENT_TIMESTAMP, 'SYSTEM'),
(2, 3, 5, 585000000.00, 5000000.00, 10000000.00, 60000000.00, 640000000.00, CURRENT_TIMESTAMP, 'PENDING', CURRENT_TIMESTAMP, 'SYSTEM');

-- 8. Deposits (Đặt cọc)
INSERT INTO deposits (quotation_id, customer_id, car_id, employee_id, amount, deposit_date, expiry_date, deposit_payment_method, status, created_at, created_by) VALUES
(1, 1, 2, 2, 50000000.00, '2024-04-10', '2024-04-30', 'BANK_TRANSFER', 'ACTIVE', CURRENT_TIMESTAMP, 'SYSTEM');

-- 9. Contracts (Hợp đồng)
INSERT INTO contracts (contract_number, customer_id, car_id, employee_id, deposit_id, sign_date, expected_delivery_date, contract_value, paid_amount, remaining_amount, status, created_at, created_by) VALUES
('G7A-2024-0001', 2, 3, 5, NULL, '2024-03-20', '2024-03-25', 640000000.00, 640000000.00, 0, 'COMPLETED', CURRENT_TIMESTAMP, 'SYSTEM');

-- 10. Payments (Thanh toán)
INSERT INTO payments (contract_id, installment_number, amount, payment_time, method, status, collector_id, transaction_code, created_at, created_by) VALUES
(1, 1, 640000000.00, '2024-03-20 10:30:00', 'BANK_TRANSFER', 'CONFIRMED', 4, 'VNPAY12345678', CURRENT_TIMESTAMP, 'SYSTEM');

-- 11. Car Transfers (Điều chuyển xe)
INSERT INTO car_transfers (car_id, from_showroom_id, to_showroom_id, created_by_employee_id, transfer_date, status, reason, created_at, created_by) VALUES
(5, 1, 3, 3, '2024-04-15', 'PENDING', 'Điều chuyển bổ sung hàng cho chi nhánh Đà Nẵng', CURRENT_TIMESTAMP, 'SYSTEM');

-- 12. Service Histories (Nhật ký CRM)
INSERT INTO service_histories (customer_id, employee_id, service_date, contact_type, content, result, next_reminder_date, created_at, created_by) VALUES
(1, 2, '2024-04-01 09:00:00', 'CALL', 'Tư vấn về xe Camry và thủ tục trả góp', 'Khách quan tâm, hẹn qua xem xe', '2024-04-05 14:00:00', CURRENT_TIMESTAMP, 'SYSTEM'),
(1, 2, '2024-04-05 14:30:00', 'MEETING', 'Khách qua xem xe trực tiếp tại showroom', 'Khách ưng ý, đang cân nhắc chốt cọc', '2024-04-10 09:00:00', CURRENT_TIMESTAMP, 'SYSTEM');

-- 13. Test Drives (Lái thử)
INSERT INTO test_drives (customer_id, car_id, employee_id, showroom_id, start_time, end_time, status, notes, created_at, created_by) VALUES
(1, 1, 2, 1, '2024-04-05 15:00:00', '2024-04-05 16:00:00', 'COMPLETED', 'Khách khen xe cách âm tốt, lái mượt', CURRENT_TIMESTAMP, 'SYSTEM');
