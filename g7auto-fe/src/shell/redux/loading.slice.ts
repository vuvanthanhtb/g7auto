import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
  name: "loading",
  initialState: { totalLoadingProcess: 0 },
  reducers: {
    startLoading: (state) => { state.totalLoadingProcess++; },
    stopLoading: (state) => { state.totalLoadingProcess = Math.max(0, state.totalLoadingProcess - 1); },
  },
});

export const { startLoading, stopLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
