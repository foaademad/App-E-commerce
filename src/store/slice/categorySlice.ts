import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CategoryDto } from "../utility/interfaces/categoryInterface";

const initialState = {
    categories: [] as CategoryDto[],
    loading: false,
    error: null as string | null,
}

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        getCategories: (state, action: PayloadAction<CategoryDto[]>) => {
            state.categories = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload || null;
        },
    },
});

export const { getCategories, setLoading, setError } = categorySlice.actions;
export default categorySlice.reducer;
