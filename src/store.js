import { configureStore } from "@reduxjs/toolkit";
import shoppingCartReducer from "./features/shoppingCartSlice";

export const store = configureStore({
  reducer: {
    shoppingCart: shoppingCartReducer,
  },
});

export default store;