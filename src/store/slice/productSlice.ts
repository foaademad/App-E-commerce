import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductDto } from "../utility/interfaces/productInterface";

const initialState = {
    productsBest: [] as ProductDto[],
    productsNew: [] as ProductDto[],
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
    },
});

export const { getProductsBest, getProductsNew, setLoading, setError } = productSlice.actions;
export default productSlice.reducer;