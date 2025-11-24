"use client";


import {CartItem} from "@/lib/cartStore";

export default function Cart({items = []}: { items?: any }) {


    const total = items?.reduce((sum:number, i:CartItem) => sum + i.price * i.qty, 0);

    return (
        <div className="p-4 bg-white rounded-xl shadow-md w-[320px]">
            <h2 className="text-lg font-bold mb-3">🛒 Your Cart</h2>

            {items.length === 0 && <p className="text-gray-500">Cart is empty</p>}

            <ul className="space-y-3">
                {items.map((item:CartItem) => (
                    <li
                        key={item.productId}
                        className="flex items-center justify-between gap-2 border-b pb-2"
                    >
                        <div className="flex items-center gap-2">
                            {item.image && (
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-10 h-10 rounded"
                                />
                            )}
                            <div>
                                <p className="font-medium">{item.name}</p>
                                <p className="text-sm text-gray-500">
                                    ₹{item?.price} × {item.qty} =  ${item?.price * item.qty}
                                </p>
                            </div>

                        </div>

                    </li>
                ))}
            </ul>

            {items.length > 0 && (
                <div className="pt-3 flex justify-between font-bold">
                    <span>Total -&nbsp;</span>
                    <span>₹{total ? total.toFixed(2) : "0.00"}</span>
                </div>
            )}
        </div>
    );
}
