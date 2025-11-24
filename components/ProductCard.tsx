// components/ProductCard.tsx
"use client";

import {useState} from "react";

export default function ProductCard({product, addToCart}: { product: any, addToCart: any }) {
    const [adding, setAdding] = useState(false);
    const [added, setAdded] = useState(false);

    const handleAddToCart = async () => {
        setAdding(true);
        addToCart(product?.id, product?.name)
        setAdded(true)
        setAdding(false);
    };

    return (
        <div className="border rounded-xl p-4 shadow-md flex flex-col items-center gap-2 bg-white">
            <img
                src={product.image}
                alt={product.name}
                className="w-32 h-32 object-cover rounded-lg"
            />
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-600">₹{product?.price}</p>
            <button
                onClick={handleAddToCart}
                disabled={adding || added}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
            >
                {adding ? "Adding..." : added ? "Added" : "Add to Cart"}
            </button>
        </div>
    );
}
