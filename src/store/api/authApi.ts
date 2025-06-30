import { useDispatch } from 'react-redux';
import { login, loginWithFacebook, loginWithGoogle, register, resetPassword, setAuthData, setError, setLoading } from '../slice/authSlice';
import api from '../utility/api/api';
import { CompanyDetails, UserRole } from '../utility/interfaces/authInterface';

export const useAuth = () => {
  const dispatch = useDispatch();

  const loginUser = async (email: string, password: string) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      
      const response = await api.post("/Account/login", { email, password });
      
      if (response.status === 200) {
        dispatch(login({ email, password }));
        dispatch(setAuthData(response.data));
        return response.data;
      }
    } catch (error: any) {
      dispatch(setError(error.message));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const registerUser = async (email: string, password: string, name: string, role: UserRole, companyDetails?: CompanyDetails) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      
      const response = await api.post("/Account/register", { email, password, name, role, companyDetails });
      
      if (response.status === 200) {
        dispatch(register({ email, password, name, role, companyDetails }));
        return response.data;
      }
    } catch (error: any) {
      dispatch(setError(error.message));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const loginWithGoogleUser = async (token: string) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      
      const response = await api.post("/Account/google/signin", { token });
      
      if (response.status === 200) {
        dispatch(loginWithGoogle({ token }));
        return response.data;
      }
    } catch (error: any) {
      dispatch(setError(error.message));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const loginWithFacebookUser = async (token: string) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      
      const response = await api.post("/Account/facebook/signin", { token });
      
      if (response.status === 200) {
        dispatch(loginWithFacebook({ token }));
        return response.data;
      }
    } catch (error: any) {
      dispatch(setError(error.message));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };



  const resetPasswordUser = async (token: string, newPassword: string) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      
      const response = await api.post("/Account/resetpassword", { token, newPassword });
      
      if (response.status === 200) {
        dispatch(resetPassword({ token, newPassword }));
        return response.data;
      }
    } catch (error: any) {
      dispatch(setError(error.message));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };


  return {
    loginUser,
    registerUser,
    loginWithGoogleUser,
    loginWithFacebookUser,

    resetPasswordUser,
  };
}; 