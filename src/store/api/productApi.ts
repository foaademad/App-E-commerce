import { getProductsBest, getProductsNew, setCurrentCategory, setCurrentProduct, setError, setLoading } from "../slice/productSlice";
import api from "../utility/api/api";
import { CategoryProductsResponse, ProductDetailsDto, ProductsHomeResponse } from "../utility/interfaces/productInterface";

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
    } catch (error: any) {
        const errorMessage = error?.response?.data?.message || error?.message || 'An error occurred';
        dispatch(setError(errorMessage));
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
    } catch (error: any) {
        const errorMessage = error?.response?.data?.message || error?.message || 'An error occurred';
        dispatch(setError(errorMessage));
    } finally {
        dispatch(setLoading(false));
    }
}


export const getallProductByCategoryId = (categoryId: string) => async (dispatch: any) => {
    if (!categoryId || categoryId === 'undefined') {
        dispatch(setError('Invalid category ID'));
        return;
    }
    
    try {
        dispatch(setLoading(true));
        const response = await api.get(`/Product/getalltocatgeory?categoryId=${categoryId}&page=1&pageSize=10`);
        const data = response.data as CategoryProductsResponse;
        
        if (data.isSuccess) {
            // إنشاء كائن CategoryDto مع المنتجات
            const categoryWithProducts = {
                ...data.result.category,
                products: data.result.products
            };
            dispatch(setCurrentCategory(categoryWithProducts));
        } else {
            dispatch(setError(data.message || 'Failed to fetch category products'));
        }
    } catch (error: any) {
        const errorMessage = error?.response?.data?.message || error?.message || 'An error occurred';
        dispatch(setError(errorMessage));
    } finally {
        dispatch(setLoading(false));
    }
}