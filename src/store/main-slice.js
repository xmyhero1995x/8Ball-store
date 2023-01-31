import { createSlice } from "@reduxjs/toolkit";

const initialCartMenuStateSlice = {
  isCartMenuOpen: false,
  statusMessage: null,
};

export const cartSlicer = createSlice({
  name: "cartMenu",
  initialState: initialCartMenuStateSlice,
  reducers: {
    toggleCartVisibility(state) {
      state.isCartMenuOpen = !state.isCartMenuOpen;
    },
    showStatusMessage(state, action) {
      state.statusMessage = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message
      }
    }
  },
});

export const mainReducer = cartSlicer.reducer;
export const mainActions = cartSlicer.actions;
