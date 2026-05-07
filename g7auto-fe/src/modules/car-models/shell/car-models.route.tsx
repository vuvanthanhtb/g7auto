import { lazy } from "react";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import type { RouteMeta } from "@/libs/types/route.types";

export const CAR_MODELS_PATH = { BASE: "/dong-xe" };

export const CAR_MODELS_CONFIG: RouteMeta[] = [
  {
    key: "car-models",
    path: CAR_MODELS_PATH.BASE,
    pathOriginal: CAR_MODELS_PATH.BASE,
    label: "MENU_CAR_MODELS",
    icon: <DirectionsCarIcon />,
    isAuth: true,
    roles: ["SUPERADMIN", "ADMIN", "DIRECTOR", "SHOWROOM_MANAGER", "SALES"],
    component: lazy(() => import("@/modules/car-models/pages")),
  },
];
