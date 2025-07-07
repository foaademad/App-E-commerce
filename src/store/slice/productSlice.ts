import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CategoryDto, ProductDetailsDto, ProductDto } from "../utility/interfaces/productInterface";

const initialState = {
    productsBest: [] as ProductDto[],
    productsNew: [] as ProductDto[],
    currentProduct: null as ProductDetailsDto | null,
    currentCategory: null as CategoryDto | null,
    loading: false,
    error: null as string | null,
}

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        getProductsBest: (state, action: PayloadAction<ProductDto[]>) => {
            state.productsBest = action.payload;
        },
        getProductsNew: (state, action: PayloadAction<ProductDto[]>) => {
            state.productsNew = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload || null;
        },
        setCurrentProduct: (state, action: PayloadAction<ProductDetailsDto | null>) => {
            state.currentProduct = action.payload;
        },
        setCurrentCategory: (state, action: PayloadAction<CategoryDto | null>) => {
            state.currentCategory = action.payload;
        },
    },
});

export const { getProductsBest, getProductsNew, setLoading, setError, setCurrentProduct, setCurrentCategory } = productSlice.actions;
export default productSlice.reducer;