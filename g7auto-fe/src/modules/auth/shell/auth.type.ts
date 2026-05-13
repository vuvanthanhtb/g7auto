export interface LoginRequest {
  username: string;
  password: string;
}

export type LoginFormValues = LoginRequest;

export interface ProfileDrawerFormValues {
  username: string;
  fullName: string;
  email: string;
}

export interface ProfilePageFormValues {
  fullName: string;
  email: string;
}

export interface PasswordFormValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface ProfileUser {
  id: string;
  username: string;
  email: string;
  fullName: string;
}

export interface ProfileResponse extends ProfileUser {
  roles: string[];
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface UpdateProfileRequest {
  fullName: string;
  email: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}
