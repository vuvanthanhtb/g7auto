export type UploadConfig<TParams = unknown, TExtraData extends Record<string, unknown> = Record<string, unknown>> = {
  url: string;
  method?: "POST" | "PUT" | "GET";
  file: File | Blob;
  params?: TParams;
  data?: TExtraData;
  headers?: Record<string, string>;
};

export const buildFormData = (file: File | Blob, data?: Record<string, unknown>): FormData => {
  const formData = new FormData();
  formData.append("file", file);
  if (data) Object.keys(data).forEach((key) => formData.append(key, String(data[key])));
  return formData;
};

export const handleUploadError = async (error: unknown): Promise<never> => {
  const data = (error as { response?: { data?: unknown } })?.response?.data;
  if (data instanceof Blob) {
    const { readBlobAsText } = await import("./helpers");
    const text = await readBlobAsText(data);
    try { throw JSON.parse(text); } catch { throw new Error(text); }
  }
  throw error;
};
