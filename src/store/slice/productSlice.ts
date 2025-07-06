import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductDetailsDto, ProductDto } from "../utility/interfaces/productInterface";

const initialState = {
    productsBest: [] as ProductDto[],
    productsNew: [] as ProductDto[],
    currentProduct: null as ProductDetailsDto | null,
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
    },
});

export const { getProductsBest, getProductsNew, setLoading, setError, setCurrentProduct } = productSlice.actions;
export default productSlice.reducer;