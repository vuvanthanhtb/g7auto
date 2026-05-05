import { useEffect, useState } from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import AccountApprovedTab from "./tabs/accounts-approved-tab";
import AccountsPendingTab from "./tabs/accounts-pending-tab";
import AccountsListTab from "./tabs/accounts-list-tab";

const AccountsPage = () => {
  const [tab, setTab] = useState(0);

  useEffect(() => {
    document.title = "Quản lý tài khoản — G7Auto";
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h6"
        fontWeight={700}
        className="page-title"
        sx={{ mb: 2 }}
      >
        Quản lý Tài khoản
      </Typography>
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        sx={{ mb: 2, borderBottom: 1, borderColor: "divider" }}
      >
        <Tab label="Danh sách tài khoản" />
        <Tab label="Chờ phê duyệt" />
        <Tab label="Đã phê duyệt" />
      </Tabs>
      {tab === 0 && <AccountsListTab />}
      {tab === 1 && <AccountsPendingTab />}
      {tab === 2 && <AccountApprovedTab />}
    </Box>
  );
};

export default AccountsPage;
