import { axiosClient } from "./axios-client";
import type { HttpRequestConfig } from "./types";
import "./interceptor";
import { removeEmpty } from "./helpers";
import {
  handleDownloadFile,
  handleDownloadError,
  type DownloadConfig,
} from "./download";
import { buildFormData, handleUploadError, type UploadConfig } from "./upload";

const call = async <TResponse = unknown, TData = unknown, TParams = unknown>(
  config: HttpRequestConfig<TData, TParams>,
) => {
  const { url, method = "GET", params, data, ...rest } = config;
  return axiosClient.request<TResponse>({
    url,
    method,
    params: removeEmpty(params),
    data,
    ...rest,
  });
};

const upload = <
  TResponse = unknown,
  TParams = unknown,
  TExtraData extends Record<string, unknown> = Record<string, unknown>,
>(
  config: UploadConfig<TParams, TExtraData>,
) => {
  const { url, method = "POST", file, params, data, headers } = config;
  return axiosClient
    .request<TResponse>({
      url,
      method,
      params: removeEmpty(params),
      data: buildFormData(file, data),
      headers,
      transformRequest: [
        (reqData: unknown, reqHeaders: Record<string, unknown>) => {
          // AxiosHeaders in v1.x is case-insensitive — use .delete() when available,
          // otherwise fall back to removing both cases as plain keys.
          const h = reqHeaders as Record<string, unknown> & {
            delete?: (key: string) => void;
          };
          if (typeof h.delete === "function") {
            h.delete("Content-Type");
          } else {
            delete h["Content-Type"];
            delete h["content-type"];
          }
          return reqData;
        },
      ],
    })
    .catch((err: unknown) => handleUploadError(err));
};

const download = <TParams = unknown, TData = unknown>(
  config: DownloadConfig<TParams, TData>,
) => {
  const { url, method = "GET", params, data, filename, isOpen } = config;
  return call<Blob>({ url, method, params, data, responseType: "blob" })
    .then((res) => handleDownloadFile(res, filename, isOpen))
    .catch((err: unknown) => handleDownloadError(err));
};

const http = { call, upload, download };
export default http;
