import type {
  CarTransferSearchForm,
  CarTransferSearchQuery,
} from "../shell/car-transfers.type";

export const parseFormSearch = (
  data: CarTransferSearchForm,
): CarTransferSearchQuery => {
  const params: CarTransferSearchQuery = { page: data.page, size: data.size };
  if (data.status?.value) params.status = data.status.value;
  return params;
};
