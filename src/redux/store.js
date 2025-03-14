import { configureStore } from "@reduxjs/toolkit";
import { signInReducer } from "./signInreducer/signInReducer";
import { cartReducer } from "./cartReducer/cartReducer";
import { myOrderReducer } from "./myOrderReducer/myOrderReducer";
let store = configureStore({
  reducer: { signInReducer, cartReducer, myOrderReducer },
});

export default store;
