import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/shell/redux/hooks";
import {
  getCars,
  createCar,
  updateCar,
  getCarById,
  clearSelectedCar,
  importCars,
  exportCars,
  downloadCarTemplate,
} from "../shell/cars.slice";
import type {
  CarCreateFormValues,
  CarEditFormValues,
  CarRequest,
  CarQuery,
  CarSearchForm,
  CarUpdateRequest,
} from "../shell/cars.type";
import { carCreateInitialValues, carEditInitialValues, initCarSearchForm } from "./cars.config";
import {
  BTN_SEARCH,
  BTN_REFRESH,
  BTN_EXPORT,
  BTN_EDIT,
  BTN_SUBMIT,
  BTN_IMPORT,
  BTN_TEMPLATE,
} from "@/libs/constants/button.constant";
import { toast } from "react-toastify";
import { getApiErrorMessage } from "@/libs/interceptor/helpers";
import { getAllShowrooms } from "@/modules/showrooms/shell/showrooms.slice";
import { getAllCarModels } from "@/modules/car-models/shell/car-models.slice";
import { carStatusOptions } from "@/libs/constants/options.constant";

type TableRow = Record<string, unknown>;

const parseSearchForm = (form: CarSearchForm): CarQuery => ({
  status: (form.status?.value as string) || undefined,
  showroomId: (form.showroom?.value as number) || undefined,
  carModelId: (form.carModel?.value as number) || undefined,
  licensePlate: form.licensePlate || undefined,
  page: form.page,
  size: form.size,
});

export const useCars = () => {
  const dispatch = useAppDispatch();
  const { selected } = useAppSelector((s) => s.cars);
  const showroomAll = useAppSelector((s) => s.showrooms.showroomAll) ?? [];
  const carModelAll = useAppSelector((s) => s.carModels.carModelAll) ?? [];
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [createFormValues, setCreateFormValues] = useState<CarCreateFormValues>(carCreateInitialValues);
  const [editFormValues, setEditFormValues] = useState<CarEditFormValues>(carEditInitialValues);
  const [searchQuery, setSearchQuery] =
    useState<CarSearchForm>(initCarSearchForm);
  const importInputRef = useRef<HTMLInputElement>(null);

  const showroomOptions = showroomAll.map((s) => ({
    label: s.name,
    value: s.id,
  }));
  const carModelOptions = carModelAll.map((m) => ({
    label: m.name,
    value: m.id,
  }));

  useEffect(() => {
    document.title = "Kho xe — G7Auto";
    dispatch(getAllShowrooms());
    dispatch(getAllCarModels());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCars(parseSearchForm(searchQuery)));
  }, [dispatch, searchQuery]);

  useEffect(() => {
    if (selected && editId) {
      setEditFormValues({
        licensePlate: selected.licensePlate ?? "",
        showroomId: selected.showroomId
          ? { label: selected.showroomName, value: selected.showroomId }
          : null,
        salePrice: selected.salePrice ?? "",
        status: selected.status
          ? (carStatusOptions.find((o) => o.value === selected.status) ?? null)
          : null,
        notes: selected.notes ?? "",
      });
    }
  }, [selected, editId]);

  const openCreate = () => {
    setEditId(null);
    setCreateFormValues(carCreateInitialValues);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    dispatch(clearSelectedCar());
  };

  const handleCellAction = (row: TableRow, key?: string) => {
    if (key === BTN_EDIT) {
      setEditId(row.id as number);
      dispatch(getCarById(row.id as number));
      setDrawerOpen(true);
    }
  };

  const toId = (v: unknown): number | undefined =>
    (v as { value?: number } | null)?.value ?? undefined;

  const handleSubmit = async (data: Record<string, unknown>) => {
    if (editId) {
      const updateData: CarUpdateRequest = {
        licensePlate: data.licensePlate as string,
        showroomId: toId(data.showroomId),
        salePrice: data.salePrice as number,
        status: (data.status as { value?: string } | null)?.value,
        notes: data.notes as string,
      };
      await dispatch(updateCar({ id: editId, data: updateData }));
    } else {
      const createData: CarRequest = {
        chassisNumber: data.chassisNumber as string,
        engineNumber: data.engineNumber as string,
        licensePlate: data.licensePlate as string,
        carModelId: toId(data.carModelId)!,
        showroomId: toId(data.showroomId)!,
        salePrice: data.salePrice as number,
        notes: data.notes as string,
      };
      await dispatch(createCar(createData));
    }
    closeDrawer();
    dispatch(getCars(parseSearchForm(searchQuery)));
  };

  const handleImportFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";
    const result = await dispatch(importCars(file));
    if (importCars.fulfilled.match(result) && result.payload) {
      const { success, failed, errors } = result.payload;
      toast.success(`Import thành công ${success} xe, thất bại ${failed} xe`);
      if (errors.length > 0) {
        errors.forEach((err) => toast.warning(err, { autoClose: 8000 }));
      }
      dispatch(getCars(parseSearchForm(searchQuery)));
    }
  };

  const searchHandlers = {
    [BTN_SEARCH]: (values: CarSearchForm) => {
      setSearchQuery({ ...values, page: 1 });
    },
    [BTN_REFRESH]: () => {
      setSearchQuery(initCarSearchForm);
    },
    [BTN_EXPORT]: async () => { await dispatch(exportCars()); },
    [BTN_IMPORT]: () => { importInputRef.current?.click(); },
    [BTN_TEMPLATE]: async () => { await dispatch(downloadCarTemplate()); },
  };

  const formHandlers = { [BTN_SUBMIT]: handleSubmit };

  const handlePageChange = (page: number) => {
    setSearchQuery((prev) => ({ ...prev, page }));
  };

  return {
    drawerOpen,
    editId,
    createFormValues,
    editFormValues,
    searchQuery,
    showroomOptions,
    carModelOptions,
    openCreate,
    closeDrawer,
    handleCellAction,
    searchHandlers,
    formHandlers,
    setCreateFormValues,
    setEditFormValues,
    handlePageChange,
    importInputRef,
    handleImportFile,
    handleImport: searchHandlers[BTN_IMPORT],
    handleTemplate: searchHandlers[BTN_TEMPLATE],
  };
};
