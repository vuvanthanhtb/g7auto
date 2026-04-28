import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";

const storage = {
  getItem: (key: string) => Promise.resolve(localStorage.getItem(key)),
  setItem: (key: string, value: string) => Promise.resolve(localStorage.setItem(key, value)),
  removeItem: (key: string) => Promise.resolve(localStorage.removeItem(key)),
};
import { combineReducers } from "redux";
import { loadingMiddleware } from "./middleware";
import loadingReducer from "./loading.slice";
import authReducer from "@/modules/auth/shell/auth.slice";
import showroomsReducer from "@/modules/showrooms/shell/showrooms.slice";
import carModelsReducer from "@/modules/car-models/shell/car-models.slice";
import carsReducer from "@/modules/cars/shell/cars.slice";
import customersReducer from "@/modules/customers/shell/customers.slice";
import employeesReducer from "@/modules/employees/shell/employees.slice";
import carTransfersReducer from "@/modules/car-transfers/shell/car-transfers.slice";
import contractsReducer from "@/modules/contracts/shell/contracts.slice";
import depositsReducer from "@/modules/deposits/shell/deposits.slice";
import quotationsReducer from "@/modules/quotations/shell/quotations.slice";
import paymentsReducer from "@/modules/payments/shell/payments.slice";
import serviceHistoryReducer from "@/modules/service-history/shell/service-history.slice";
import testDrivesReducer from "@/modules/test-drives/shell/test-drives.slice";
import accountsReducer from "@/modules/accounts/shell/accounts.slice";

const authPersistConfig = { key: "auth", storage, whitelist: ["isAuthenticated", "user", "roles", "accessToken", "refreshToken"] };

const rootReducer = combineReducers({
  loading: loadingReducer,
  auth: persistReducer(authPersistConfig, authReducer),
  showrooms: showroomsReducer,
  carModels: carModelsReducer,
  cars: carsReducer,
  customers: customersReducer,
  employees: employeesReducer,
  carTransfers: carTransfersReducer,
  contracts: contractsReducer,
  deposits: depositsReducer,
  quotations: quotationsReducer,
  payments: paymentsReducer,
  serviceHistory: serviceHistoryReducer,
  testDrives: testDrivesReducer,
  accounts: accountsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: { ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER] },
    }).concat(loadingMiddleware),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
