import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  cart: [],
};
let cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    setUserCartItem: (state, action) => {
      state.cart = action.payload;
    },
    removeCartItem: (state, action) => {
      state.cart = state.cart.filter((item) => item._id !== action.payload);
    },
    updateQty: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item._id === action.payload.orderId) {
          item.qty += action.payload.qty;
          return item;
        } else {
          return item;
        }
      });

      let index = state.cart.findIndex(
        (item) => item._id === action.payload.orderId
      );

      if (state.cart[index].qty <= 0) {
        state.cart.splice(index, 1);
      }
    },

    emptyCart: (state, action) => {
      state.cart = [];
    },
  },
});

let cartReducer = cartSlice.reducer;
let cartAction = cartSlice.actions;
let cartSelector = (state) => state.cartReducer;

export { cartReducer, cartAction, cartSelector };
