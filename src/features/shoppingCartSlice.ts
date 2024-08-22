import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Item } from "../interface/types";

interface ShoppingCartState {
    shoppingCart: Item[];
    totalItems: number;
    totalPrice: number;
}

// Set the initial state of the cart
const initialState: ShoppingCartState = {
    shoppingCart: [],
    totalItems: 0,
    totalPrice: 0,
};

// check to see if there is a shopping cart state in local storage 
// if there is return it if not return the initial state
export const loadShoppingCartState = (): ShoppingCartState => {
    const shoppingCartState = localStorage.getItem("shoppingCartState");
    if (shoppingCartState) {
        return JSON.parse(shoppingCartState);
    } else {
        return initialState;
    }
};

// Create a slice to handle what to do to the shopping cart
export const shoppingCartSlice = createSlice({
    name: "shopping cart",
    initialState,
    reducers: {
        // Add to cart function, takes the current state and adds the payload.
        // add 1 to total items
        // add the price of the item to the total price
        addToCart: (state, action: PayloadAction<Item>) => {
            state.shoppingCart = [...state.shoppingCart, action.payload];
            state.totalItems += 1;
            state.totalPrice += action.payload.price;
            console.log("added to cart");
        },
        removeFromCart: (state, action: PayloadAction<Item>) => {
            // filter out the item that matches the id of the payload
            // subtract 1 from total items
            // subtract the price of the item from the total
            state.shoppingCart = state.shoppingCart.filter(
                (item) => item.id !== action.payload.id
            );
            state.totalItems -= 1;
            state.totalPrice -= action.payload.price;
            console.log("Item Deleted");
            console.log(action.payload);
        },
        clearCart: (state) => {
            // set the cart to empty
            // remove the local storage
            state.shoppingCart = [];
            state.totalItems = 0;
            state.totalPrice = 0;
            localStorage.removeItem("shoppingCartState");
        },
    },
});

export const { addToCart, removeFromCart, clearCart } = shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;