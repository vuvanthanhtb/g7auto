import http from "@/libs/interceptor";
import { CAR_MODEL_ENDPOINT } from "./car-model.endpoint";
import type { CarModelRequest, CarModelResponse, CarModelQuery } from "../shell/car-model.type";
import type { AxiosResponse } from "axios";
import type { ResponseBase } from "@/libs/interceptor/types";

type AR<T> = Promise<AxiosResponse<ResponseBase<T>>>;
type CarModelPage = { content: CarModelResponse[]; totalElements: number; totalPages: number; page: number; size: number };
type ImportResult = { total: number; success: number; failed: number; errors: string[] };

const BASE = CAR_MODEL_ENDPOINT.BASE;

interface ICarModelRepository {
  getList(params?: CarModelQuery): AR<CarModelPage>;
  getAll(): AR<CarModelResponse[]>;
  getById(id: number): AR<CarModelResponse>;
  create(data: CarModelRequest): AR<CarModelResponse>;
  update(id: number, data: CarModelRequest): AR<CarModelResponse>;
  delete(id: number): AR<void>;
  importFile(file: File): AR<ImportResult>;
  downloadTemplate(): Promise<void>;
  export(): Promise<void>;
}

class CarModelRepository implements ICarModelRepository {
  private static instance: CarModelRepository;
  private constructor() {}
  static getInstance() {
    if (!CarModelRepository.instance) CarModelRepository.instance = new CarModelRepository();
    return CarModelRepository.instance;
  }
  getList(params?: CarModelQuery): AR<CarModelPage> { return http.call<CarModelPage>({ url: BASE, method: "GET", params }); }
  getAll(): AR<CarModelResponse[]> { return http.call<CarModelResponse[]>({ url: `${BASE}/all`, method: "GET" }); }
  getById(id: number): AR<CarModelResponse> { return http.call<CarModelResponse>({ url: `${BASE}/${id}`, method: "GET" }); }
  create(data: CarModelRequest): AR<CarModelResponse> { return http.call<CarModelResponse>({ url: BASE, method: "POST", data }); }
  update(id: number, data: CarModelRequest): AR<CarModelResponse> { return http.call<CarModelResponse>({ url: `${BASE}/${id}`, method: "PUT", data }); }
  delete(id: number): AR<void> { return http.call<void>({ url: `${BASE}/${id}`, method: "DELETE" }); }
  importFile(file: File): AR<ImportResult> { return http.upload<ImportResult>({ url: `${BASE}/import`, file }); }
  downloadTemplate(): Promise<void> { return http.download({ url: `${BASE}/template`, filename: "mau-import-dong-xe.xlsx" }); }
  export(): Promise<void> { return http.download({ url: `${BASE}/export`, filename: "danh-sach-dong-xe.xlsx" }); }
}
export const carModelService: ICarModelRepository = CarModelRepository.getInstance();
export const carModelsService = carModelService;
