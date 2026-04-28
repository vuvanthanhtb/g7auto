import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TokenService } from "@/libs/interceptor/token.service";
import { getApiErrorMessage } from "@/libs/interceptor/helpers";
import { toastError, toastSuccess } from "@/libs/custom-toast";
import { SUCCESS_CODE } from "@/libs/constants/error-code.constant";
import { authService } from "../services/auth.service";
import { profileService } from "../services/profile.service";
import type { LoginRequest, ProfileUser, UpdateProfileRequest, ChangePasswordRequest } from "./auth.type";

interface AuthState {
  isAuthenticated: boolean;
  user: ProfileUser | null;
  roles: string[];
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  roles: [],
};

export const profileUser = createAsyncThunk(
  "auth/profileUser",
  async (_, thunkAPI) => {
    try {
      const { data: response } = await authService.profile();
      return {
        isAuthenticated: true,
        roles: response.roles,
        user: {
          id: response.id,
          username: response.username,
          email: response.email,
          fullName: response.fullName,
        },
      };
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return thunkAPI.rejectWithValue("PROFILE_FAILED");
    }
  },
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (payload: LoginRequest, thunkAPI) => {
    try {
      const { data: response } = await authService.login(payload);
      if (response)
        TokenService.setTokens(response.accessToken, response.refreshToken);
      const r = await thunkAPI.dispatch(profileUser());
      if (profileUser.rejected.match(r))
        return thunkAPI.rejectWithValue("PROFILE_AFTER_LOGIN_FAILED");
      toastSuccess(SUCCESS_CODE.LOGIN);
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return thunkAPI.rejectWithValue("LOGIN_FAILED");
    }
  },
);

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (data: UpdateProfileRequest, thunkAPI) => {
    try {
      const { data: response } = await authService.updateProfile(data);
      toastSuccess(SUCCESS_CODE.UPDATE);
      return response;
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return thunkAPI.rejectWithValue("UPDATE_PROFILE_FAILED");
    }
  },
);

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (data: ChangePasswordRequest, thunkAPI) => {
    try {
      await authService.changePassword(data);
      toastSuccess(SUCCESS_CODE.UPDATE);
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return thunkAPI.rejectWithValue("CHANGE_PASSWORD_FAILED");
    }
  },
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, thunkAPI) => {
    try {
      await authService.logout();
    } catch {
      // ignore backend errors — always clear client state
    }
    thunkAPI.dispatch(logout());
    TokenService.clear();
    toastSuccess(SUCCESS_CODE.LOGOUT);
    return true;
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: { logout: () => initialState },
  extraReducers: (builder) => {
    builder
      .addCase(profileUser.fulfilled, (state, action) => {
        state.isAuthenticated = action.payload.isAuthenticated;
        state.user = action.payload.user;
        state.roles = action.payload.roles;
      })
      .addCase(profileUser.rejected, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.roles = [];
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        if (state.user && action.payload) {
          state.user.fullName = action.payload.fullName;
          state.user.email = action.payload.email;
        }
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
