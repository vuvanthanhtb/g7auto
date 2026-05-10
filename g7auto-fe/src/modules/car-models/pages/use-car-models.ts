import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/shell/redux/hooks";
import {
  getCarModels,
  createCarModel,
  updateCarModel,
  deleteCarModel,
  getCarModelById,
  clearSelectedCarModel,
} from "../shell/car-models.slice";
import { carModelsService } from "../shell/car-model.service";
import { useConfirm } from "@/libs/components/ui/confirm-dialog";
import { carModelInitialValues, initCarModelSearchForm } from "./car-models.config";
import {
  BTN_SEARCH,
  BTN_REFRESH,
  BTN_EXPORT,
  BTN_EDIT,
  BTN_DELETE,
  BTN_SUBMIT,
} from "@/libs/constants/button.constant";
import type {
  CarModelExportPayload,
  CarModelPayload,
  CarModelRequest,
  CarModelSearchForm,
} from "../shell/car-model.type";

type TableRow = Record<string, unknown>;

export const useCarModels = () => {
  const dispatch = useAppDispatch();
  const confirm = useConfirm();
  const { selected } = useAppSelector((s) => s.carModels);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [formValues, setFormValues] = useState<Record<string, unknown>>(
    carModelInitialValues,
  );
  const [searchQuery, setSearchQuery] = useState<CarModelSearchForm>(
    initCarModelSearchForm,
  );

  const toPayload = (form: CarModelSearchForm): CarModelPayload => ({
    name: form.name || undefined,
    manufacturer: form.manufacturer || undefined,
    year: form.year || undefined,
    page: form.page,
    size: form.size,
  });

  const toExportPayload = (form: CarModelSearchForm): CarModelExportPayload => ({
    name: form.name || undefined,
    manufacturer: form.manufacturer || undefined,
    year: form.year || undefined,
  });

  useEffect(() => {
    document.title = "Dòng xe — G7Auto";
  }, []);

  useEffect(() => {
    dispatch(getCarModels(toPayload(searchQuery)));
  }, [dispatch, searchQuery]);

  useEffect(() => {
    if (selected && editId)
      setFormValues(selected as unknown as Record<string, unknown>);
  }, [selected, editId]);

  const openCreate = () => {
    setEditId(null);
    setFormValues(carModelInitialValues);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    dispatch(clearSelectedCarModel());
  };

  const handleCellAction = async (row: TableRow, key?: string) => {
    if (key === BTN_EDIT) {
      setEditId(row.id as number);
      dispatch(getCarModelById(row.id as number));
      setDrawerOpen(true);
    }
    if (key === BTN_DELETE) {
      const ok = await confirm(`Xóa dòng xe "${row.name}"?`, {
        danger: true,
        confirmText: "Xóa",
      });
      if (ok) {
        await dispatch(deleteCarModel(row.id as number));
        dispatch(getCarModels(toPayload(searchQuery)));
      }
    }
  };

  const handleSubmit = async (data: Record<string, unknown>) => {
    const payload = {
      ...data,
      listedPrice: data.listedPrice ? Number(data.listedPrice) : undefined,
      year: data.year ? String(data.year) : undefined,
    } as CarModelRequest;
    if (editId)
      await dispatch(updateCarModel({ id: editId, data: payload }));
    else
      await dispatch(createCarModel(payload));
    closeDrawer();
    dispatch(getCarModels(toPayload(searchQuery)));
  };

  const searchHandlers = {
    [BTN_SEARCH]: (values: CarModelSearchForm) => {
      setSearchQuery({ ...values, page: 1 });
    },
    [BTN_REFRESH]: () => {
      setSearchQuery(initCarModelSearchForm);
    },
    [BTN_EXPORT]: async () => {
      await carModelsService.exportExcel(toExportPayload(searchQuery));
    },
  };

  const formHandlers = { [BTN_SUBMIT]: handleSubmit };

  const handlePageChange = (page: number) => {
    setSearchQuery((prev) => ({ ...prev, page }));
  };

  return {
    drawerOpen,
    editId,
    formValues,
    searchQuery,
    openCreate,
    closeDrawer,
    handleCellAction,
    searchHandlers,
    formHandlers,
    setFormValues,
    handlePageChange,
  };
};
