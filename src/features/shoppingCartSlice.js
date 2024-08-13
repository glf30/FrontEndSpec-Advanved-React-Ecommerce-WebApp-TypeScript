import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    shoppingCart: [],
    totalItems: 0,
};


export const shoppingCartSlice = createSlice({


    name: "shopping cart",
    initialState,

    reducers: {
        addToCart: (state, action) => {
        state.shoppingCart = [...state.shoppingCart, action.payload];
        console.log("added to cart")
        },
        removeFromCart: (state, action) => {
        state.shoppingCart = state.shoppingCart.filter((item) => item.id !== action.payload.id);
        console.log("Item Deleted")
        console.log(action.payload)
    },
    },
    });

    export const { addToCart, removeFromCart } = shoppingCartSlice.actions;

    export default shoppingCartSlice.reducer;