import { getProductsBest, getProductsNew, setCurrentProduct, setError, setLoading } from "../slice/productSlice";
import api from "../utility/api/api";
import { ProductDetailsDto, ProductsHomeResponse } from "../utility/interfaces/productInterface";

export const getProducts = () => async (dispatch: any) => {
    try {
        dispatch(setLoading(true));
        const response = await api.get("/Product/getProductsHome");
        const data = response.data as ProductsHomeResponse;
        if (data.isSuccess) {
            dispatch(getProductsBest(data.result.productsBest));
            dispatch(getProductsNew(data.result.productsNew));
        } else {
            dispatch(setError("Failed to fetch products"));
        }
    } catch (error) {
        dispatch(setError(error as string));
    } finally {
        dispatch(setLoading(false));
    }
};

export const getProductById = (id: string) => async (dispatch: any) => {
    try {
        dispatch(setLoading(true));
        const response = await api.get(`/Product/detailsproduct/${id}`);
        const data = response.data.result as ProductDetailsDto;
        dispatch(setCurrentProduct(data));
    } catch (error) {
        dispatch(setError(error as string));
    } finally {
        dispatch(setLoading(false));
    }
}