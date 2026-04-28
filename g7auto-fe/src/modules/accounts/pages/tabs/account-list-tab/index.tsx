import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import BaseFormComponent from "@/libs/components/ui/base-form";
import BaseTableComponent from "@/libs/components/ui/base-table";
import BaseDrawer from "@/libs/components/ui/base-drawer";
import {
  accountSearchConfig,
  accountFormConfig,
  accountColumns,
  accountStatusOptions,
  roleOptions,
  roleFormOptions,
} from "./account-list-tab.config";
import { accountsValidation } from "../../accounts.validation";
import { useAccountList } from "./use-account-list";

const AccountListTab = () => {
  const {
    drawerOpen, editId, formValues, page,
    openCreate, closeDrawer, handleCellAction, searchHandlers, formHandlers,
    setFormValues, setPage,
  } = useAccountList();

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
        <Button variant="contained" startIcon={<AddIcon />} onClick={openCreate}>
          Thêm tài khoản
        </Button>
      </Box>
      <BaseFormComponent
        formConfig={accountSearchConfig}
        options={{ accountStatusOptions, roleOptions }}
        handlers={searchHandlers}
      />
      <BaseTableComponent
        tableConfig={accountColumns}
        reducer="accounts"
        state="accountTable"
        handleCellAction={handleCellAction}
        handlePageChange={(_, p) => setPage(p)}
      />
      <BaseDrawer
        open={drawerOpen}
        title={editId ? "Chỉnh sửa tài khoản" : "Thêm tài khoản"}
        onClose={closeDrawer}
      >
        <BaseFormComponent
          formConfig={accountFormConfig}
          validationSchema={accountsValidation}
          values={formValues}
          options={{ roleFormOptions }}
          onChange={(d) => setFormValues((p) => ({ ...p, ...d }))}
          handlers={formHandlers}
        />
      </BaseDrawer>
    </>
  );
};

export default AccountListTab;
