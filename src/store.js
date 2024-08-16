import { configureStore } from "@reduxjs/toolkit";
import shoppingCartReducer, {loadShoppingCartState} from "./features/shoppingCartSlice";
import "@reduxjs/toolkit";

const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  localStorage.setItem("shoppingCartState", JSON.stringify(store.getState().shoppingCart));
  return result;
};

export const store = configureStore({
  reducer: {
    shoppingCart: shoppingCartReducer,
  },
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), localStorageMiddleware],
  preloadedState: {
    shoppingCart: loadShoppingCartState()

  }

});

export default store;