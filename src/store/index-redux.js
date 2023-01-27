import { configureStore } from "@reduxjs/toolkit";
import { cartMenuReducer } from "./main-slice";
import { cartSliceReducer } from "./cart-slice";

export const store = configureStore({
  reducer: {
    cartMenu: cartMenuReducer,
    cart: cartSliceReducer
  },
});
