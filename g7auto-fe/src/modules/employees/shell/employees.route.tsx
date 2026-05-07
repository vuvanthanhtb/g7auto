import { lazy } from "react";
import BadgeIcon from "@mui/icons-material/Badge";
import type { RouteMeta } from "@/libs/types/route.types";

export const EMPLOYEES_PATH = { BASE: "/nhan-vien" };

export const EMPLOYEES_CONFIG: RouteMeta[] = [
  {
    key: "employees",
    path: EMPLOYEES_PATH.BASE,
    pathOriginal: EMPLOYEES_PATH.BASE,
    label: "MENU_EMPLOYEES",
    icon: <BadgeIcon />,
    isAuth: true,
    roles: ["SUPERADMIN", "ADMIN", "DIRECTOR", "SHOWROOM_MANAGER"],
    component: lazy(() => import("@/modules/employees/pages")),
  },
];
