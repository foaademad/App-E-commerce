import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import cookie from "react-cookies";
import { CompanyDetails, UserRole } from "../utility/interfaces/authInterface";

interface IAuthModel {
  isAuthenticated: boolean;
  user: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    avatar?: string;
    phoneNumber?: string;
    isCompany?: boolean;
    isMarketer?: boolean;
    createdAt?: string;
    updatedAt?: string;
  } | null;
}

interface AuthState {
  loading: boolean;
  error: string | null;
  authModel: IAuthModel | null;
}

const authModel = cookie.load("authModelAdmin");

const initialState: AuthState = {
  loading: false,
  error: null,
  authModel: authModel || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState: (state, action: PayloadAction<IAuthModel>) => {
      state.authModel = action.payload;
      state.loading = false;
      state.error = null;
      cookie.save("authModelAdmin", action.payload, { path: "/" });
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.authModel = null;
      state.loading = false;
      state.error = null;
      cookie.remove("authModelAdmin", { path: "/" });
    },
    login: (state, action: PayloadAction<{ email: string; password: string }>) => {
      state.loading = true;
      state.error = null;
    },
    register: (
      state,
      action: PayloadAction<{
        email: string;
        password: string;
        name: string;
        role: UserRole;
        companyDetails?: CompanyDetails;
      }>
    ) => {
      state.loading = true;
      state.error = null;
    },
  },
});

export const { setAuthState, setLoading, setError, logout, login, register } = authSlice.actions;
export default authSlice.reducer;