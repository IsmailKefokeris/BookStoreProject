import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart/cartSlice";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import { combineReducers } from "redux";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["cart"],
};

const rootReducer = combineReducers({
    cart: cartReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({ reducer: persistedReducer });

export const persistor = persistStore(store);

// export const store = configureStore({
//     reducer: {
//         cart: cartReducer,
//     },
// });
