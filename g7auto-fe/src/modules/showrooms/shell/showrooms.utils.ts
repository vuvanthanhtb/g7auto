import moment from "moment";
import type {
  ShowroomExportPayload,
  ShowroomPayload,
  ShowroomSearchForm,
} from "./showroom.type";

export const parseShowroomSearch = (
  data: ShowroomSearchForm,
): ShowroomPayload => ({
  ...data,
  fromDate: moment(data.fromDate).format("YYYY-MM-DD"),
  toDate: moment(data.toDate).format("YYYY-MM-DD"),
});

export const parseShowroomExport = (
  data: ShowroomSearchForm,
): ShowroomExportPayload => ({
  name: data.name,
  phone: data.phone,
  fromDate: data.fromDate
    ? moment(data.fromDate).format("YYYY-MM-DD")
    : undefined,
  toDate: data.toDate ? moment(data.toDate).format("YYYY-MM-DD") : undefined,
});
