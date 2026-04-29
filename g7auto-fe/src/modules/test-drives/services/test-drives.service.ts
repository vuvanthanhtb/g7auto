import http from "@/libs/interceptor";
import { TEST_DRIVES_ENDPOINT } from "./test-drives.endpoint";
import type { TestDriveRequest, TestDriveQuery, TestDriveResponse } from "../shell/test-drives.type";
import type { AxiosResponse } from "axios";
import type { ResponseBase } from "@/libs/interceptor/types";

type AR<T> = Promise<AxiosResponse<ResponseBase<T>>>;
type TestDrivePage = { content: TestDriveResponse[]; totalElements: number; totalPages: number; page: number; size: number };

const BASE = TEST_DRIVES_ENDPOINT.BASE;

interface ITestDrivesRepository {
  getList(params?: TestDriveQuery): AR<TestDrivePage>;
  getById(id: number): AR<TestDriveResponse>;
  create(data: TestDriveRequest): AR<TestDriveResponse>;
  confirm(id: number): AR<TestDriveResponse>;
  complete(id: number): AR<TestDriveResponse>;
  cancel(id: number): AR<TestDriveResponse>;
  exportExcel(): Promise<void>;
}

class TestDrivesRepository implements ITestDrivesRepository {
  private static instance: TestDrivesRepository;
  private constructor() {}
  static getInstance() {
    if (!TestDrivesRepository.instance) TestDrivesRepository.instance = new TestDrivesRepository();
    return TestDrivesRepository.instance;
  }
  getList(params?: TestDriveQuery): AR<TestDrivePage> { return http.call<TestDrivePage>({ url: TEST_DRIVES_ENDPOINT.LIST, method: "GET", params }); }
  getById(id: number): AR<TestDriveResponse> { return http.call<TestDriveResponse>({ url: `${BASE}/${id}`, method: "GET" }); }
  create(data: TestDriveRequest): AR<TestDriveResponse> { return http.call<TestDriveResponse>({ url: BASE, method: "POST", data }); }
  confirm(id: number): AR<TestDriveResponse> { return http.call<TestDriveResponse>({ url: `${BASE}/${id}/confirm`, method: "POST" }); }
  complete(id: number): AR<TestDriveResponse> { return http.call<TestDriveResponse>({ url: `${BASE}/${id}/complete`, method: "POST" }); }
  cancel(id: number): AR<TestDriveResponse> { return http.call<TestDriveResponse>({ url: `${BASE}/${id}/cancel`, method: "POST" }); }
  exportExcel(): Promise<void> { return http.download({ url: `${BASE}/export`, filename: "danh-sach-lai-thu.xlsx" }); }
}
export const testDrivesService: ITestDrivesRepository = TestDrivesRepository.getInstance();
