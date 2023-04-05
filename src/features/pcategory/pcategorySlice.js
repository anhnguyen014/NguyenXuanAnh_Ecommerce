import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import pcategoryService from "../pcategory/pcategoryService";

export const getPCategories = createAsyncThunk(
  "pcategory/get-pcategories",
  async (thunkAPI) => {
    try {
      return pcategoryService.getPCategories();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const createCategory = createAsyncThunk(
  "category/create-category",
  async (cateData, thunkAPI) => {
    try {
      return await pcategoryService.createCategory(cateData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetState = createAction("Reset-all");

const initialState = {
  pcategories: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const pcategorySlice = createSlice({
  name: "pcategories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.pcategories = action.payload;
      })
      .addCase(getPCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.createdCategory = action.payload;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default pcategorySlice.reducer;
