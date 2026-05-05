import { lazy } from "react";
import type { RouteMeta } from "@/libs/types/route.types";

export const PROFILE_PATH = { BASE: "/ho-so" };

export const PROFILE_CONFIG: RouteMeta[] = [
  {
    key: "profile",
    path: PROFILE_PATH.BASE,
    pathOriginal: PROFILE_PATH.BASE,
    label: "Hồ sơ",
    isAuth: false,
    roles: [],
    hidden: true,
    component: lazy(() => import("@/modules/profile/pages")),
  },
];
