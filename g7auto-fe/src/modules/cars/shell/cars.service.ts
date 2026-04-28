import http from "@/libs/interceptor";
import CARS_ENDPOINT from "./cars.endpoint";
import type { CarRequest, CarUpdateRequest, CarResponse, CarQuery } from "./cars.type";

class CarsRepository {
  private static instance: CarsRepository;
  private constructor() {}
  static getInstance() { if (!CarsRepository.instance) CarsRepository.instance = new CarsRepository(); return CarsRepository.instance; }
  getList(params?: CarQuery) { return http.call<{ content: CarResponse[]; totalElements: number; totalPages: number; page: number; size: number }>({ url: CARS_ENDPOINT.BASE, method: "GET", params }); }
  getById(id: number) { return http.call<CarResponse>({ url: `${CARS_ENDPOINT.BASE}/${id}`, method: "GET" }); }
  create(data: CarRequest) { return http.call<CarResponse>({ url: CARS_ENDPOINT.BASE, method: "POST", data }); }
  update(id: number, data: CarUpdateRequest) { return http.call<CarResponse>({ url: `${CARS_ENDPOINT.BASE}/${id}`, method: "PUT", data }); }
  export() { return http.download({ url: `${CARS_ENDPOINT.BASE}/export`, filename: "danh-sach-xe.xlsx" }); }
}
export const carsService = CarsRepository.getInstance();
