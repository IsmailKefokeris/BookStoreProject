import React from "react";
import { Route, Routes } from "react-router-dom";

// Pages?
import Home from "./pages/Home";
import EditBook from "./pages/EditBook";
import ShowBook from "./pages/ShowBook";
import CreateBook from "./pages/CreateBooks";
import DeleteBook from "./pages/DeleteBook";
import ShoppingCart from "./pages/shoppingCart";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<ShoppingCart />} />
            <Route path="/books/create" element={<CreateBook />} />
            <Route path="/books/edit/:id" element={<EditBook />} />
            <Route path="/books/details/:id" element={<ShowBook />} />
            <Route path="/books/delete/:id" element={<DeleteBook />} />
        </Routes>
    );
};

export default App;
