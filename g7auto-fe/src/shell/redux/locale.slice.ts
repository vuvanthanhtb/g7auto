import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { setLocale, getLocale } from "@/libs/i18n";
import type { Locale } from "@/libs/i18n/types";

interface LocaleState {
  locale: Locale;
}

const localeSlice = createSlice({
  name: "locale",
  initialState: (): LocaleState => ({ locale: getLocale() }),
  reducers: {
    changeLocale: (state, action: PayloadAction<Locale>) => {
      state.locale = action.payload;
      setLocale(action.payload);
    },
  },
});

export const { changeLocale } = localeSlice.actions;
export default localeSlice.reducer;
