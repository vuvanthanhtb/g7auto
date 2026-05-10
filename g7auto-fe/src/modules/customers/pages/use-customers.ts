import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/shell/redux/hooks";
import {
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomerById,
  clearSelectedCustomer,
} from "../shell/customers.slice";
import { customersService } from "../services/customers.service";
import { useConfirm } from "@/libs/components/ui/confirm-dialog";
import type {
  CustomerFormValues,
  CustomerRequest,
  CustomerSearchForm,
} from "../shell/customers.type";
import {
  customerCreateInitialValues,
  initCustomerSearchForm,
} from "./customers.config";
import {
  BTN_SEARCH,
  BTN_REFRESH,
  BTN_EXPORT,
  BTN_EDIT,
  BTN_DELETE,
  BTN_SUBMIT,
} from "@/libs/constants/button.constant";
import { t } from "@/libs/i18n";
import { parseCustomerExport } from "./customers.utils";

type TableRow = Record<string, unknown>;

export const useCustomers = () => {
  const dispatch = useAppDispatch();
  const confirm = useConfirm();
  const { selected } = useAppSelector((s) => s.customers);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [formValues, setFormValues] = useState<CustomerFormValues>(
    customerCreateInitialValues,
  );
  const [searchQuery, setSearchQuery] = useState<CustomerSearchForm>(
    initCustomerSearchForm,
  );

  useEffect(() => {
    document.title = t("CUSTOMERS_PAGE_TITLE");
  }, []);

  useEffect(() => {
    dispatch(getCustomers(searchQuery));
  }, [dispatch, searchQuery]);

  useEffect(() => {
    if (selected && editId) {
      setFormValues({
        fullName: selected.fullName ?? "",
        phone: selected.phone ?? "",
        email: selected.email ?? "",
        nationalId: selected.nationalId ?? "",
        address: selected.address ?? "",
        birthDate: selected.birthDate ?? "",
        sourceType: selected.sourceType ?? "",
        carInterest: selected.carInterest ?? "",
        notes: selected.notes ?? "",
      });
    }
  }, [selected, editId]);

  const openCreate = () => {
    setEditId(null);
    setFormValues(customerCreateInitialValues);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    dispatch(clearSelectedCustomer());
  };

  const handleCellAction = async (row: TableRow, key?: string) => {
    if (key === BTN_EDIT) {
      setEditId(row.id as number);
      dispatch(getCustomerById(row.id as number));
      setDrawerOpen(true);
    } else if (key === BTN_DELETE) {
      const ok = await confirm(
        `Bạn có chắc muốn xoá khách hàng "${row.fullName}"?`,
        { danger: true, confirmText: "Xoá" },
      );
      if (!ok) return;
      dispatch(deleteCustomer(row.id as number)).then(() => {
        dispatch(getCustomers(searchQuery));
      });
    }
  };

  const handleSubmit = async (data: CustomerFormValues) => {
    const payload: CustomerRequest = {
      fullName: data.fullName,
      phone: data.phone,
      email: data.email || undefined,
      nationalId: data.nationalId || undefined,
      address: data.address || undefined,
      birthDate: data.birthDate || undefined,
      sourceType: data.sourceType || undefined,
      carInterest: data.carInterest || undefined,
      notes: data.notes || undefined,
    };
    if (editId) {
      await dispatch(updateCustomer({ id: editId, data: payload }));
    } else {
      await dispatch(createCustomer(payload));
    }
    closeDrawer();
    dispatch(getCustomers(searchQuery));
  };

  const searchHandlers = {
    [BTN_SEARCH]: (values: CustomerSearchForm) => {
      setSearchQuery({ ...values, page: 1 });
    },
    [BTN_REFRESH]: () => {
      dispatch(getCustomers(initCustomerSearchForm));
    },
    [BTN_EXPORT]: async () => {
      await customersService.export(parseCustomerExport(searchQuery));
    },
  };

  const formHandlers = {
    [BTN_SUBMIT]: handleSubmit as (data: unknown) => Promise<void>,
  };

  const handlePageChange = (page: number) => {
    setSearchQuery({ ...searchQuery, page });
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
    searchQuery,
  };
};
