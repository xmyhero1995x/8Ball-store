import { createSlice } from "@reduxjs/toolkit";

const initialStateCartCounter = {
  items: [],
  itemsQuantity: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialStateCartCounter,
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.itemsQuantity++;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          title: newItem.title,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice =
          existingItem.price * existingItem.quantity;
      }
    },
    removeItem(state, action) {
        const id = action.payload;
        const existingItem = state.items.find((item) => item.id === id);
        state.itemsQuantity--;
        // state.isCartContentChanged = true;
        if (existingItem.quantity === 1) {
          state.items = state.items.filter((item) => item.id !== id);
        } else {
          existingItem.quantity--;
          existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
        }
      },
    //   updateCart(state, action) {
    //     state.items = action.payload.items;
    //     state.itemsQuantity = action.payload.itemsQuantity
    //   }
  },
});

export const cartSliceActions = cartSlice.actions;
export const cartSliceReducer = cartSlice.reducer;
