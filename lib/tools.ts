// lib/tools.ts
export async function fetchCatalog({query, maxPrice}: { query: string; maxPrice: number }) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/catalog?query=${query}&maxPrice=${maxPrice}`
    );
    if (!res.ok) throw new Error("Failed to fetch catalog");
    return res.json();
}

export async function addToCart(productId: string, quantity: number) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cart`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({product_id: productId, qty: quantity}),
    });
    if (!res.ok) throw new Error("Failed to add to cart");
    return res.json();
}

export async function checkoutCart() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/checkout`, {
        method: "POST",
    });
    if (!res.ok) throw new Error("Failed to checkout");
    return res.json();
}
