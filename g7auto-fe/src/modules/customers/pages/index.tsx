import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import BaseTableComponent from "@/libs/components/ui/base-table";
import BaseDrawer from "@/libs/components/ui/base-drawer";
import BaseFormComponent from "@/libs/components/ui/base-form";
import ImportButton from "@/libs/components/ui/import-button";
import { customersService } from "../services/customers.service";
import { useAppDispatch } from "@/shell/redux/hooks";
import { getCustomers } from "../shell/customers.slice";
import {
  getCustomerColumns,
  getCustomerFormConfig,
  getCustomerSearchConfig,
} from "./customers.config";
import { customerValidation } from "./customers.validation";
import { BTN_SUBMIT } from "@/libs/constants/button.constant";
import { useCustomers } from "./use-customers";
import { t } from "@/libs/i18n";
import type {
  CustomerFormValues,
  CustomerSearchForm,
} from "../shell/customers.type";

const CustomersPage = () => {
  const dispatch = useAppDispatch();
  const {
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
  } = useCustomers();

  return (
    <>
      <BaseFormComponent<CustomerSearchForm>
        formConfig={getCustomerSearchConfig()}
        values={searchQuery}
        handlers={searchHandlers}
      />
      <BaseTableComponent
        tableConfig={getCustomerColumns()}
        reducer="customers"
        state="customerTable"
        title={t("CUSTOMERS_PAGE_HEADER")}
        extra={
          <div style={{ display: "flex", gap: 8 }}>
            <ImportButton
              onImport={(file) =>
                customersService.importFile(file).then((r) => r?.data)
              }
              onDownloadTemplate={() => customersService.downloadTemplate()}
              onSuccess={() => dispatch(getCustomers(searchQuery))}
            />
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={openCreate}
            >
              {t("CUSTOMERS_BTN_ADD")}
            </Button>
          </div>
        }
        handleCellAction={handleCellAction}
        handlePageChange={handlePageChange}
      />
      <BaseDrawer
        open={drawerOpen}
        title={editId ? t("CUSTOMERS_DRAWER_EDIT") : t("CUSTOMERS_BTN_ADD")}
        onClose={closeDrawer}
      >
        <BaseFormComponent<CustomerFormValues>
          formConfig={getCustomerFormConfig()}
          validationSchema={customerValidation}
          values={formValues}
          onChange={setFormValues}
          handlers={{
            [BTN_SUBMIT]: formHandlers[BTN_SUBMIT],
          }}
        />
      </BaseDrawer>
    </>
  );
};

export default CustomersPage;
