import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";
// import { store } from "./state/store.js";

import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./state/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <SnackbarProvider>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <App />
                </PersistGate>
            </Provider>
        </SnackbarProvider>
    </BrowserRouter>
);
