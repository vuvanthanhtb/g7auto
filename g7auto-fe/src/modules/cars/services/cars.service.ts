import http from "@/libs/interceptor";
import { CARS_ENDPOINT } from "./cars.endpoint";
import type { CarRequest, CarUpdateRequest, CarResponse, CarQuery } from "../shell/cars.type";
import type { AxiosResponse } from "axios";

type AR<T> = Promise<AxiosResponse<T>>;
type CarPage = { content: CarResponse[]; totalElements: number; totalPages: number; page: number; size: number };

const BASE = CARS_ENDPOINT.BASE;

interface ICarsRepository {
  getList(params?: CarQuery): AR<CarPage>;
  getById(id: number): AR<CarResponse>;
  create(data: CarRequest): AR<CarResponse>;
  update(id: number, data: CarUpdateRequest): AR<CarResponse>;
  export(): Promise<void>;
}

class CarsRepository implements ICarsRepository {
  private static instance: CarsRepository;
  private constructor() {}
  static getInstance() {
    if (!CarsRepository.instance) CarsRepository.instance = new CarsRepository();
    return CarsRepository.instance;
  }
  getList(params?: CarQuery): AR<CarPage> { return http.call<CarPage>({ url: BASE, method: "GET", params }); }
  getById(id: number): AR<CarResponse> { return http.call<CarResponse>({ url: `${BASE}/${id}`, method: "GET" }); }
  create(data: CarRequest): AR<CarResponse> { return http.call<CarResponse>({ url: BASE, method: "POST", data }); }
  update(id: number, data: CarUpdateRequest): AR<CarResponse> { return http.call<CarResponse>({ url: `${BASE}/${id}`, method: "PUT", data }); }
  export(): Promise<void> { return http.download({ url: `${BASE}/export`, filename: "danh-sach-xe.xlsx" }); }
}
export const carsService: ICarsRepository = CarsRepository.getInstance();
