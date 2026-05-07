import { lazy } from "react";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import type { RouteMeta } from "@/libs/types/route.types";

export const TEST_DRIVES_PATH = { BASE: "/lai-thu" };

export const TEST_DRIVES_CONFIG: RouteMeta[] = [
  {
    key: "test-drives",
    path: TEST_DRIVES_PATH.BASE,
    pathOriginal: TEST_DRIVES_PATH.BASE,
    label: "MENU_TEST_DRIVES",
    icon: <DriveEtaIcon />,
    isAuth: true,
    roles: ["SUPERADMIN", "ADMIN", "DIRECTOR", "SHOWROOM_MANAGER", "SALES"],
    component: lazy(() => import("@/modules/test-drives/pages")),
  },
];
