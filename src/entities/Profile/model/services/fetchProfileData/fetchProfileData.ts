import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL, getAuthHeaders } from "@/shared/api";
import type { Profile } from "../../types/profile";

export const PROFILE_ERROR = "Не удалось загрузить профиль";

export const fetchProfileData = createAsyncThunk<Profile, void, { rejectValue: string }>(
  "profile/fetchProfileData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/profile`, { headers: getAuthHeaders() });

      if (!response.ok) {
        return rejectWithValue(PROFILE_ERROR);
      }

      return (await response.json()) as Profile;
    } catch {
      return rejectWithValue(PROFILE_ERROR);
    }
  },
);
