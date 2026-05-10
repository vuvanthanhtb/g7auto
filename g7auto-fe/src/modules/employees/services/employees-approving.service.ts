import http from "@/libs/interceptor";
import { EMPLOYEES_APPROVING_ENDPOINT } from "./employees-approving.endpoint";
import type {
  EmployeeRequest,
  EmployeeResponse,
  EmployeeApprovingQuery,
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

const BASE = EMPLOYEES_APPROVING_ENDPOINT.BASE;

interface IEmployeesApprovingRepository {
  getList(params?: EmployeeApprovingQuery): AR<EmployeePage>;
  create(data: EmployeeRequest): AR<void>;
  update(id: number, data: EmployeeRequest): AR<void>;
  deleteApproval(id: number): AR<void>;
  requestApproval(data: { username: string; action: string }): AR<void>;
  bulkRequestApproval(data: { action: string; usernames: string[] }): AR<void>;
}

class EmployeesApprovingRepository implements IEmployeesApprovingRepository {
  private static instance: EmployeesApprovingRepository;
  private constructor() {}

  static getInstance() {
    if (!EmployeesApprovingRepository.instance)
      EmployeesApprovingRepository.instance = new EmployeesApprovingRepository();
    return EmployeesApprovingRepository.instance;
  }

  getList(params?: EmployeeApprovingQuery): AR<EmployeePage> {
    return http.call<EmployeePage>({ url: BASE, method: "GET", params });
  }

  create(data: EmployeeRequest): AR<void> {
    return http.call<void>({ url: BASE, method: "POST", data });
  }

  update(id: number, data: EmployeeRequest): AR<void> {
    return http.call<void>({ url: `${BASE}/${id}`, method: "PUT", data });
  }

  deleteApproval(id: number): AR<void> {
    return http.call<void>({ url: `${BASE}/${id}`, method: "DELETE" });
  }

  requestApproval(data: { username: string; action: string }): AR<void> {
    return http.call<void>({ url: `${BASE}/request-approval`, method: "POST", data });
  }

  bulkRequestApproval(data: { action: string; usernames: string[] }): AR<void> {
    return http.call<void>({ url: `${BASE}/bulk-approval`, method: "POST", data });
  }
}

export const employeesApprovingService: IEmployeesApprovingRepository =
  EmployeesApprovingRepository.getInstance();
