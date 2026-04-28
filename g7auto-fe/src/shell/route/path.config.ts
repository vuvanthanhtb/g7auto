import type { RouteMeta } from "@/libs/types/route.types";
import { HOME_CONFIG } from "@/modules/home/shell/home.route";
import { SHOWROOMS_CONFIG } from "@/modules/showrooms/shell/showrooms.route";
import { CAR_MODELS_CONFIG } from "@/modules/car-models/shell/car-models.route";
import { CARS_CONFIG } from "@/modules/cars/shell/cars.route";
import { CUSTOMERS_CONFIG } from "@/modules/customers/shell/customers.route";
import { EMPLOYEES_CONFIG } from "@/modules/employees/shell/employees.route";
import { CAR_TRANSFERS_CONFIG } from "@/modules/car-transfers/shell/car-transfers.route";
import { CONTRACTS_CONFIG } from "@/modules/contracts/shell/contracts.route";
import { DEPOSITS_CONFIG } from "@/modules/deposits/shell/deposits.route";
import { QUOTATIONS_CONFIG } from "@/modules/quotations/shell/quotations.route";
import { PAYMENTS_CONFIG } from "@/modules/payments/shell/payments.route";
import { SERVICE_HISTORY_CONFIG } from "@/modules/service-history/shell/service-history.route";
import { TEST_DRIVES_CONFIG } from "@/modules/test-drives/shell/test-drives.route";
import { ACCOUNTS_CONFIG } from "@/modules/accounts/shell/accounts.route";

export const PATHS_CONFIG: RouteMeta[] = [
  ...HOME_CONFIG,
  ...SHOWROOMS_CONFIG,
  ...CAR_MODELS_CONFIG,
  ...CARS_CONFIG,
  ...CUSTOMERS_CONFIG,
  ...EMPLOYEES_CONFIG,
  ...CAR_TRANSFERS_CONFIG,
  ...CONTRACTS_CONFIG,
  ...DEPOSITS_CONFIG,
  ...QUOTATIONS_CONFIG,
  ...PAYMENTS_CONFIG,
  ...SERVICE_HISTORY_CONFIG,
  ...TEST_DRIVES_CONFIG,
  ...ACCOUNTS_CONFIG,
];
