// lib/cartStore.ts

export type OrderItem = {
    id: string;
    totalAmount: number;
    status: string;
    created_at: string;
};

class OrderStore {
    private items: OrderItem[] = [];

    getOrders(): OrderItem[] {
        return this.items;
    }

    getOrder(orderId: string): OrderItem | null {
        return this.items.find(i => i.id === orderId) || null;
    }

    addItem(item: OrderItem) {
        this.items.push(item);
    }

    clear() {
        this.items = [];
    }
}

export const orderStore = new OrderStore();
