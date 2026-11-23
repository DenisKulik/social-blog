import { createSlice } from "@reduxjs/toolkit";
import { fetchProfileData, PROFILE_ERROR } from "../services/fetchProfileData/fetchProfileData";
import type { ProfileSchema } from "../types/profile";

export const profileInitialState: ProfileSchema = {
  isLoading: false,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState: profileInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileData.pending, (state) => {
        state.isLoading = true;
        delete state.error;
      })
      .addCase(fetchProfileData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchProfileData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? PROFILE_ERROR;
      });
  },
});

export const { actions: profileActions } = profileSlice;
export const { reducer: profileReducer } = profileSlice;
