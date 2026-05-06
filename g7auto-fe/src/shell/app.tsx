import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { store, persistor } from "./redux/store";
import { router } from "./route";
import { ConfirmDialogProvider } from "@/libs/components/ui/confirm-dialog";
import LoadingPage from "@/libs/pages/loading";
import { useAppSelector } from "./redux/hooks";
import "dayjs/locale/vi";
import "dayjs/locale/en";

const AppContent = () => {
  const locale = useAppSelector((state) => state.locale.locale);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
      <ConfirmDialogProvider>
        <RouterProvider router={router} />
      </ConfirmDialogProvider>
    </LocalizationProvider>
  );
};

const App = () => (
  <Provider store={store}>
    <PersistGate loading={<LoadingPage />} persistor={persistor}>
      <AppContent />
    </PersistGate>
  </Provider>
);

export default App;
