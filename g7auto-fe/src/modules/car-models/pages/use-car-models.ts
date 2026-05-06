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
import { carModelInitialValues } from "./car-models.config";
import {
  BTN_SEARCH,
  BTN_REFRESH,
  BTN_EXPORT,
  BTN_EDIT,
  BTN_DELETE,
  BTN_SUBMIT,
} from "@/libs/constants/button.constant";
import type { CarModelSearchForm } from "../shell/car-model.type";

type TableRow = Record<string, unknown>;

export const useCarModels = () => {
  const dispatch = useAppDispatch();
  const confirm = useConfirm();
  const { selected } = useAppSelector((s) => s.carModels);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [formValues, setFormValues] = useState<CarModelSearchForm>(
    carModelInitialValues,
  );
  const [searchParams, setSearchParams] = useState<CarModelSearchForm>({});

  useEffect(() => {
    document.title = "Dòng xe — G7Auto";
    dispatch(getCarModels({ page: 1, size: 10, ...searchParams }));
  }, [dispatch, searchParams]);

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
      const ok = await confirm(`Xóa dòng xe "${row.name}"?`);
      if (ok) {
        await dispatch(deleteCarModel(row.id as number));
        dispatch(getCarModels({ page: 1, size: 10, ...searchParams }));
      }
    }
  };

  const handleSubmit = async (data: CarModelSearchForm) => {
    if (editId)
      await dispatch(
        updateCarModel({
          id: editId,
          data,
        }),
      );
    else await dispatch(createCarModel(data));
    closeDrawer();
    dispatch(getCarModels({ page: 1, size: 10, ...searchParams }));
  };

  const searchHandlers = {
    [BTN_SEARCH]: (values: Record<string, unknown>) => {
      dispatch(getCarModels({ ...values, page: 1, size: 10 }));
    },
    [BTN_REFRESH]: () => {
      dispatch(getCarModels({ page: 1, size: 10, ...searchParams }));
    },
    [BTN_EXPORT]: async () => {
      await carModelsService.export();
    },
  };

  const handleFormChange = (values: CarModelSearchForm) => {
    setFormValues(values);
  };

  const formHandlers = { [BTN_SUBMIT]: handleSubmit };

  const handlePageChange = (page: number) => {
    setSearchParams({ ...searchParams, page });
    dispatch(getCarModels({ ...searchParams, page }));
  };

  return {
    drawerOpen,
    editId,
    formValues,
    openCreate,
    closeDrawer,
    handleCellAction,
    searchHandlers,
    formHandlers,
    setFormValues,
    handlePageChange,
    handleFormChange,
  };
};
