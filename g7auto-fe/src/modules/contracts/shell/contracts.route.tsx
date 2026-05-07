import { lazy } from "react";
import DescriptionIcon from "@mui/icons-material/Description";
import type { RouteMeta } from "@/libs/types/route.types";

export const CONTRACTS_PATH = { BASE: "/hop-dong" };

export const CONTRACTS_CONFIG: RouteMeta[] = [
  {
    key: "contracts",
    path: CONTRACTS_PATH.BASE,
    pathOriginal: CONTRACTS_PATH.BASE,
    label: "MENU_CONTRACTS",
    icon: <DescriptionIcon />,
    isAuth: true,
    roles: ["SUPERADMIN", "ADMIN", "DIRECTOR", "SHOWROOM_MANAGER", "SALES", "ACCOUNTANT"],
    component: lazy(() => import("@/modules/contracts/pages")),
  },
];
