import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/shell/redux/hooks";
import {
  getContracts,
  createContracts,
  updateContracts,
  deleteContracts,
  getContractsById,
  clearSelectedContracts,
  exportContracts,
} from "../shell/contracts.slice";
import { getAllCustomers } from "@/modules/customers/shell/customers.slice";
import { getAllCars } from "@/modules/cars/shell/cars.slice";
import { getAllEmployees } from "@/modules/employees/shell/employees.slice";
import { getAllDeposits } from "@/modules/deposits/shell/deposits.slice";
import type {
  ContractCreateFormValues,
  ContractUpdateFormValues,
  ContractRequest,
  ContractUpdateRequest,
  ContractSearchForm,
} from "../shell/contracts.type";
import {
  contractsInitialValues,
  contractsUpdateInitialValues,
  initContractSearchForm,
} from "./contracts.config";
import { contractStatusOptions } from "@/libs/constants/options.constant";
import {
  BTN_SEARCH,
  BTN_REFRESH,
  BTN_EXPORT,
  BTN_DETAIL,
  BTN_DELETE,
  BTN_SUBMIT,
  BTN_UPDATE,
} from "@/libs/constants/button.constant";

type TableRow = Record<string, unknown>;

const toId = (v: unknown) => (v as { value?: number } | null)?.value;

export const useContracts = () => {
  const dispatch = useAppDispatch();
  const { selected } = useAppSelector((s) => s.contracts);
  const customerAll = useAppSelector((s) => s.customers.customerAll) ?? [];
  const carAll = useAppSelector((s) => s.cars.carAll) ?? [];
  const employeeAll = useAppSelector((s) => s.employees.employeeAll) ?? [];
  const depositAll = useAppSelector((s) => s.deposits.depositAll) ?? [];

  const customerOptions = customerAll.map((c) => ({
    label: c.fullName,
    value: c.id,
  }));
  const carOptions = carAll.map((c) => ({
    label: `${c.chassisNumber}${c.licensePlate ? ` — ${c.licensePlate}` : ""}`,
    value: c.id,
  }));
  const employeeOptions = employeeAll.map((e) => ({
    label: e.fullName,
    value: e.id,
  }));
  const depositOptions = depositAll.map((d) => ({
    label: `#${d.id} — ${d.customerFullName} — ${d.carChassisNumber}`,
    value: d.id,
  }));

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [createFormValues, setCreateFormValues] =
    useState<ContractCreateFormValues>(contractsInitialValues);
  const [updateFormValues, setUpdateFormValues] =
    useState<ContractUpdateFormValues>(contractsUpdateInitialValues);
  const [searchQuery, setSearchQuery] = useState<ContractSearchForm>(
    initContractSearchForm,
  );

  useEffect(() => {
    document.title = "Hợp đồng — G7Auto";
    dispatch(getAllCustomers());
    dispatch(getAllCars());
    dispatch(getAllEmployees());
    dispatch(getAllDeposits());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getContracts(searchQuery));
  }, [dispatch, searchQuery]);

  useEffect(() => {
    if (selected && editId)
      setUpdateFormValues({
        actualDeliveryDate: selected.actualDeliveryDate ?? "",
        status: selected.status
          ? (contractStatusOptions.find((o) => o.value === selected.status) ??
            null)
          : null,
        notes: selected.notes ?? "",
      });
  }, [selected, editId]);

  const openCreate = () => {
    setEditId(null);
    setCreateFormValues(contractsInitialValues);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    dispatch(clearSelectedContracts());
  };

  const handleCellAction = async (row: TableRow, key?: string) => {
    if (key === BTN_DETAIL) {
      setEditId(row.id as number);
      dispatch(getContractsById(row.id as number));
      setDrawerOpen(true);
    }
    if (key === BTN_DELETE) {
      await dispatch(deleteContracts(row.id as number));
      dispatch(getContracts(searchQuery));
    }
  };

  const handleCreate = async (data: ContractCreateFormValues) => {
    const body: ContractRequest = {
      customerId: toId(data.customerId)!,
      carId: toId(data.carId)!,
      employeeId: toId(data.employeeId),
      depositId: toId(data.depositId),
      signDate: data.signDate,
      expectedDeliveryDate: data.expectedDeliveryDate || undefined,
      contractValue: Number(data.contractValue),
      notes: data.notes || undefined,
    };
    await dispatch(createContracts(body));
    closeDrawer();
    dispatch(getContracts(searchQuery));
  };

  const handleUpdate = async (data: ContractUpdateFormValues) => {
    if (editId) {
      const body: ContractUpdateRequest = {
        actualDeliveryDate: data.actualDeliveryDate,
        status: data.status?.value as any,
        notes: data.notes,
      };
      await dispatch(
        updateContracts({
          id: editId,
          data: body,
        }),
      );
      closeDrawer();
      dispatch(getContracts(searchQuery));
    }
  };

  const searchHandlers = {
    [BTN_SEARCH]: (values: ContractSearchForm) => {
      setSearchQuery({ ...values, page: 1 });
    },
    [BTN_REFRESH]: () => {
      setSearchQuery(initContractSearchForm);
    },
    [BTN_EXPORT]: async () => {
      await dispatch(exportContracts());
    },
  };

  const createFormHandlers = {
    [BTN_SUBMIT]: handleCreate as (data: unknown) => Promise<void>,
  };
  const updateFormHandlers = { [BTN_UPDATE]: handleUpdate };

  const handlePageChange = (page: number) => {
    setSearchQuery((prev) => ({ ...prev, page }));
  };

  return {
    drawerOpen,
    editId,
    createFormValues,
    updateFormValues,
    searchQuery,
    customerOptions,
    carOptions,
    employeeOptions,
    depositOptions,
    openCreate,
    closeDrawer,
    handleCellAction,
    searchHandlers,
    createFormHandlers,
    updateFormHandlers,
    setCreateFormValues,
    setUpdateFormValues,
    handlePageChange,
  };
};
