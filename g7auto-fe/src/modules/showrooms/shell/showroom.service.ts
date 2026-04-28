import http from "@/libs/interceptor";
import SHOWROOM_ENDPOINT from "./showroom.endpoint";
import type {
  ShowroomRequest,
  ShowroomResponse,
  ShowroomQuery,
} from "./showroom.type";

class ShowroomRepository {
  private static instance: ShowroomRepository;
  private constructor() {}
  static getInstance() {
    if (!ShowroomRepository.instance)
      ShowroomRepository.instance = new ShowroomRepository();
    return ShowroomRepository.instance;
  }
  getAll(params?: ShowroomQuery) {
    return http.call<{
      content: ShowroomResponse[];
      totalElements: number;
      totalPages: number;
      page: number;
      size: number;
    }>({ url: SHOWROOM_ENDPOINT.BASE, method: "GET", params });
  }
  getList() {
    return http.call<ShowroomResponse[]>({
      url: SHOWROOM_ENDPOINT.LIST,
      method: "GET",
    });
  }
  getById(id: number) {
    return http.call<ShowroomResponse>({
      url: `${SHOWROOM_ENDPOINT.BASE}/${id}`,
      method: "GET",
    });
  }
  create(data: ShowroomRequest) {
    return http.call<ShowroomResponse>({
      url: SHOWROOM_ENDPOINT.BASE,
      method: "POST",
      data,
    });
  }
  update(id: number, data: ShowroomRequest) {
    return http.call<ShowroomResponse>({
      url: `${SHOWROOM_ENDPOINT.BASE}/${id}`,
      method: "PUT",
      data,
    });
  }
  delete(id: number) {
    return http.call({
      url: `${SHOWROOM_ENDPOINT.BASE}/${id}`,
      method: "DELETE",
    });
  }
  importFile(file: File) {
    return http.upload<{
      total: number;
      success: number;
      failed: number;
      errors: string[];
    }>({ url: `${SHOWROOM_ENDPOINT.BASE}/import`, file });
  }
  downloadTemplate() {
    return http.download({
      url: `${SHOWROOM_ENDPOINT.BASE}/template`,
      filename: "mau-import-showroom.xlsx",
    });
  }
  exportExcel() {
    return http.download({
      url: `${SHOWROOM_ENDPOINT.BASE}/export`,
      filename: "danh-sach-showroom.xlsx",
    });
  }
}
export const showroomService = ShowroomRepository.getInstance();

export const showroomsService = showroomService;
