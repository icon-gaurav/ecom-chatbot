"use client";

import { useState } from "react";
import {OrderItem} from "@/lib/orderStore";



export default function Checkout({order}: { order: OrderItem | null }) {
    const [step, setStep] = useState<"details" | "payment" | "success">("details");

    // mock "processing payment"
    const handlePayment = () => {
        setStep("payment");
        setTimeout(() => setStep("success"), 2000);
    };

    return (
        <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-lg">
            <h2 className="text-xl font-bold mb-4">Checkout</h2>

            {step === "details" && (
                <div>
                    <h3 className="font-semibold mb-2">Shipping Info</h3>
                    <form className="space-y-3">
                        <input
                            type="text"
                            placeholder="Full Name"
                            className="w-full border rounded px-3 py-2"
                        />
                        <input
                            type="text"
                            placeholder="Address"
                            className="w-full border rounded px-3 py-2"
                        />
                        <input
                            type="text"
                            placeholder="City"
                            className="w-full border rounded px-3 py-2"
                        />
                        <input
                            type="text"
                            placeholder="ZIP Code"
                            className="w-full border rounded px-3 py-2"
                        />
                    </form>

                    <div className="mt-4 border-t pt-3">
                        <p className="flex justify-between">
                            <span className="font-medium">Total</span>
                            <span>₹{order?.totalAmount}</span>
                        </p>
                    </div>

                    <button
                        onClick={handlePayment}
                        className="mt-4 w-full bg-blue-500 text-white py-2 rounded"
                    >
                        Proceed to Payment
                    </button>
                </div>
            )}

            {step === "payment" && (
                <div className="text-center">
                    <p className="text-gray-600">Processing Payment...</p>
                    <div className="mt-3 animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent mx-auto"></div>
                </div>
            )}

            {step === "success" && (
                <div className="text-center">
                    <h3 className="text-green-600 font-bold text-lg">✅ Payment Successful!</h3>
                    <p className="mt-2 text-gray-600">
                        Thank you for your purchase. Your order will be shipped soon.
                    </p>
                </div>
            )}
        </div>
    );
}
