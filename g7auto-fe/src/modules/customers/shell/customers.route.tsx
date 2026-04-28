import { lazy } from "react";
import PeopleIcon from "@mui/icons-material/People";
import type { RouteMeta } from "@/libs/types/route.types";

export const CUSTOMERS_PATH = { BASE: "/khach-hang" };

export const CUSTOMERS_CONFIG: RouteMeta[] = [
  {
    key: "customers",
    path: CUSTOMERS_PATH.BASE,
    pathOriginal: CUSTOMERS_PATH.BASE,
    label: "Khách hàng",
    icon: <PeopleIcon />,
    isAuth: true,
    roles: ["SUPERADMIN", "ADMIN", "DIRECTOR", "SHOWROOM_MANAGER", "SALES"],
    component: lazy(() => import("@/modules/customers/pages")),
  },
];
