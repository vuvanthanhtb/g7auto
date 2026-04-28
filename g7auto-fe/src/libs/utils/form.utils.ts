export const normalizeFormValues = (v: Record<string, unknown>): Record<string, unknown> =>
  Object.fromEntries(
    Object.entries(v).map(([k, val]) => [
      k,
      val !== null && typeof val === "object" && "value" in val
        ? (val as { value: unknown }).value
        : val,
    ]),
  );
