import { lazy } from "react";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import type { RouteMeta } from "@/libs/types/route.types";

export const CAR_TRANSFERS_PATH = { BASE: "/dieu-chuyen-xe" };

export const CAR_TRANSFERS_CONFIG: RouteMeta[] = [
  {
    key: "car-transfers",
    path: CAR_TRANSFERS_PATH.BASE,
    pathOriginal: CAR_TRANSFERS_PATH.BASE,
    label: "Điều chuyển xe",
    icon: <SwapHorizIcon />,
    isAuth: true,
    roles: ["SUPERADMIN", "ADMIN", "DIRECTOR", "SHOWROOM_MANAGER", "WAREHOUSE"],
    component: lazy(() => import("@/modules/car-transfers/pages")),
  },
];
