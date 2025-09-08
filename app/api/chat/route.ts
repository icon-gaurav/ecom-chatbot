import {convertToModelMessages, streamText, UIMessage} from "ai";
import {addToCart, checkoutCart, fetchCatalog} from "@/lib/tools";
import {google} from "@ai-sdk/google";
import {NextRequest, NextResponse} from "next/server";
import {z} from 'zod';

export const runtime = "edge";
const gemini = google("models/gemini-2.5-flash-lite");
const SYSTEM_PROMPT = `
You are a shopping assistant AI integrated with tools.

You can help the user browse products, add them to a cart, and checkout.

### Available tools:
1. **fetchCatalog()**
   - Retrieves all products from the catalog.
   - Always call this tool to see what products are available before suggesting items.

2. **addToCart(productId: string)**
   - Adds the specified product to the user's cart.
   - Call this when the user asks to "add", "buy", or "I want this".

3. **checkoutCart()**
   - Processes the order and simulates checkout.
   - Only call this if the user explicitly says "checkout", "place order", or "buy now".

---

### Rules of behavior:
- Never invent products. Only use the results returned by 'fetchCatalog'.
- Always confirm product details (name, price, stock) when suggesting items.
- If the user is vague (e.g., "show me something cool"), fetch the catalog and then suggest a few options.
- Be conversational and friendly, but clearly indicate actions you’re taking.
- After a successful checkout, thank the user and end the flow.

---

### Examples:

**User:** "Show me headphones under $150"  
**Assistant reasoning:** Call 'fetchCatalog', filter results by category + price, then present matching products.  

**User:** "Yes, add the headphones to my cart"  
**Assistant reasoning:** Call 'addToCart(productId)' for that item then show the current cart.  

**User:** "Checkout now"  
**Assistant reasoning:** Call 'checkoutCart' and return the order confirmation.
`

export async function POST(req: NextRequest) {
    try {
        const {messages}: { messages: UIMessage[] } = await req.json()

        const result = await streamText({
            model: gemini,
            system: SYSTEM_PROMPT,
            messages: convertToModelMessages(messages),
            tools: {
                fetchCatalog: {
                    description: "Retrieves all products from the catalog.",
                    inputSchema: z.object({
                        query: z.string().optional().default(""),
                        maxPrice: z.number().optional().default(1000)
                    }),
                    execute: async ({query, maxPrice}) => {
                        return await fetchCatalog({query, maxPrice});
                    }
                },
                addToCart: {
                    description: "Adds the specified product to the user's cart.",
                    inputSchema: z.object({
                        productId: z.string(),
                        quantity: z.number().optional().default(1)
                    }),
                    execute: async ({productId, quantity}) => {
                        return await addToCart(productId, quantity);
                    }
                },
                checkoutCart: {
                    description: "Processes the order and simulates checkout.",
                    inputSchema: z.object({}),
                    execute: async () => {
                        return await checkoutCart();
                    }
                }
            }
        });


        return result.toUIMessageStreamResponse({
            onError: errorHandler
        });
    } catch (err) {
        console.error("Error : ", err);
        return NextResponse.json({error: "Internal server error"}, {status: 500});
    }
}

function errorHandler(error: unknown) {
    if (error == null) {
        return 'unknown error';
    }

    if (typeof error === 'string') {
        return error;
    }

    if (error instanceof Error) {
        return error.message;
    }

    return JSON.stringify(error);
}
