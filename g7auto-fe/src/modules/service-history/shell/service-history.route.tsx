import { lazy } from "react";
import BuildIcon from "@mui/icons-material/Build";
import type { RouteMeta } from "@/libs/types/route.types";

export const SERVICE_HISTORY_PATH = { BASE: "/lich-su-dich-vu" };

export const SERVICE_HISTORY_CONFIG: RouteMeta[] = [
  {
    key: "service-history",
    path: SERVICE_HISTORY_PATH.BASE,
    pathOriginal: SERVICE_HISTORY_PATH.BASE,
    label: "MENU_SERVICE_HISTORY",
    icon: <BuildIcon />,
    isAuth: true,
    roles: ["SUPERADMIN", "ADMIN", "DIRECTOR", "SHOWROOM_MANAGER", "WAREHOUSE"],
    component: lazy(() => import("@/modules/service-history/pages")),
  },
];
