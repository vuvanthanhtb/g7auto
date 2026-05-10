import type { TableRow } from "@/modules/accounts/pages/account.utils";
import { APPROVED, REJECTED, ACTIVE, LEAVED } from "../constants";

export const colorStatusCell = (refColor: string[], row: TableRow) => {
  const status = row[refColor[0]] as string;
  if ([ACTIVE, APPROVED].includes(status)) {
    return "#0000ffb5";
  }
  if ([REJECTED, LEAVED].includes(status)) {
    return "#ff0000b3";
  }
  return "#000";
};
