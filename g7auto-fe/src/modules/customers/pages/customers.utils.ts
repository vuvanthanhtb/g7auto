import moment from "moment";
import type {
  CustomerExportPayload,
  CustomerPayload,
  CustomerSearchForm,
} from "../shell/customers.type";

export const parseCustomerSearch = (
  data: CustomerSearchForm,
): CustomerPayload => ({
  ...data,
  fromDate: moment(data.fromDate).format("YYYY-MM-DD"),
  toDate: moment(data.toDate).format("YYYY-MM-DD"),
});

export const parseCustomerExport = (
  data: CustomerSearchForm,
): CustomerExportPayload => ({
  fullName: data.fullName,
  phone: data.phone,
  email: data.email,
  nationalId: data.nationalId,
  fromDate: moment(data.fromDate).format("YYYY-MM-DD"),
  toDate: moment(data.toDate).format("YYYY-MM-DD"),
});
