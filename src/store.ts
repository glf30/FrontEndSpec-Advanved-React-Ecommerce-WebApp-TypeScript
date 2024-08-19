import { configureStore, Middleware } from "@reduxjs/toolkit";
import shoppingCartReducer, { loadShoppingCartState } from "./features/shoppingCartSlice";

// Middleware to save the shopping cart state to local storage
const localStorageMiddleware: Middleware<{}> = (store) => (next) => (action) => {
  const result = next(action);
  localStorage.setItem("shoppingCartState", JSON.stringify(store.getState().shoppingCart));
  return result;
};

// Create the store with the shopping cart reducer
export const store = configureStore({
  reducer: {
    shoppingCart: shoppingCartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware), // Use concat to add the middleware
  preloadedState: {
    shoppingCart: loadShoppingCartState(),
  },
});

// Define RootState type based on the store's state
export type RootState = ReturnType<typeof store.getState>;

export default store;
