import { createSlice } from "@reduxjs/toolkit";

let INITIALSTATE = {
  signIn: false,
  userData: null,
  role: null,
  name: null,
};

let signInSlice = createSlice({
  initialState: INITIALSTATE,
  name: "signIn",
  reducers: {
    userData: (state, action) => {
      state.userData = action.payload;
    },
    signIn: (state, action) => {
      state.signIn = true;
    },
    logOut: (state, action) => {
      state.signIn = false;
      state.userData = null;
      state.role = null;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setname: (state, action) => {
      state.name = action.payload;
    },
  },
});

let signInReducer = signInSlice.reducer;
let signInAction = signInSlice.actions;
let signInSelector = (state) => state.signInReducer;

export { signInAction, signInReducer, signInSelector };
