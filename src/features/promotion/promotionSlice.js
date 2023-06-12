import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import promotionService from "./promotionService";

export const getPromotions = createAsyncThunk(
  "promotion/get-promotions",
  async (thunkAPI) => {
    try {
      return promotionService.getPromotions();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteOnePromotion = createAsyncThunk(
  "promotion/delete-promotion",
  async (id, thunkAPI) => {
    try {
      await promotionService.deleteAPromotion(id);
      return thunkAPI.dispatch(getPromotions());
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const createAPromotion = createAsyncThunk(
  "promotion/create-promotion",
  async (promotionData, thunkAPI) => {
    console.log(promotionData);
    try {
      return await promotionService.createPromotion(promotionData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getOnePromotion = createAsyncThunk(
  "promotion/get-one-promotion",
  async (id, thunkAPI) => {
    try {
      return await promotionService.getOnePromotion(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateAPromotion = createAsyncThunk(
  "promotion/update-promotion",
  async (promotion, thunkAPI) => {
    try {
      return await promotionService.updatePromotion(promotion);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetState = createAction("Reset-all");

const initialState = {
  promotions: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

const promotionSlice = createSlice({
  name: "promotions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPromotions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPromotions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.promotions = action.payload;
      })
      .addCase(getPromotions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteOnePromotion.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteOnePromotion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.deletedPromotion = action.payload;
      })
      .addCase(deleteOnePromotion.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(createAPromotion.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAPromotion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.createdPromotion = action.payload;
        console.log("====================================");
        console.log(action.payload);
        console.log("====================================");
      })
      .addCase(createAPromotion.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(getOnePromotion.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOnePromotion.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.isSuccess = true;
        state.promotionProductName = action.payload.productID[0]?.title;
        state.promotionStartDate = action.payload.startDate;
        state.promotionEndDate = action.payload.endDate;
        state.promotionDiscount = action.payload.discount;
        state.promotionStatus = action.payload.status;
      })
      .addCase(getOnePromotion.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(updateAPromotion.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAPromotion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.updatedPromotion = action.payload;
      })
      .addCase(updateAPromotion.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(resetState, () => initialState);
  },
});
export default promotionSlice.reducer;
