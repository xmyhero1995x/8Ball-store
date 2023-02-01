import { createSlice } from "@reduxjs/toolkit";
import { mainActions } from "./main-slice";
import axios from "axios";

const initialStateCartCounter = {
  items: [],
  itemsQuantity: 0,
  isCartContentChanged: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialStateCartCounter,
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.itemsQuantity++;
      state.isCartContentChanged = true;
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
        existingItem.totalPrice = existingItem.price * existingItem.quantity;
      }
    },
    removeItem(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.itemsQuantity--;
      state.isCartContentChanged = true;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },

    updateCart(state, action) {
      state.items = action.payload.items;
      state.itemsQuantity = action.payload.itemsQuantity;
    },
  },
});

export const sendCartData = (cartData) => {
  return async (dispatchAction) => {
    dispatchAction(
      mainActions.showStatusMessage({
        status: "success",
        titile: "Data was send",
        message: "Cart data was send",
      })
    );

    const sendDataHttpRequest = async () => {
      await axios({
        method: "put",
        url: `https://ball-f928a-default-rtdb.firebaseio.com/cart.json`,
        data: { items: cartData.items, itemsQuantity: cartData.itemsQuantity },
      });
    };

    try {
      await sendDataHttpRequest();
      dispatchAction(
        mainActions.showStatusMessage({
          status: "success",
          titile: "Data was send",
          message: "Cart data was send",
        })
      );
    } catch (error) {
      dispatchAction(
        mainActions.showStatusMessage({
          status: "error",
          message: "Cart data wasn't send",
        })
      );
    }
  };
};

export const cartSliceActions = cartSlice.actions;

export const getCartData = () => {
  return async (dispatchAction) => {
    const getDataHttpRequest = async () => {
      const response = await axios({
        method: "get",
        url: "https://ball-f928a-default-rtdb.firebaseio.com/cart.json",
      });
      if (!response.ok) {
        throw new Error("Unable to get data ");
      }

      const responseData = await response.json();

      return responseData;
    };

    try {
      const cartData = await getDataHttpRequest();
      dispatchAction(
        cartSliceActions.updateCart({
          items: cartData.items || [],
          itemsQuantity: cartData.itemsQuantity,
        })
      );
    } catch (error) {
      dispatchAction(
        mainActions.showStatusMessage({
          status: "error",
          message: "Error to get cart data",
        })
      );
    }
  };
};

export const cartSliceReducer = cartSlice.reducer;
