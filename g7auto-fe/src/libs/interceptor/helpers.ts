export const readBlobAsText = (blob: Blob): Promise<string> =>
  new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.readAsText(blob);
  });

type ApiErrorResponse = {
  response: { data: { message: string; [key: string]: unknown } };
};

export const getApiErrorMessage = (error: unknown, fallback = ""): string => {
  if (typeof error === "object" && error !== null && "response" in error) {
    const err = error as ApiErrorResponse;
    const msg = err.response?.data?.message;
    if (typeof msg === "string" && msg.trim()) return msg;
  }
  if (error instanceof Error && error.message) return error.message;
  return fallback;
};

export const removeEmpty = (obj: unknown): unknown => {
  if (obj === null || typeof obj !== "object" || obj instanceof FormData || obj instanceof Blob) {
    return obj;
  }
  if (Array.isArray(obj)) return obj;
  const source = obj as Record<string, unknown>;
  const newObj: Record<string, unknown> = {};
  Object.keys(source).forEach((key) => {
    if (source[key] !== "" && source[key] !== null && source[key] !== undefined) {
      newObj[key] = source[key];
    }
  });
  return newObj;
};
