import { NextResponse } from "next/server";
import products from "@/data/products.json";
import {CartItem, cartStore} from "@/lib/cartStore";

export async function POST(req: Request) {
    const { product_id, qty } = await req.json();
    const productId = parseInt(product_id)
    let product = products.find((p) => p.id === productId);
    cartStore.addItem({ productId, qty, ...product } as CartItem)

    return NextResponse.json(cartStore.getCart());
}

export async function GET() {
    return NextResponse.json(cartStore.getCart());
}
