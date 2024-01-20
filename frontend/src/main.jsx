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

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const STRIPE_KEY =
    "pk_test_51OUDlLB0Nb68w01k5N1oCiHLwd8BfW1Dtg9u13rgjIMAApwO0V6VFZBzDnwNZMH1Y3mxGKItOBgztegMkdzCzsPF003c5oH8q0";

// Create the Stripe object yourself...
const stripePromise = loadStripe(STRIPE_KEY);

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <SnackbarProvider>
            <Provider store={store}>
                <Elements stripe={stripePromise}>
                    <PersistGate loading={null} persistor={persistor}>
                        <App />
                    </PersistGate>
                </Elements>
            </Provider>
        </SnackbarProvider>
    </BrowserRouter>
);
