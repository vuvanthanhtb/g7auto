import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Tab, Tabs, Typography } from "@mui/material";
import EmployeesListTab from "./tabs/employees-list-tab";
import EmployeesApprovedTab from "./tabs/employees-approved-tab";
import EmployeesPendingTab from "./tabs/employees-pending-tab";
import BaseDrawer from "@/libs/components/ui/base-drawer";
import BaseFormComponent from "@/libs/components/ui/base-form";
import { useEmployees } from "./use-employees";
import { getEmployeeFormConfig } from "./employees.config";
import { employeeValidation } from "./employees.validation";
import { useAppSelector } from "@/shell/redux/hooks";
import { genderOptions } from "@/libs/constants/options.constant";
import { t } from "@/libs/i18n";

const EmployeePage = () => {
  const [tab, setTab] = useState(0);
  const [showroomOptions, setShowroomOptions] = useState<any[]>([]);
  const showroomAll =
    useAppSelector((state) => state.showrooms.showroomAll) || [];

  useEffect(() => {
    const temp = showroomAll.map((s) => ({
      label: s.name,
      value: s.id,
    }));
    setShowroomOptions(temp);
  }, [showroomAll]);

  const {
    drawerOpen,
    formValues,
    setFormValues,
    openCreate,
    closeDrawer,
    formHandlers,
  } = useEmployees();

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6" fontWeight={700} className="page-title">
          {t("EMPLOYEES_PAGE_HEADER")}
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={openCreate}
        >
          {t("EMPLOYEES_BTN_ADD")}
        </Button>
      </Box>
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        sx={{ mb: 2, borderBottom: 1, borderColor: "divider" }}
      >
        <Tab label={t("EMPLOYEES_TAB_LIST")} />
        <Tab label={t("COMMON_TAB_PENDING")} />
        <Tab label={t("COMMON_TAB_APPROVED")} />
      </Tabs>
      {tab === 0 && <EmployeesListTab />}
      {tab === 1 && <EmployeesPendingTab />}
      {tab === 2 && <EmployeesApprovedTab />}
      <BaseDrawer
        open={drawerOpen}
        title={t("EMPLOYEES_BTN_ADD")}
        onClose={closeDrawer}
      >
        <BaseFormComponent
          formConfig={getEmployeeFormConfig()}
          validationSchema={employeeValidation}
          values={formValues}
          options={{ genderOptions, showroomOptions }}
          onChange={(d) => setFormValues((p) => ({ ...p, ...d }))}
          handlers={formHandlers}
        />
      </BaseDrawer>
    </Box>
  );
};

export default EmployeePage;
