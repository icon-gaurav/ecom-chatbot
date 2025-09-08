import { NextResponse } from "next/server";
import products from "@/data/products.json";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const q = (searchParams.get("query") || "").toLowerCase();
    const maxPrice = searchParams.get("maxPrice");

    let results = products;
    if (q) {
        results = results.filter((product) =>
            product.name.toLowerCase().includes(q) ||
            product.description.toLowerCase().includes(q) ||
            product.category.toLowerCase().includes(q)
        );
    }
    if (maxPrice) {
        const maxPriceCents = parseFloat(maxPrice);
        results = results.filter((product) => product.price <= maxPriceCents);
    }

    return NextResponse.json(results);
}
