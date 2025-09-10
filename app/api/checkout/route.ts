import {NextResponse} from "next/server";
import {orderStore, OrderItem} from "@/lib/orderStore";
import {cartStore} from "@/lib/cartStore";

export async function POST() {

    const cart = cartStore.getCart();

    // find total amount
    const totalAmount = cart?.reduce((total, item) => total + item.price * item.qty, 0);
    // Pretend to "process payment"
    if (!cart || cart.length === 0) {
        return NextResponse.json({error: "Cart is empty"}, {status: 400});
    }
    const order = {
        id: `order_${orderStore.getOrders().length + 1}`,
        status: "pending",
        created_at: new Date().toISOString(),
        totalAmount: totalAmount
    };

    orderStore.addItem(order as OrderItem)
    return NextResponse.json(order);
}

export async function GET() {
    return NextResponse.json(orderStore.getOrders());
}
