import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/shell/redux/hooks";
import {
  getContracts,
  createContracts,
  updateContracts,
  deleteContracts,
  getContractsById,
  clearSelectedContracts,
} from "../shell/contracts.slice";
import { contractsService } from "../shell/contracts.service";
import type { ContractRequest, ContractUpdateRequest, ContractSearchForm } from "../shell/contracts.type";
import { contractsInitialValues, initContractSearchForm } from "./contracts.config";
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

export const useContracts = () => {
  const dispatch = useAppDispatch();
  const { selected } = useAppSelector((s) => s.contracts);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [formValues, setFormValues] = useState<Record<string, unknown>>(contractsInitialValues);
  const [searchQuery, setSearchQuery] = useState<ContractSearchForm>(initContractSearchForm);

  useEffect(() => {
    document.title = "Hợp đồng — G7Auto";
  }, []);

  useEffect(() => {
    dispatch(getContracts(searchQuery));
  }, [dispatch, searchQuery]);

  useEffect(() => {
    if (selected && editId) setFormValues(selected as unknown as Record<string, unknown>);
  }, [selected, editId]);

  const openCreate = () => {
    setEditId(null);
    setFormValues(contractsInitialValues);
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

  const handleSubmit = async (data: Record<string, unknown>) => {
    await dispatch(createContracts(data as unknown as ContractRequest));
    closeDrawer();
    dispatch(getContracts(searchQuery));
  };

  const handleUpdate = async (data: Record<string, unknown>) => {
    if (editId) {
      await dispatch(updateContracts({ id: editId, data: data as unknown as ContractUpdateRequest }));
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
    [BTN_EXPORT]: async () => { await contractsService.exportExcel(); },
  };

  const formHandlers = { [BTN_SUBMIT]: handleSubmit };
  const updateFormHandlers = { [BTN_UPDATE]: handleUpdate };

  const handlePageChange = (page: number) => {
    setSearchQuery((prev) => ({ ...prev, page }));
  };

  return {
    drawerOpen, editId, formValues, searchQuery,
    openCreate, closeDrawer, handleCellAction,
    searchHandlers, formHandlers, updateFormHandlers,
    setFormValues, handlePageChange,
  };
};
