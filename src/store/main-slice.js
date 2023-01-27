import { createSlice } from "@reduxjs/toolkit";

const initialCartMenuStateSlice = {
  isCartMenuOpen: false,
};

export const cartSlicer = createSlice({
  name: "cartMenu",
  initialState: initialCartMenuStateSlice,
  reducers: {
    toggleCartVisibility(state) {
      state.isCartMenuOpen = !state.isCartMenuOpen;
    },
  },
});

export const cartMenuReducer = cartSlicer.reducer;
export const cartMenuActions = cartSlicer.actions;
