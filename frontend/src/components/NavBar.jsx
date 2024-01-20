import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <nav>
            <div>
                <div
                    className="hidden w-full md:block md:w-auto"
                    id="navbar-default"
                >
                    <ul className="font-medium flex justify-end flex-col p-4 md:p-0 mt-4 border rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
                        <li>
                            <Link to="/">
                                <a
                                    href="/"
                                    className="block py-2 px-3 text-black bg-blue-700 rounded md:bg-transparent md:p-0 hover:text-blue-700"
                                    aria-current="page"
                                >
                                    Home
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link to="/shop">
                                <a
                                    href="#"
                                    className="block py-2 px-3 text-black bg-blue-700 rounded md:bg-transparent md:p-0 hover:text-blue-700"
                                    aria-current="page"
                                >
                                    Shop
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link to="/cart">
                                <a
                                    href="#"
                                    className="block py-2 px-3 text-black bg-blue-700 rounded md:bg-transparent md:p-0 hover:text-blue-700"
                                    aria-current="page"
                                >
                                    Shopping Cart
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link to="/deutsche">
                                <a
                                    href="#"
                                    className="block py-2 px-3 text-black bg-blue-700 rounded md:bg-transparent md:p-0 hover:text-blue-700"
                                    aria-current="page"
                                >
                                    Deutsche Seite
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link to="https://www.almuqaddima.com/">
                                <a
                                    className="block py-2 px-3 text-black bg-blue-700 rounded md:bg-transparent md:p-0 hover:text-blue-700"
                                    aria-current="page"
                                >
                                    Al-Muqaddima
                                </a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
