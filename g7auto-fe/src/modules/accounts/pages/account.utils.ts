export type TableRow = Record<string, unknown>;

export const normalize = (v: Record<string, unknown>) =>
  Object.fromEntries(
    Object.entries(v).map(([k, val]) => [
      k,
      val !== null && typeof val === "object" && "value" in val
        ? (val as { value: unknown }).value
        : val,
    ]),
  );
