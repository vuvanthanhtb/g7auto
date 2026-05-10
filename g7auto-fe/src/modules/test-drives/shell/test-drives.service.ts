import http from "@/libs/interceptor";
import { TEST_DRIVES_ENDPOINT } from "./test-drives.endpoint";
import type { TestDriveRequest, TestDrivePayload, TestDriveResponse } from "./test-drives.type";

type TestDrivePage = { content: TestDriveResponse[]; totalElements: number; totalPages: number; page: number; size: number };

class TestDrivesRepository {
  private static instance: TestDrivesRepository;
  private constructor() {}
  static getInstance() {
    if (!TestDrivesRepository.instance) TestDrivesRepository.instance = new TestDrivesRepository();
    return TestDrivesRepository.instance;
  }
  getList(params?: TestDrivePayload) {
    return http.call<TestDrivePage>({ url: TEST_DRIVES_ENDPOINT.LIST, method: "GET", params });
  }
  getById(id: number) {
    return http.call<TestDriveResponse>({ url: `${TEST_DRIVES_ENDPOINT.BASE}/${id}`, method: "GET" });
  }
  create(data: TestDriveRequest) {
    return http.call<TestDriveResponse>({ url: TEST_DRIVES_ENDPOINT.BASE, method: "POST", data });
  }
  confirm(id: number) {
    return http.call<TestDriveResponse>({ url: `${TEST_DRIVES_ENDPOINT.BASE}/${id}/confirm`, method: "POST" });
  }
  complete(id: number, notes?: string) {
    return http.call<TestDriveResponse>({ url: `${TEST_DRIVES_ENDPOINT.BASE}/${id}/complete`, method: "POST", params: { notes } });
  }
  cancel(id: number) {
    return http.call<TestDriveResponse>({ url: `${TEST_DRIVES_ENDPOINT.BASE}/${id}/cancel`, method: "POST" });
  }
  exportExcel() {
    return http.download({ url: `${TEST_DRIVES_ENDPOINT.BASE}/export`, filename: "danh-sach-lai-thu.xlsx" });
  }
}

export const testDrivesService = TestDrivesRepository.getInstance();
