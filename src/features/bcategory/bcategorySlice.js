import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import bcategoryService from "./bcategoryService";

export const getBCategories = createAsyncThunk(
  "bcategory/get-bcategories",
  async (thunkAPI) => {
    try {
      return bcategoryService.getBCategories();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const createBCategory = createAsyncThunk(
  "bcategory/create-blogcategory",
  async (bCateData, thunkAPI) => {
    try {
      return await bcategoryService.createBlogCategory(bCateData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetState = createAction("Reset-all");
const initialState = {
  bcategories: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const bcategorySlice = createSlice({
  name: "bcategories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.bcategories = action.payload;
      })
      .addCase(getBCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createBCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.createdBCate = action.payload;
      })
      .addCase(createBCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default bcategorySlice.reducer;
