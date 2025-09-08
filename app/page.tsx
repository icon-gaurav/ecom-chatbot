// app/page.tsx
"use client";

import {useChat} from "@ai-sdk/react";
import {DefaultChatTransport} from "ai";
import {useState} from "react";

export default function Home() {
    const {messages, sendMessage, status, isLoading} = useChat({
        transport: new DefaultChatTransport({
            api: '/api/chat',
        }),
    });
    const [input, setInput] = useState('');

    return (
        <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
            <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-bold mb-4 text-center">
                    🛍️ Shopping Assistant
                </h1>

                {/* Chat messages */}
                <div className="space-y-4 h-[400px] overflow-y-auto border p-4 rounded-lg mb-4 bg-gray-50">
                    {messages.map((m) => (
                        <div
                            key={m.id}
                            className={`p-2 rounded-md ${
                                m.role === "user"
                                    ? "bg-blue-100 self-end text-right"
                                    : "bg-gray-200 self-start text-left"
                            }`}
                        >
                            <strong>{m.role === "user" ? "You" : "AI"}:</strong>
                            {m.parts.map((part, index) => {
                                    switch (part?.type) {
                                        case 'step-start':
                                            // show step boundaries as horizontal lines:
                                            return index > 0 ? (
                                                <div key={index} className="text-gray-500">
                                                    <hr className="my-2 border-gray-300" />
                                                </div>
                                            ) : null;
                                        case 'tool-fetchCatalog':
                                            switch (part?.state) {
                                                case 'input-streaming':
                                                    return <pre key={`tool-${index}`}>{JSON.stringify(part.input, null, 2)}</pre>;
                                                case 'input-available':
                                                    return <pre key={`tool-${index}`}>{JSON.stringify(part.input, null, 2)}</pre>;
                                                case 'output-available':
                                                    return <pre key={`tool-${index}`}>{JSON.stringify(part.output, null, 2)}</pre>;
                                                case 'output-error':
                                                    return <div key={`tool-${index}`}>Error: {part.errorText}</div>;
                                            }
                                            break;
                                        case 'tool-addToCart':
                                            switch (part?.state) {
                                                case 'input-streaming':
                                                    return <pre key={`tool-${index}`}>{JSON.stringify(part.input, null, 2)}</pre>;
                                                case 'input-available':
                                                    return <pre key={`tool-${index}`}>{JSON.stringify(part.input, null, 2)}</pre>;
                                                case 'output-available':
                                                    return <pre key={`tool-${index}`}>{JSON.stringify(part.output, null, 2)}</pre>;
                                                case 'output-error':
                                                    return <div key={`tool-${index}`}>Error: {part.errorText}</div>;
                                            }
                                            break;
                                        case 'tool-checkoutCart':
                                            switch (part?.state) {
                                                case 'input-streaming':
                                                    return <pre key={`tool-${index}`}>{JSON.stringify(part.input, null, 2)}</pre>;
                                                case 'input-available':
                                                    return <pre key={`tool-${index}`}>{JSON.stringify(part.input, null, 2)}</pre>;
                                                case 'output-available':
                                                    return <pre key={`tool-${index}`}>{JSON.stringify(part.output, null, 2)}</pre>;
                                                case 'output-error':
                                                    return <div key={`tool-${index}`}>Error: {part.errorText}</div>;
                                            }
                                            break;

                                        case 'text':
                                            return <span key={index}>{part.text}</span>;
                                    }
                                }
                            )}
                        </div>
                    ))}
                    {status === 'submitted' && <div className="text-gray-500">Thinking...</div>}
                </div>

                {/* Input box */}
                <form onSubmit={e => {
                    e.preventDefault();
                    if (input.trim()) {
                        sendMessage({text: input});
                        setInput('');
                    }
                }} className="flex gap-2">
                    <input
                        className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={input}
                        disabled={status !== 'ready'}
                        placeholder="Ask about products... e.g. 'Show me shoes under $200'"
                        onChange={e => setInput(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                        disabled={isLoading}
                    >
                        Send
                    </button>
                </form>
            </div>
        </main>
    );
}
