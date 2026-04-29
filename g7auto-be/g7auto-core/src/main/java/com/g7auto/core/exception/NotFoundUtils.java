package com.g7auto.core.exception;

import com.g7auto.core.constant.codes.CarErrorCode;
import com.g7auto.core.constant.codes.CustomerErrorCode;
import com.g7auto.core.constant.codes.HrErrorCode;
import com.g7auto.core.constant.codes.InventoryErrorCode;
import com.g7auto.core.constant.codes.SalesErrorCode;
import com.g7auto.core.constant.codes.SystemErrorCode;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class NotFoundUtils {

  private static final Logger log = LoggerFactory.getLogger(
      NotFoundUtils.class);

  private NotFoundUtils() {
  }

  public static NotFoundException showroomNotFound(Long id) {
    log.error("Không tìm thấy Showroom với id {}", id);
    return new NotFoundException(CarErrorCode.G7_AUTO_00307);
  }

  public static NotFoundException carModelIdNotFound(Long id) {
    log.error("Không tìm thấy mẫu xe với id {}", id);
    return new NotFoundException(CarErrorCode.G7_AUTO_00307);
  }

  public static NotFoundException carIdNotFound(Long id) {
    log.error("Không tìm thấy xe với id {}", id);
    return new NotFoundException(CarErrorCode.G7_AUTO_00305);
  }

  public static NotFoundException carTransferIdNotFound(Long id) {
    log.error("Không tìm thấy lệnh điều chuyển với id {}", id);
    return new NotFoundException(InventoryErrorCode.G7_AUTO_00405);
  }

  public static NotFoundException customerIdNotFound(Long id) {
    log.error("Không tìm thấy khách hàng với id {}", id);
    return new NotFoundException(CustomerErrorCode.G7_AUTO_00502);
  }

  public static NotFoundException employeeIdNotFound(Long id) {
    log.error("Không tìm thấy nhân viên với id {}", id);
    return new NotFoundException(HrErrorCode.G7_AUTO_00701);
  }

  public static NotFoundException accountIdNotFound(Long id) {
    log.error("Không tìm thấy tài khoản với id {}", id);
    return new NotFoundException(SystemErrorCode.G7_AUTO_00101);
  }

  public static NotFoundException quotationIdNotFound(Long id) {
    log.error("Không tìm thấy báo giá với id {}", id);
    return new NotFoundException(SalesErrorCode.G7_AUTO_00600);
  }

  public static NotFoundException depositIdNotFound(Long id) {
    log.error("Không tìm thấy khoản đặt cọc với id {}", id);
    return new NotFoundException(SalesErrorCode.G7_AUTO_00607);
  }

  public static NotFoundException contractIdNotFound(Long id) {
    log.error("Không tìm thấy hợp đồng với id {}", id);
    return new NotFoundException(SalesErrorCode.G7_AUTO_00601);
  }

  public static NotFoundException testDriveIdNotFound(Long id) {
    log.error("Không tìm thấy lịch lái thử với id {}", id);
    return new NotFoundException(SalesErrorCode.G7_AUTO_00609);
  }

  public static NotFoundException paymentIdNotFound(Long id) {
    log.error("Không tìm thấy thông tin thanh toán với id {}", id);
    return new NotFoundException(SalesErrorCode.G7_AUTO_00631);
  }
}
