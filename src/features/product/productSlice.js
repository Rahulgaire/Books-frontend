import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: localStorage.getItem('cartItems')?.products || [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,

  reducers: {
    // Add a product to the cart
    addTocart: (state, action) => {
      state.products.push(action.payload);
      localStorage.setItem('cartItems',JSON.stringify(state))
    },
    

    // Remove a product from the cart by ID
    removeFromCart: (state, action) => {
      state.products = state.products.filter(
        (item) => item.id !== action.payload
      );
    },

    // Clear all products from the cart
    clearCart: (state) => {
      state.products = [];
    },
  },
});

export const { addTocart, removeFromCart, clearCart } = productSlice.actions;
export default productSlice.reducer;