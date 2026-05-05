import type { AxiosRequestConfig, AxiosResponse, Method } from "axios";

export interface HttpRequestConfig<
  TData = unknown,
  TParams = unknown,
> extends Omit<
  AxiosRequestConfig<TData>,
  "url" | "method" | "params" | "data"
> {
  url: string;
  method: Method;
  data?: TData;
  params?: TParams;
}

export interface ResponseBase<T = unknown> {
  status: string | number;
  message: string;
  data: T;
}

export type IResponse<T> = Promise<AxiosResponse<T>>;
