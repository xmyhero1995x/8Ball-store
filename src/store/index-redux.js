import { configureStore } from "@reduxjs/toolkit";
import { mainReducer } from "./main-slice";
import { cartSliceReducer } from "./cart-slice";

export const store = configureStore({
  reducer: {
    main: mainReducer,
    cart: cartSliceReducer
  },
});
