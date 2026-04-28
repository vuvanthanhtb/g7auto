import http from "@/libs/interceptor";
import EMPLOYEES_ENDPOINT from "./employees.endpoint";
import type {
  EmployeeRequest,
  EmployeeResponse,
  EmployeeQuery,
} from "./employees.type";

class EmployeesRepository {
  private static instance: EmployeesRepository;
  private constructor() {}
  static getInstance() {
    if (!EmployeesRepository.instance)
      EmployeesRepository.instance = new EmployeesRepository();
    return EmployeesRepository.instance;
  }
  getList(params?: EmployeeQuery) {
    return http.call<{
      content: EmployeeResponse[];
      totalElements: number;
      totalPages: number;
      page: number;
      size: number;
    }>({ url: EMPLOYEES_ENDPOINT.BASE, method: "GET", params });
  }
  getById(id: number) {
    return http.call<EmployeeResponse>({
      url: `${EMPLOYEES_ENDPOINT.BASE}/${id}`,
      method: "GET",
    });
  }
  create(data: EmployeeRequest) {
    return http.call<EmployeeResponse>({
      url: EMPLOYEES_ENDPOINT.BASE,
      method: "POST",
      data,
    });
  }
  update(id: number, data: EmployeeRequest) {
    return http.call<EmployeeResponse>({
      url: `${EMPLOYEES_ENDPOINT.BASE}/${id}`,
      method: "PUT",
      data,
    });
  }
  resign(id: number) {
    return http.call<EmployeeResponse>({
      url: `${EMPLOYEES_ENDPOINT.BASE}/${id}/resign`,
      method: "POST",
    });
  }
  transferShowroom(id: number, newShowroomId: number) {
    return http.call<EmployeeResponse>({
      url: `${EMPLOYEES_ENDPOINT.BASE}/${id}/transfer-showroom`,
      method: "POST",
      data: { newShowroomId },
    });
  }
  export() {
    return http.download({
      url: `${EMPLOYEES_ENDPOINT.BASE}/export`,
      filename: "danh-sach-nhan-vien.xlsx",
    });
  }
}
export const employeesService = EmployeesRepository.getInstance();
