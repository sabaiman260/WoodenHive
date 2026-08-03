import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "@/lib/api";

const initialState = {
  isLoading: false,
  shippingCost: 0,
  announcementBar: {
    backgroundColor: "#1a1a1a",
    segments: [
      { text: "🎉 HAPPY 14 AUGUST!", bgColor: "#0f5c3a", textColor: "#FFD700" },
      { text: "EXCLUSIVE OFFERS UP TO 50% OFF", bgColor: "#FFD700", textColor: "#000000" },
      { text: "FREE DELIVERY ON ALL ORDERS", bgColor: "#0f5c3a", textColor: "#FFD700" },
    ],
    isActive: false,
  },
  heroImages: [],
};

export const getShippingCost = createAsyncThunk(
  "/settings/getShippingCost",
  async () => {
    const res = await axios.get(
        apiUrl("/api/admin/settings/shippingCost")
    );
    return res.data;
  }
);

export const setShippingCost = createAsyncThunk(
  "/settings/setShippingCost",
  async (value) => {
    const res = await axios.put(
        apiUrl("/api/admin/settings/shippingCost"),
      { value }
    );
    return res.data;
  }
);

export const getAnnouncementBar = createAsyncThunk(
  "/settings/getAnnouncementBar",
  async () => {
    const res = await axios.get(
      apiUrl("/api/admin/settings/announcementBar")
    );
    return res.data;
  }
);

export const setAnnouncementBar = createAsyncThunk(
  "/settings/setAnnouncementBar",
  async (announcementData) => {
    const res = await axios.put(
      apiUrl("/api/admin/settings/announcementBar"),
      { value: announcementData }
    );
    return res.data;
  }
);

export const getHeroImages = createAsyncThunk(
  "/settings/getHeroImages",
  async () => {
    const res = await axios.get(
      apiUrl("/api/admin/settings/heroImages")
    );
    return res.data;
  }
);

export const setHeroImages = createAsyncThunk(
  "/settings/setHeroImages",
  async (images) => {
    const res = await axios.put(
      apiUrl("/api/admin/settings/heroImages"),
      { value: images }
    );
    return res.data;
  }
);

const SettingsSlice = createSlice({
  name: "adminSettings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getShippingCost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getShippingCost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.shippingCost = action.payload?.data?.value || 0;
      })
      .addCase(getShippingCost.rejected, (state) => {
        state.isLoading = false;
        state.shippingCost = 0;
      })
      .addCase(setShippingCost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setShippingCost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.shippingCost = action.payload?.data?.value || 0;
      })
      .addCase(setShippingCost.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getAnnouncementBar.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAnnouncementBar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.announcementBar = action.payload?.data?.value || initialState.announcementBar;
      })
      .addCase(getAnnouncementBar.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(setAnnouncementBar.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setAnnouncementBar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.announcementBar = action.payload?.data?.value || initialState.announcementBar;
      })
      .addCase(setAnnouncementBar.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getHeroImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getHeroImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.heroImages = action.payload?.data?.value || [];
      })
      .addCase(getHeroImages.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(setHeroImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setHeroImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.heroImages = action.payload?.data?.value || [];
      })
      .addCase(setHeroImages.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default SettingsSlice.reducer;
