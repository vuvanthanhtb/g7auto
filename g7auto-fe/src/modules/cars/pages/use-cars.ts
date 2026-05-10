import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/shell/redux/hooks";
import { getCars, createCar, updateCar, getCarById, clearSelectedCar } from "../shell/cars.slice";
import { carsService } from "../shell/cars.service";
import type { CarRequest, CarSearchForm, CarUpdateRequest } from "../shell/cars.type";
import { carCreateInitialValues, initCarSearchForm } from "./cars.config";
import { BTN_SEARCH, BTN_REFRESH, BTN_EXPORT, BTN_EDIT, BTN_SUBMIT } from "@/libs/constants/button.constant";

type TableRow = Record<string, unknown>;

export const useCars = () => {
  const dispatch = useAppDispatch();
  const { selected } = useAppSelector((s) => s.cars);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [formValues, setFormValues] = useState<Record<string, unknown>>(carCreateInitialValues);
  const [searchQuery, setSearchQuery] = useState<CarSearchForm>(initCarSearchForm);

  useEffect(() => {
    document.title = "Kho xe — G7Auto";
  }, []);

  useEffect(() => {
    dispatch(getCars(searchQuery));
  }, [dispatch, searchQuery]);

  useEffect(() => {
    if (selected && editId) {
      setFormValues({
        licensePlate: selected.licensePlate ?? "",
        showroomId: selected.showroomId ?? "",
        salePrice: selected.salePrice ?? "",
        status: selected.status ?? "",
        notes: selected.notes ?? "",
      });
    }
  }, [selected, editId]);

  const openCreate = () => {
    setEditId(null);
    setFormValues(carCreateInitialValues);
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

  const handleSubmit = async (data: Record<string, unknown>) => {
    if (editId) {
      const updateData: CarUpdateRequest = {
        licensePlate: data.licensePlate as string,
        showroomId: data.showroomId as number,
        salePrice: data.salePrice as number,
        status: data.status as string,
        notes: data.notes as string,
      };
      await dispatch(updateCar({ id: editId, data: updateData }));
    } else {
      await dispatch(createCar(data as unknown as CarRequest));
    }
    closeDrawer();
    dispatch(getCars(searchQuery));
  };

  const searchHandlers = {
    [BTN_SEARCH]: (values: CarSearchForm) => {
      setSearchQuery({ ...values, page: 1 });
    },
    [BTN_REFRESH]: () => {
      setSearchQuery(initCarSearchForm);
    },
    [BTN_EXPORT]: async () => { await carsService.export(); },
  };

  const formHandlers = { [BTN_SUBMIT]: handleSubmit };

  const handlePageChange = (page: number) => {
    setSearchQuery((prev) => ({ ...prev, page }));
  };

  return {
    drawerOpen, editId, formValues, searchQuery,
    openCreate, closeDrawer, handleCellAction, searchHandlers, formHandlers,
    setFormValues, handlePageChange,
  };
};
