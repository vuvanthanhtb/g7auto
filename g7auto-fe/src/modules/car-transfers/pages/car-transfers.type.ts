export interface CarTransferSearchForm {
  status: { label: string; value: string };
  page: number;
  size: number;
}

export interface CarTransferSearchQuery {
  status?: string;
  page: number;
  size: number;
}
