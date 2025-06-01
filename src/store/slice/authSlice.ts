import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Platform } from "react-native";
import * as Keychain from "react-native-keychain";

// Types
interface User {
  id: string;
  email: string;
  name: string;
}

interface FileData {
  uri: string;
  name: string;
  type?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  registerSuccess: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  isAuthenticated: false,
  error: null,
  registerSuccess: false,
};

// Async Thunks

// تسجيل الدخول
export const login = createAsyncThunk(
  "auth/login",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/Account/login",
        credentials
      );
      await Keychain.setGenericPassword("token", response.data.token);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// التسجيل
export const register = createAsyncThunk(
  "auth/register",
  async (
    credentials: {
      Password: string;
      ConfirmPassword: string;
      IsCompanyOrShop: boolean;
      Location: string;
      Email: string;
      FullName: string;
      PhoneNumber: string;
      IsCompany: boolean;
      IsMarketer: boolean;
      CreatedAt: string;
      CommercialRegister: FileData;
    },
    { rejectWithValue }
  ) => {
    try {
      const formData = new FormData();

      // إضافة الحقول النصية
      formData.append("Password", credentials.Password);
      formData.append("ConfirmPassword", credentials.ConfirmPassword);
      formData.append("IsCompanyOrShop", String(credentials.IsCompanyOrShop));
      formData.append("Location", credentials.Location);
      formData.append("Email", credentials.Email);
      formData.append("FullName", credentials.FullName);
      formData.append("PhoneNumber", credentials.PhoneNumber);
      formData.append("IsCompany", String(credentials.IsCompany));
      formData.append("IsMarketer", String(credentials.IsMarketer));
      formData.append("CreatedAt", credentials.CreatedAt);

      // إضافة الملف
      formData.append("CommercialRegister", {
        uri: Platform.OS === 'ios' ? credentials.CommercialRegister.uri.replace('file://', '') : credentials.CommercialRegister.uri,
        type: credentials.CommercialRegister.type || "image/jpeg",
        name: credentials.CommercialRegister.name
      } as any);

      // إرسال الطلب
      const response = await axios.post(
        "http://localhost:5000/api/Account/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Register failed");
    }
  }
);

// تسجيل الخروج
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await Keychain.resetGenericPassword();
      return { success: true };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// جلب التوكن من الـ Keychain
export const getToken = createAsyncThunk(
  "auth/getToken",
  async (_, { rejectWithValue }) => {
    try {
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        return { token: credentials.password };
      }
      return rejectWithValue("No token found");
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
    },
    registerUser: (state) => {
      state.registerSuccess = true;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      })

      // Logout
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Get Token
      .addCase(getToken.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(getToken.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.payload as string;
      })

      // Register
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;

        if (action.payload.token && action.payload.user) {
          state.token = action.payload.token;
          state.user = action.payload.user;
          state.isAuthenticated = true;
        } else {
          state.isAuthenticated = false;
        }
        state.registerSuccess = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
        state.registerSuccess = false;
      });
  },
});

// Exports
export const {
  setUser,
  setToken,
  setIsAuthenticated,
  setIsLoading,
  setError,
  logoutUser,
  registerUser,
} = authSlice.actions;

export default authSlice.reducer;