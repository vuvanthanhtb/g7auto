import http from "@/libs/interceptor";
import { EMPLOYEES_ENDPOINT } from "./employees.endpoint";
import type {
  EmployeeRequest,
  EmployeeResponse,
  EmployeeQuery,
} from "../shell/employees.type";
import type { AxiosResponse } from "axios";

type AR<T> = Promise<AxiosResponse<T>>;
type EmployeePage = {
  content: EmployeeResponse[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
};

const BASE = EMPLOYEES_ENDPOINT.BASE;

interface IEmployeesRepository {
  getList(params?: EmployeeQuery): AR<EmployeePage>;
  getById(id: number): AR<EmployeeResponse>;
  create(data: EmployeeRequest): AR<EmployeeResponse>;
  update(id: number, data: EmployeeRequest): AR<EmployeeResponse>;
  resign(id: number): AR<EmployeeResponse>;
  transferShowroom(id: number, newShowroomId: number): AR<EmployeeResponse>;
  export(): Promise<Blob>;
}

class EmployeesRepository implements IEmployeesRepository {
  private static instance: EmployeesRepository;
  private constructor() {}
  static getInstance() {
    if (!EmployeesRepository.instance)
      EmployeesRepository.instance = new EmployeesRepository();
    return EmployeesRepository.instance;
  }
  getList(params?: EmployeeQuery): AR<EmployeePage> {
    return http.call<EmployeePage>({ url: BASE, method: "GET", params });
  }
  getById(id: number): AR<EmployeeResponse> {
    return http.call<EmployeeResponse>({ url: `${BASE}/${id}`, method: "GET" });
  }
  create(data: EmployeeRequest): AR<EmployeeResponse> {
    return http.call<EmployeeResponse>({ url: BASE, method: "POST", data });
  }
  update(id: number, data: EmployeeRequest): AR<EmployeeResponse> {
    return http.call<EmployeeResponse>({
      url: `${BASE}/${id}`,
      method: "PUT",
      data,
    });
  }
  resign(id: number): AR<EmployeeResponse> {
    return http.call<EmployeeResponse>({
      url: `${BASE}/${id}/resign`,
      method: "POST",
    });
  }
  transferShowroom(id: number, newShowroomId: number): AR<EmployeeResponse> {
    return http.call<EmployeeResponse>({
      url: `${BASE}/${id}/transfer-showroom`,
      method: "POST",
      data: { newShowroomId },
    });
  }
  export() {
    return http.download({
      url: `${BASE}/export`,
      filename: "danh-sach-nhan-vien.xlsx",
    });
  }
}
export const employeesService: IEmployeesRepository =
  EmployeesRepository.getInstance();
