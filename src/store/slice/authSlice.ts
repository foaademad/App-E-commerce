import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import * as Keychain from "react-native-keychain";

// Types
interface User {
  id: string;
  email: string;
  name: string;
}

interface FileData {
  uri?: string; // جعله خيارياً لتجنب الأخطاء
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

// // التسجيل
// export const register = createAsyncThunk(
//   "auth/register",
//   async (
//     credentials: {
//       Password: string;
//       ConfirmPassword: string;
//       IsCompanyOrShop: boolean;
//       Location: string;
//       Email: string;
//       FullName: string;
//       PhoneNumber: string;
//       IsCompany: boolean;
//       IsMarketer: boolean;
//       CreatedAt: string;
//       CommercialRegister: FileData;
//     },
//     { rejectWithValue }
//   ) => {
//     try {
//       const formData = new FormData();

//       // Add text fields
//       formData.append("Password", credentials.Password);
//       formData.append("ConfirmPassword", credentials.ConfirmPassword);
//       formData.append("IsCompanyOrShop", String(credentials.IsCompanyOrShop));
//       formData.append("Location", credentials.Location);
//       formData.append("Email", credentials.Email);
//       formData.append("FullName", credentials.FullName);
//       formData.append("PhoneNumber", credentials.PhoneNumber);
//       formData.append("IsCompany", String(credentials.IsCompany));
//       formData.append("IsMarketer", String(credentials.IsMarketer));
//       formData.append("CreatedAt", credentials.CreatedAt);

//       // Add file only if it exists and has a URI
//       if (credentials.CommercialRegister && credentials.CommercialRegister.uri) {
//         formData.append("CommercialRegister", {
//           uri: credentials.CommercialRegister.uri,
//           name: credentials.CommercialRegister.name,
//           type: credentials.CommercialRegister.type || "image/jpeg",
//         } as any);
//       }

//       console.log('Sending registration request with formData:', formData); // Debug log

//       // Send request
//       const response = await axios.post(
//         "https://df8f-156-217-82-33.ngrok-free.app/api/Account/register",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             "Accept": "application/json",
//           },
//         }
//       );

//       console.log('Registration response:', response.data); // Debug log
//       return response.data;
//     } catch (error: any) {
//       console.error('Registration error details:', error.response?.data || error.message); // Debug log
//       return rejectWithValue(
//         error.response?.data?.message || 
//         error.response?.data?.error || 
//         error.message || 
//         "Registration failed"
//       );
//     }
//   }
// );

// التسجيل المحسن
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
        CommercialRegister: FileData | null;
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
  
        // إضافة الملف فقط إذا كان موجوداً
        if (credentials.CommercialRegister && credentials.CommercialRegister.uri) {
          formData.append("CommercialRegister", {
            uri: credentials.CommercialRegister.uri,
            name: credentials.CommercialRegister.name,
            type: credentials.CommercialRegister.type || "image/jpeg",
          } as any);
        }
  
        console.log('sending registration request...');
  
        // إرسال الطلب
        const response = await axios.post(
          "https://df8f-156-217-82-33.ngrok-free.app/api/Account/register",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              "Accept": "application/json",
            },
            timeout: 30000, // 30 ثانية timeout
          }
        );
  
        console.log('registration response:', response.data);
        
        // حفظ الـ token إذا كان موجوداً في الاستجابة
        if (response.data.token) {
          await Keychain.setGenericPassword("token", response.data.token);
        }
        
        return response.data;
      } catch (error: any) {
        console.error('registration error details:', error);
        
        // معالجة أفضل للأخطاء
        let errorMessage = "Registration failed";
        
        if (error.response) {
          // server error
          errorMessage = error.response.data?.message || 
                       error.response.data?.error || 
                       error.response.data?.errors?.[0] ||
                       `server error: ${error.response.status}`;
        } else if (error.request) {
          // no response from the server
          errorMessage = "Cannot connect to the server. Check your connection.";
        } else if (error.code === 'ECONNABORTED') {
          // timeout
          errorMessage = "Connection timeout. Please try again.";
        } else {
          // other error
          errorMessage = error.message || "An unexpected error occurred";
        }
        
        return rejectWithValue(errorMessage);
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

    
      

    // ===========================================================================
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        
        // تحقق من وجود البيانات المطلوبة
        if (action.payload && action.payload.token) {
          state.token = action.payload.token;
          state.user = action.payload.user || null;
          state.isAuthenticated = true;
          state.error = null;
        } else {
          state.error = "Invalid response from server";
          state.isAuthenticated = false;
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      })
//   =================================================================
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
// ============================================
      // Register
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.registerSuccess = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.registerSuccess = true;
        
        // إذا كانت الاستجابة تحتوي على token وuser، قم بتسجيل الدخول مباشرة
        if (action.payload && action.payload.token && action.payload.user) {
          state.token = action.payload.token;
          state.user = action.payload.user;
          state.isAuthenticated = true;
        } else {
          // إذا كان التسجيل ناجحاً لكن بدون تسجيل دخول مباشر
          state.isAuthenticated = false;
        }
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
        state.registerSuccess = false;
      })
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