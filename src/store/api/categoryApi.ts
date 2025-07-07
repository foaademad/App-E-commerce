import { getCategories, setError, setLoading } from "../slice/categorySlice";
import api from "../utility/api/api";
import { CategoryApiResponse } from "../utility/interfaces/categoryInterface";

export const getCategoriesApi = () => async (dispatch: any) => {
    try {
        dispatch(setLoading(true));
        const response = await api.get("/Category/getall?page=1&pagesize=20");
        const data = response.data as CategoryApiResponse;
        dispatch(getCategories(data.result));
    } catch (error) {
        dispatch(setError(error as string));
    } finally {
        dispatch(setLoading(false));
    }
}