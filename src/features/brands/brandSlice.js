import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { brandService } from "./brandService";

export const getBrands = createAsyncThunk(
  "brand/get-brands",
  async (thunkAPI) => {
    try {
      return await brandService.getAllBrands();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
// export const getABlog = createAsyncThunk(
//   "blog/get-a-blog",
//   async (id, thunkAPI) => {
//     try {
//       return await blogService.getABlog(id);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );

const brandState = {
  brands: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const brandSlice = createSlice({
  name: "brand",
  initialState: brandState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBrands.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBrands.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.brands = action.payload;
      })
      .addCase(getBrands.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      });
    //   .addCase(getABlog.pending, (state) => {
    //     state.isLoading = true;
    //   })
    //   .addCase(getABlog.fulfilled, (state, action) => {
    //     state.isLoading = false;
    //     state.isError = false;
    //     state.isSuccess = true;
    //     state.singleBlog = action.payload;
    //   })
    //   .addCase(getABlog.rejected, (state, action) => {
    //     state.isLoading = false;
    //     state.isError = true;
    //     state.isSuccess = false;
    //     state.message = action.error;
    //   });
  },
});
export default brandSlice.reducer;
