import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    total: 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addProduct: (state, action) => {
            const product = action.payload;
            const existingProduct = state.products.find(
                (p) => p._id === product._id
            );

            if (!existingProduct) {
                state.products.push({ ...product, buyQuantity: 1 });
                state.total += product.price;
            } else {
                existingProduct.buyQuantity++;
                state.total += product.price;
            }
        },
        removeProduct: (state, action) => {
            const product = action.payload;
            const existingProduct = state.products.find(
                (p) => p._id === product._id
            );

            if (existingProduct.buyQuantity === 1) {
                state.products.pop(existingProduct);
            } else {
                existingProduct.buyQuantity--;
            }
            state.total -= product.price;
            if (state.products.length === 0) state.total = 0;
        },
        clearCart: (state) => {
            state.products = [];
            state.total = 0;
        },
    },
});

export const { addProduct, removeProduct, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
