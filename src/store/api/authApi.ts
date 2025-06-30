import { useDispatch } from 'react-redux';
import { login, register, setAuthState, setError, setLoading } from '../slice/authSlice';
import api from '../utility/api/api';
import { CompanyDetails, IAuthModel, UserRole } from '../utility/interfaces/authInterface';

export const useAuth = () => {
  const dispatch = useDispatch();

  const loginUser = async (email: string, password: string) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const response = await api.post("/Account/login", { email, password });

      if (response.status === 200) {
        const authData: IAuthModel = {
          isAuthenticated: true,
          user: {
            id: response.data.id || "",
            name: response.data.name || "",
            email: response.data.email,
            role: response.data.role || "user",
            phoneNumber: response.data.phoneNumber,
            isCompany: response.data.isCompany,
            isMarketer: response.data.isMarketer,
            createdAt: response.data.createdAt,
            updatedAt: response.data.updatedAt,
          },
        };
        dispatch(login({ email, password }));
        dispatch(setAuthState(authData));
        return authData;
      } else {
        throw new Error("Login failed: Invalid response status");
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || "Failed to login";
      dispatch(setError(errorMessage));
      throw new Error(errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const registerUser = async (
    email: string,
    password: string,
    name: string,
    role: UserRole,
    companyDetails?: CompanyDetails
  ) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const response = await api.post("/Account/register", {
        email,
        password,
        name,
        role,
        companyDetails,
      });

      if (response.status === 200) {
        const authData: IAuthModel = {
          isAuthenticated: true,
          user: {
            id: response.data.Id || "",
            name: response.data.FullName || name,
            email: response.data.Email || email,
            role: response.data.role || role,
            phoneNumber: response.data.PhoneNumber,
            isCompany: response.data.IsComapny,
            isMarketer: response.data.IsMarketer,
            createdAt: response.data.CreatedAt,
            updatedAt: response.data.UpdatedAt,
          },
        };
        dispatch(register({ email, password, name, role, companyDetails }));
        dispatch(setAuthState(authData));
        return authData;
      } else {
        throw new Error("Registration failed: Invalid response status");
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || "Failed to register";
      dispatch(setError(errorMessage));
      throw new Error(errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    loginUser,
    registerUser,
  };
};