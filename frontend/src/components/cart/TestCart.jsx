import React from "react";
import Label from "@/components/ui/label";
import {
    SelectValue,
    SelectTrigger,
    SelectItem,
    SelectContent,
    Select,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const TestCart = () => {
    function TrashIcon(props) {
        return (
            <svg
                {...props}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
            </svg>
        );
    }

    return (
        <div className="flex flex-col h-full p-6">
            <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
            <div className="flex-1 grid gap-6">
                <div className="grid gap-4 border rounded-lg p-4">
                    <div className="flex items-center gap-4">
                        <div className="flex-1">
                            <h2 className="text-lg font-semibold">
                                Acme Product
                            </h2>
                            <p className="text-gray-500">$99.99</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Label className="text-base" htmlFor="quantity">
                                Quantity
                            </Label>
                            <Select defaultValue="1" id="quantity">
                                <SelectTrigger className="w-24">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">1</SelectItem>
                                    <SelectItem value="2">2</SelectItem>
                                    <SelectItem value="3">3</SelectItem>
                                    <SelectItem value="4">4</SelectItem>
                                    <SelectItem value="5">5</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Button size="icon" variant="outline">
                            <TrashIcon className="h-4 w-4" />
                            <span className="sr-only">Remove</span>
                        </Button>
                    </div>
                </div>
            </div>
            <div className="grid gap-4 mt-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Total</h2>
                    <p className="text-lg">$99.99</p>
                </div>
                <Button className="w-full" size="lg">
                    Checkout
                </Button>
                <Button className="w-full" size="lg" variant="outline">
                    Continue Shopping
                </Button>
            </div>
        </div>
    );
};

export default TestCart;
