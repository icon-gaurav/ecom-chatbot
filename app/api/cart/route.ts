import { NextResponse } from "next/server";
import products from "@/data/products.json";
let cart: any[] = []; // in-memory for now

export async function POST(req: Request) {
    const { product_id, qty } = await req.json();
    const productId = parseInt(product_id)
    let product = products.find((p) => p.id === productId);
    const item = cart.find((i) => i.product_id === productId);

    if (item) {
        item.qty += qty;
    } else {
        cart.push({ product_id, qty, ...product });
    }

    return NextResponse.json(cart);
}

export async function GET() {
    return NextResponse.json(cart);
}
