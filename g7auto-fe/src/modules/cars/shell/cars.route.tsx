import { lazy } from "react";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import type { RouteMeta } from "@/libs/types/route.types";

export const CARS_PATH = { BASE: "/kho-xe" };

export const CARS_CONFIG: RouteMeta[] = [
  {
    key: "cars",
    path: CARS_PATH.BASE,
    pathOriginal: CARS_PATH.BASE,
    label: "MENU_CARS",
    icon: <DirectionsCarIcon />,
    isAuth: true,
    roles: [
      "SUPERADMIN",
      "ADMIN",
      "DIRECTOR",
      "SHOWROOM_MANAGER",
      "SALES",
      "WAREHOUSE",
    ],
    component: lazy(() => import("@/modules/cars/pages")),
  },
];
