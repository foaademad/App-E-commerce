import { useDispatch } from 'react-redux';
import { login, register, setAuthState, setError, setLoading } from '../slice/authSlice';
import api from '../utility/api/api';
import { IAuthModel, IRegisterUser } from '../utility/interfaces/authInterface';

// Password (string)
  // ConfirmPassword (string)
  // IsComanyOrShop (boolean)
  // CommercialRegister (choose file)
  // IsMarketer (boolean) 
  // IsComapny (boolean)
  // Location (string)
  // Email (string)
  // FullName (string)
  // PhoneNumber (string)


export const registerUser =  (data: IRegisterUser ) => {
  return async (dispatch: any) => {
    try {
      dispatch(setLoading(true));
      const formData = new FormData();
      formData.append("Email", data.email);
      formData.append("Password", data.password);
      formData.append("ConfirmPassword", data.confirmPassword);
      formData.append("IsComanyOrShop", data.isComanyOrShop.toString());
      formData.append("CommercialRegister", data.commercialRegister);
      formData.append("IsMarketer", data.isMarketer.toString());
      formData.append("IsComapny", data.isComapny.toString());
      formData.append("Location", data.location);
      formData.append("FullName", data.fullName);
      formData.append("PhoneNumber", data.phoneNumber);
      const response = await api.post("Account/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(setAuthState(response.data));
    } catch (error) {
      console.log(error);
      dispatch(setError(error as string));
    }
    finally {
      dispatch(setLoading(false));
    }
  }

}