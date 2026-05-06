import http from "@/libs/interceptor";
import CAR_MODEL_ENDPOINT from "./car-model.endpoint";
import type { CarModelSearchForm, CarModelTable } from "./car-model.type";

class CarModelRepository {
  private static instance: CarModelRepository;
  private constructor() {}
  static getInstance() {
    if (!CarModelRepository.instance)
      CarModelRepository.instance = new CarModelRepository();
    return CarModelRepository.instance;
  }
  getList(params?: CarModelSearchForm) {
    return http.call<{
      content: CarModelTable[];
      totalElements: number;
      totalPages: number;
      page: number;
      size: number;
    }>({ url: CAR_MODEL_ENDPOINT.BASE, method: "GET", params });
  }
  getById(id: number) {
    return http.call<CarModelTable>({
      url: `${CAR_MODEL_ENDPOINT.BASE}/${id}`,
      method: "GET",
    });
  }
  create(data: CarModelSearchForm) {
    return http.call<CarModelTable>({
      url: CAR_MODEL_ENDPOINT.BASE,
      method: "POST",
      data,
    });
  }
  update(id: number, data: CarModelSearchForm) {
    return http.call<CarModelTable>({
      url: `${CAR_MODEL_ENDPOINT.BASE}/${id}`,
      method: "PUT",
      data,
    });
  }
  delete(id: number) {
    return http.call({
      url: `${CAR_MODEL_ENDPOINT.BASE}/${id}`,
      method: "DELETE",
    });
  }
  importFile(file: File) {
    return http.upload<{
      total: number;
      success: number;
      failed: number;
      errors: string[];
    }>({ url: `${CAR_MODEL_ENDPOINT.BASE}/import`, file });
  }
  downloadTemplate() {
    return http.download({
      url: `${CAR_MODEL_ENDPOINT.BASE}/template`,
      filename: "mau-import-dong-xe.xlsx",
    });
  }
  export() {
    return http.download({
      url: `${CAR_MODEL_ENDPOINT.BASE}/export`,
      filename: "danh-sach-dong-xe.xlsx",
    });
  }
}
export const carModelService = CarModelRepository.getInstance();

export const carModelsService = carModelService;
