// lib/cartStore.ts

export type CartItem = {
    productId: string;
    qty: number;
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
    image: string;
};

class CartStore {
    private items: CartItem[] = [];

    getCart(): CartItem[] {
        return this.items;
    }

    addItem(item: CartItem) {
        const existing = this.items.find(i => i.productId === item.productId);
        if (existing) {
            existing.qty += item.qty;
        } else {
            this.items.push(item);
        }
    }

    removeItem(productId: string) {
        this.items = this.items.filter(i => i.productId !== productId);
    }

    clearCart() {
        this.items = [];
    }
}

const globalForCart = global as unknown as { cartStore?: CartStore };

export const cartStore = globalForCart.cartStore ?? new CartStore();
if (!globalForCart.cartStore) globalForCart.cartStore = cartStore;
