import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/shell/redux/hooks";
import {
  getCustomers,
  createCustomer,
  updateCustomer,
  getCustomerById,
  clearSelectedCustomer,
} from "../shell/customers.slice";
import { customersService } from "../shell/customers.service";
import type { CustomerRequest } from "../shell/customers.type";
import { customerInitialValues } from "./customers.config";
import {
  BTN_SEARCH,
  BTN_REFRESH,
  BTN_EXPORT,
  BTN_EDIT,
  BTN_SUBMIT,
} from "@/libs/constants/button.constant";
import { normalizeFormValues } from "@/libs/utils";

type TableRow = Record<string, unknown>;

export const useCustomers = () => {
  const dispatch = useAppDispatch();
  const { selected } = useAppSelector((s) => s.customers);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [formValues, setFormValues] = useState<Record<string, unknown>>(
    customerInitialValues,
  );
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useState<Record<string, unknown>>({});

  useEffect(() => {
    document.title = "Khách hàng — G7Auto";
    dispatch(getCustomers({ page, size: 10, ...searchParams }));
  }, [dispatch, page, searchParams]);

  useEffect(() => {
    if (selected && editId)
      setFormValues(selected as unknown as Record<string, unknown>);
  }, [selected, editId]);

  const openCreate = () => {
    setEditId(null);
    setFormValues(customerInitialValues);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    dispatch(clearSelectedCustomer());
  };

  const handleCellAction = (row: TableRow, key?: string) => {
    if (key === BTN_EDIT) {
      setEditId(row.id as number);
      dispatch(getCustomerById(row.id as number));
      setDrawerOpen(true);
    }
  };

  const handleSubmit = async (data: Record<string, unknown>) => {
    if (editId)
      await dispatch(
        updateCustomer({
          id: editId,
          data: data as unknown as CustomerRequest,
        }),
      );
    else await dispatch(createCustomer(data as unknown as CustomerRequest));
    closeDrawer();
    dispatch(getCustomers({ page, size: 10, ...searchParams }));
  };

  const searchHandlers = {
    [BTN_SEARCH]: (values: Record<string, unknown>) => {
      setSearchParams(normalizeFormValues(values));
      setPage(1);
    },
    [BTN_REFRESH]: () => {
      dispatch(getCustomers({ page, size: 10, ...searchParams }));
    },
    [BTN_EXPORT]: async () => {
      await customersService.export();
    },
  };

  const formHandlers = { [BTN_SUBMIT]: handleSubmit };

  return {
    drawerOpen,
    editId,
    formValues,
    page,
    openCreate,
    closeDrawer,
    handleCellAction,
    searchHandlers,
    formHandlers,
    setFormValues,
    setPage,
  };
};
