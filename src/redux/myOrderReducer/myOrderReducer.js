import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

let initialState = {
  orders: [],
  error: null,
};

let getAllOrder = createAsyncThunk("getAllOrder", async (action, thumkApi) => {
  let jwtToken = action;
  let url =
    "https://ecommerse-app-amxt.onrender.com/ecom/api/order/getUserOrder";
  let response = await fetch(url, {
    headers: {
      Authorization: jwtToken,
    },
  });
  let responseData = await response.json();
  if (!responseData.success) {
    thumkApi.dispatch(myOrderAction.setError(responseData.msg));
  } else {
    thumkApi.dispatch(myOrderAction.setUserAllOrder(responseData));
    thumkApi.dispatch(myOrderAction.setError(null));
  }
});

let myOrderSlice = createSlice({
  name: "My Order",
  initialState: initialState,
  reducers: {
    setUserAllOrder: (state, action) => {
      state.orders = action.payload.order;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

let myOrderReducer = myOrderSlice.reducer;
let myOrderAction = myOrderSlice.actions;
let myOrderSelector = (state) => state.myOrderReducer;

export { getAllOrder, myOrderReducer, myOrderAction, myOrderSelector };
