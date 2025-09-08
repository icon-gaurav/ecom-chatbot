import { NextResponse } from "next/server";

let orders: any[] = [];

export async function POST() {
    // Pretend to "process payment"
    const order = {
        id: `order_${orders.length + 1}`,
        status: "paid",
        created_at: new Date().toISOString(),
    };

    orders.push(order);
    return NextResponse.json(order);
}

export async function GET() {
    return NextResponse.json(orders);
}
