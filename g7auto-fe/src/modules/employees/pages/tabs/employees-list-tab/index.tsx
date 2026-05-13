import AddIcon from "@mui/icons-material/Add";
import { Box, Button } from "@mui/material";
import BaseFormComponent from "@/libs/components/ui/base-form";
import BaseTableComponent from "@/libs/components/ui/base-table";
import BaseDrawer from "@/libs/components/ui/base-drawer";
import ImportButton from "@/libs/components/ui/import-button";
import {
  getEmployeeListSearchConfig,
  getEmployeeListColumns,
  showButtons,
} from "./employees-list-tab.config";
import { BTN_REFRESH } from "@/libs/constants/button.constant";
import { getEmployeeFormConfig, type EmployeeFormValues } from "../../employees.config";
import { employeeValidation } from "../../employees.validation";
import { useEmployeesList } from "./use-employees-list";
import { colorStatusCell } from "@/libs/utils";
import { genderOptions } from "@/libs/constants/options.constant";
import { t } from "@/libs/i18n";
import type { EmployeeListSearchForm } from "./employees-list-tab.type";

const EmployeesListTab = () => {
  const {
    searchParams,
    employeeStatusOptions,
    drawerOpen,
    editId,
    formValues,
    showroomOptions,
    searchHandlers,
    formHandlers,
    handleCellAction,
    handlePageChange,
    openCreate,
    closeDrawer,
    setFormValues,
    onchange,
    handleImport,
    handleTemplate,
  } = useEmployeesList();

  return (
    <>
      <BaseFormComponent<EmployeeListSearchForm>
        formConfig={getEmployeeListSearchConfig()}
        options={{ employeeStatusOptions }}
        handlers={searchHandlers}
        values={searchParams}
        onChange={onchange}
      />
      <BaseTableComponent
        tableConfig={getEmployeeListColumns()}
        reducer="employees"
        state="employeeTable"
        handleCellAction={handleCellAction}
        handlePageChange={handlePageChange}
        colorCell={colorStatusCell}
        showButton={showButtons}
        title={t("EMPLOYEES_PAGE_HEADER")}
        extra={
          <Box sx={{ display: "flex", gap: 1 }}>
            <ImportButton
              onImport={handleImport}
              onDownloadTemplate={handleTemplate}
              onSuccess={() => searchHandlers[BTN_REFRESH]?.()}
            />
            <Button variant="contained" size="small" startIcon={<AddIcon />} onClick={openCreate}>
              {t("EMPLOYEES_BTN_ADD")}
            </Button>
          </Box>
        }
      />

      <BaseDrawer
        open={drawerOpen}
        title={editId ? t("COMMON_BTN_EDIT") : t("EMPLOYEES_BTN_ADD")}
        onClose={closeDrawer}
      >
        <BaseFormComponent<EmployeeFormValues>
          formConfig={getEmployeeFormConfig()}
          validationSchema={employeeValidation}
          values={formValues}
          options={{ genderOptions, showroomOptions }}
          onChange={setFormValues}
          handlers={formHandlers}
        />
      </BaseDrawer>
    </>
  );
};

export default EmployeesListTab;
