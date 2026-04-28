import { lazy } from "react";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import type { RouteMeta } from "@/libs/types/route.types";

export const ACCOUNTS_PATH = { BASE: "/tai-khoan" };

export const ACCOUNTS_CONFIG: RouteMeta[] = [
  {
    key: "accounts",
    path: ACCOUNTS_PATH.BASE,
    pathOriginal: ACCOUNTS_PATH.BASE,
    label: "Tài khoản",
    icon: <ManageAccountsIcon />,
    isAuth: true,
    roles: ["SUPERADMIN", "ADMIN"],
    component: lazy(() => import("@/modules/accounts/pages")),
  },
];
