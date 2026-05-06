import { useEffect, useState } from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import AccountApprovedTab from "./tabs/accounts-approved-tab";
import AccountsPendingTab from "./tabs/accounts-pending-tab";
import AccountsListTab from "./tabs/accounts-list-tab";
import { t } from "@/libs/i18n";

const AccountsPage = () => {
  const [tab, setTab] = useState(0);

  useEffect(() => {
    document.title = t("ACCOUNTS_PAGE_TITLE");
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h6"
        fontWeight={700}
        className="page-title"
        sx={{ mb: 2 }}
      >
        {t("ACCOUNTS_PAGE_HEADER")}
      </Typography>
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        sx={{ mb: 2, borderBottom: 1, borderColor: "divider" }}
      >
        <Tab label={t("ACCOUNTS_TAB_LIST")} />
        <Tab label={t("COMMON_TAB_PENDING")} />
        <Tab label={t("COMMON_TAB_APPROVED")} />
      </Tabs>
      {tab === 0 && <AccountsListTab />}
      {tab === 1 && <AccountsPendingTab />}
      {tab === 2 && <AccountApprovedTab />}
    </Box>
  );
};

export default AccountsPage;
