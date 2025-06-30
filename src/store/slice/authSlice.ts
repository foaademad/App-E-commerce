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
  } | null;

  login: (email: string, password: string) => Promise<boolean>;
  register: (
    email: string,
    password: string,
    name: string,
    role: UserRole,
    companyDetails?: CompanyDetails
  ) => Promise<boolean>;
  logout: () => void;
  loginWithGoogle: (token: string) => Promise<boolean>;
  loginWithFacebook: () => Promise<boolean>;
  requestPasswordReset: (email: string) => Promise<boolean>;
  resetPassword: (token: string, newPassword: string) => Promise<boolean>;
  resendConfirmationEmail: (email: string) => Promise<boolean>;
}


const authModel = cookie.load("authModelAdmin");

interface AuthState {
    loading: boolean;
    error: string | null;
    authModel: IAuthModel | null;
}

const initialState: AuthState = {
   loading: false,
   error: null,
   authModel: authModel,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthState: (state, action: PayloadAction<IAuthModel>) => {
            state.loading = action.payload.isAuthenticated;
            state.error = action.payload.user?.name || null;
            state.authModel = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        logout: (state) => {
            state.authModel = null;

        },
        login: (state, action: PayloadAction<{ email: string; password: string }>) => {
            state.loading = true;
            state.error = null;

        },
        register: (state, action: PayloadAction<{ email: string; password: string; name: string; role: UserRole; companyDetails?: CompanyDetails }>) => {
            state.loading = true;
            state.error = null;
        },
        loginWithGoogle: (state, action: PayloadAction<{ token: string }>) => {
            state.loading = true;
            state.error = null;
        },
        loginWithFacebook: (state, action: PayloadAction<{ token: string }>) => {
            state.loading = true;
            state.error = null;
        },
          
        resetPassword: (state, action: PayloadAction<{ token: string; newPassword: string }>) => {
            state.loading = true;
            state.error = null;
        },
      
        setAuthData: (state, action: PayloadAction<IAuthModel>) => {
            state.authModel = action.payload;
            state.loading = false;
        }
    }
});

export const { setAuthState, setLoading, setError, logout, login, register, loginWithGoogle, loginWithFacebook,  resetPassword, setAuthData } = authSlice.actions;
export default authSlice.reducer;