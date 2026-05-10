import { useEffect, useState } from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import EmployeesListTab from "./tabs/employees-list-tab";
import EmployeesApprovedTab from "./tabs/employees-approved-tab";
import EmployeesPendingTab from "./tabs/employees-pending-tab";
import { t } from "@/libs/i18n";

const EmployeePage = () => {
  const [tab, setTab] = useState(0);

  useEffect(() => {
    document.title = t("EMPLOYEES_PAGE_TITLE");
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" fontWeight={700} className="page-title" sx={{ mb: 2 }}>
        {t("EMPLOYEES_PAGE_HEADER")}
      </Typography>
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
    </Box>
  );
};

export default EmployeePage;
