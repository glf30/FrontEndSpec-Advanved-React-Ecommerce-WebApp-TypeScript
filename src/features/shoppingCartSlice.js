import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    shoppingCart: [],
    totalItems: 0,
    totalPrice: 0,
};

export const loadShoppingCartState = () => {
        const shoppingCartState = localStorage.getItem("shoppingCartState");
        if (shoppingCartState) {
            return JSON.parse(shoppingCartState);
        }else {
            return initialState;
        };
    }
      



export const shoppingCartSlice = createSlice({


    name: "shopping cart",
    initialState,

    reducers: {
        addToCart: (state, action) => {
        state.shoppingCart = [...state.shoppingCart, action.payload];
        state.totalItems += 1;
        state.totalPrice += action.payload.price
        console.log("added to cart")
        },
        removeFromCart: (state, action) => {
        state.shoppingCart = state.shoppingCart.filter((item) => item.id !== action.payload.id);
        state.totalItems -= 1;
        state.totalPrice -= action.payload.price
        console.log("Item Deleted")
        console.log(action.payload)
    },
    },
    });

    export const { addToCart, removeFromCart } = shoppingCartSlice.actions;

    export default shoppingCartSlice.reducer;