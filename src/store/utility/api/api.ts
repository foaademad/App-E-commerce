import axios from "axios";
import cookie from 'react-cookies';

const api = axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
        "Content-Type": "application/json",
    },
});


api.interceptors.request.use(
    (config) => {
        const authModel = cookie.load('authModel');
        if (authModel?.token) {
          config.headers.Authorization = `Bearer ${authModel.token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.request.use((config) => {
    try {
      const authModel = cookie.load("authModel");
      if (authModel?.token) {
        config.headers.Authorization = `Bearer ${authModel.token}`;
      }
      const languageStorage = localStorage?.getItem("language-storage");
      const language = languageStorage ? JSON.parse(languageStorage)?.state?.language || "ar" : "ar";
      config.headers["Accept-Language"] = language;
      return config;
    } catch (error) {
      console.error("Request interceptor error:", error);
      return config;
    }
  }, (error) => {
    console.error("Request configuration error:", error);
    return Promise.reject(error);
  });


export default api;





