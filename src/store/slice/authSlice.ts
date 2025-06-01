import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import * as Keychain from "react-native-keychain";

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  isAuthenticated: false,
  error: null,
};

// Async Thunks for login,register,logout, getToken

//to login the user
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

// to register the user
export const register = createAsyncThunk(
  "auth/register",
  async (
    credentials: {
      email: string;
      password: string;
      name: string;
      role: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/Account/register",
        credentials
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Register failed"
      );
    }
  }
);
//to logout the user
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

//to get the token from the keychain
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

//to create the slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //to set the user
    setUser: (state, action) => {
      state.user = action.payload;
    },
    //to set the token
    setToken: (state, action) => {
      state.token = action.payload;
    },
    //to set the isAuthenticated
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    //to set the isLoading
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    //to set the error
    setError: (state, action) => {
      state.error = action.payload;
    },
    //to logout the user
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //to login the user
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

      //to logout the user
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

      //to get the token
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
      });
  },
});

export const {
  setUser,
  setToken,
  setIsAuthenticated,
  setIsLoading,
  setError,
  logoutUser,
} = authSlice.actions;

export default authSlice.reducer;
