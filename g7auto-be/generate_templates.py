import csv

def generate_csv_templates():
    # 1. Showrooms Template
    showrooms_header = ['name', 'address', 'phone', 'email', 'manager']
    showrooms_data = [
        ['G7 Auto Cầu Giấy', '1 Cầu Giấy, Hà Nội', '02433338888', 'caugiay@g7auto.vn', 'Nguyễn Văn An'],
        ['G7 Auto Quận 1', '100 Nguyễn Hữu Cảnh, TP.HCM', '02866669999', 'q1@g7auto.vn', 'Lê Thị Bình'],
        ['G7 Auto Đà Nẵng', '50 Duy Tân, Đà Nẵng', '0236444555', 'danang@g7auto.vn', 'Trần Văn Cường']
    ]
    with open('template_showrooms.csv', 'w', newline='', encoding='utf-8-sig') as f:
        writer = csv.writer(f)
        writer.writerow(showrooms_header)
        writer.writerows(showrooms_data)
    print("Created template_showrooms.csv")

    # 2. Car Models Template
    car_models_header = ['name', 'manufacturer', 'series', 'year', 'color', 'car_type', 'engine', 'transmission', 'listed_price']
    car_models_data = [
        ['Toyota Camry 2.5Q', 'Toyota', 'Sedan', '2024', 'Đen', 'Xăng', '2.5L', 'Tự động 8 cấp', '1405000000'],
        ['Toyota Vios 1.5G', 'Toyota', 'Sedan', '2024', 'Trắng', 'Xăng', '1.5L', 'Vô cấp CVT', '592000000'],
        ['Honda CR-V L', 'Honda', 'Crossover', '2024', 'Đỏ', 'Xăng Turbo', '1.5L VTEC Turbo', 'Vô cấp CVT', '1159000000']
    ]
    with open('template_car_models.csv', 'w', newline='', encoding='utf-8-sig') as f:
        writer = csv.writer(f)
        writer.writerow(car_models_header)
        writer.writerows(car_models_data)
    print("Created template_car_models.csv")

    # 3. Customers Template
    customers_header = ['fullName', 'phone', 'email', 'address', 'nationalId', 'notes']
    customers_data = [
        ['Trần Minh Quân', '0912345678', 'quan.tm@gmail.com', 'Hoàn Kiếm, Hà Nội', '001090123456', 'Khách quan tâm Camry'],
        ['Lê Thu Thủy', '0988776655', 'thuy.le@yahoo.com', 'Quận 3, TP.HCM', '079090123456', 'Khách quan tâm Vios'],
        ['Nguyễn Hoàng Long', '0909090909', 'long.nh@company.com', 'Hải Châu, Đà Nẵng', '048090123456', 'Khách quan tâm Ford Ranger']
    ]
    with open('template_customers.csv', 'w', newline='', encoding='utf-8-sig') as f:
        writer = csv.writer(f)
        writer.writerow(customers_header)
        writer.writerows(customers_data)
    print("Created template_customers.csv")

    # 4. Accounts Template
    accounts_header = ['username', 'email', 'fullName', 'password']
    accounts_data = [
        ['sales_hn_02', 'sales2.hn@g7auto.vn', 'Nguyễn Thị Sale', 'Password@123'],
        ['kho_hcm_01', 'kho1.hcm@g7auto.vn', 'Trần Văn Kho HCM', 'Password@123'],
        ['ketoan_dn_01', 'ketoan1.dn@g7auto.vn', 'Lê Thị Kế Toán DN', 'Password@123']
    ]
    with open('template_accounts.csv', 'w', newline='', encoding='utf-8-sig') as f:
        writer = csv.writer(f)
        writer.writerow(accounts_header)
        writer.writerows(accounts_data)
    print("Created template_accounts.csv")

if __name__ == "__main__":
    generate_csv_templates()
