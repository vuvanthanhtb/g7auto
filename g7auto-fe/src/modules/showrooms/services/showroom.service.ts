import http from "@/libs/interceptor";
import { SHOWROOM_ENDPOINT } from "./showroom.endpoint";
import type { ShowroomRequest, ShowroomResponse, ShowroomQuery } from "../shell/showroom.type";
import type { AxiosResponse } from "axios";
import type { ResponseBase } from "@/libs/interceptor/types";

type AR<T> = Promise<AxiosResponse<ResponseBase<T>>>;
type ShowroomPage = { content: ShowroomResponse[]; totalElements: number; totalPages: number; page: number; size: number };
type ImportResult = { total: number; success: number; failed: number; errors: string[] };

const BASE = SHOWROOM_ENDPOINT.BASE;

interface IShowroomRepository {
  getAll(params?: ShowroomQuery): AR<ShowroomPage>;
  getList(): AR<ShowroomResponse[]>;
  getById(id: number): AR<ShowroomResponse>;
  create(data: ShowroomRequest): AR<ShowroomResponse>;
  update(id: number, data: ShowroomRequest): AR<ShowroomResponse>;
  delete(id: number): AR<void>;
  importFile(file: File): AR<ImportResult>;
  downloadTemplate(): Promise<void>;
  exportExcel(): Promise<void>;
}

class ShowroomRepository implements IShowroomRepository {
  private static instance: ShowroomRepository;
  private constructor() {}
  static getInstance() {
    if (!ShowroomRepository.instance) ShowroomRepository.instance = new ShowroomRepository();
    return ShowroomRepository.instance;
  }
  getAll(params?: ShowroomQuery): AR<ShowroomPage> { return http.call<ShowroomPage>({ url: BASE, method: "GET", params }); }
  getList(): AR<ShowroomResponse[]> { return http.call<ShowroomResponse[]>({ url: SHOWROOM_ENDPOINT.LIST, method: "GET" }); }
  getById(id: number): AR<ShowroomResponse> { return http.call<ShowroomResponse>({ url: `${BASE}/${id}`, method: "GET" }); }
  create(data: ShowroomRequest): AR<ShowroomResponse> { return http.call<ShowroomResponse>({ url: BASE, method: "POST", data }); }
  update(id: number, data: ShowroomRequest): AR<ShowroomResponse> { return http.call<ShowroomResponse>({ url: `${BASE}/${id}`, method: "PUT", data }); }
  delete(id: number): AR<void> { return http.call<void>({ url: `${BASE}/${id}`, method: "DELETE" }); }
  importFile(file: File): AR<ImportResult> { return http.upload<ImportResult>({ url: `${BASE}/import`, file }); }
  downloadTemplate(): Promise<void> { return http.download({ url: `${BASE}/template`, filename: "mau-import-showroom.xlsx" }); }
  exportExcel(): Promise<void> { return http.download({ url: `${BASE}/export`, filename: "danh-sach-showroom.xlsx" }); }
}
export const showroomService: IShowroomRepository = ShowroomRepository.getInstance();
export const showroomsService = showroomService;
