// app/page.tsx
"use client";

import {useChat} from "@ai-sdk/react";
import {DefaultChatTransport} from "ai";
import {useState} from "react";
import {Bot, User} from "lucide-react";

export default function Home() {
    const {messages, sendMessage, status} = useChat({
        transport: new DefaultChatTransport({
            api: '/api/chat',
        }),
    });
    const [input, setInput] = useState('');

    return (
        <main className="flex flex-col items-center pt-4 min-h-screen bg-white">
            <div className="w-[70vw] bg-white rounded-lg p-6">
                <h1 className="text-2xl font-bold mb-4 text-center">
                    🛍️ Shopping Assistant
                </h1>

                {/* Chat messages */}
                <div className="space-y-4 h-[calc(100vh-200px)] w-full overflow-y-auto p-4 rounded-lg mb-4">
                    {messages.map((m) => (
                        <div
                            key={m.id}
                            className={`flex flex-start items-start gap-3 items-center`}
                        >
                            {m.role === "user" ? (
                                <div className="flex items-center gap-2">
                                    <div className="bg-blue-500 text-white p-2 rounded-full">
                                        <User className="w-5 h-5"/>
                                    </div>
                                </div>) : (
                                <div className="flex items-center gap-2">
                                    <div className="bg-gray-600 text-white p-2 rounded-full">
                                        <Bot className="w-5 h-5"/>
                                    </div>
                                </div>
                            )}
                            <div className={` py-[5px] px-[10px] rounded-[10px] ${m.role === "user" ? "bg-blue-100" : "bg-gray-200"}`}>
                                {m.parts.map((part, index) => {
                                        switch (part?.type) {
                                            case 'step-start':
                                                // show step boundaries as horizontal lines:
                                                return index > 0 ? (
                                                    <div key={index} className="text-gray-500">
                                                        <hr className="my-2 border-gray-300"/>
                                                    </div>
                                                ) : null;
                                            case 'tool-fetchCatalog':
                                                switch (part?.state) {
                                                    case 'input-streaming':
                                                        return <pre
                                                            key={`tool-${index}`}>{JSON.stringify(part.input, null, 2)}</pre>;
                                                    case 'input-available':
                                                        return <pre
                                                            key={`tool-${index}`}>{JSON.stringify(part.input, null, 2)}</pre>;
                                                    case 'output-available':
                                                        return <pre
                                                            key={`tool-${index}`}>{JSON.stringify(part.output, null, 2)}</pre>;
                                                    case 'output-error':
                                                        return <div key={`tool-${index}`}>Error: {part.errorText}</div>;
                                                }
                                                break;
                                            case 'tool-addToCart':
                                                switch (part?.state) {
                                                    case 'input-streaming':
                                                        return <pre
                                                            key={`tool-${index}`}>{JSON.stringify(part.input, null, 2)}</pre>;
                                                    case 'input-available':
                                                        return <pre
                                                            key={`tool-${index}`}>{JSON.stringify(part.input, null, 2)}</pre>;
                                                    case 'output-available':
                                                        return <pre
                                                            key={`tool-${index}`}>{JSON.stringify(part.output, null, 2)}</pre>;
                                                    case 'output-error':
                                                        return <div key={`tool-${index}`}>Error: {part.errorText}</div>;
                                                }
                                                break;
                                            case 'tool-checkoutCart':
                                                switch (part?.state) {
                                                    case 'input-streaming':
                                                        return <pre
                                                            key={`tool-${index}`}>{JSON.stringify(part.input, null, 2)}</pre>;
                                                    case 'input-available':
                                                        return <pre
                                                            key={`tool-${index}`}>{JSON.stringify(part.input, null, 2)}</pre>;
                                                    case 'output-available':
                                                        return <pre
                                                            key={`tool-${index}`}>{JSON.stringify(part.output, null, 2)}</pre>;
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
                        className="flex-1 border border-gray-300 shadow-lg rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
                        value={input}
                        disabled={status !== 'ready'}
                        placeholder="Ask about products... e.g. 'Show me shoes under $200'"
                        onChange={e => setInput(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 shadow-lg disabled:opacity-50"
                        disabled={status !== 'ready' || !input.trim()}
                    >
                        Ask
                    </button>
                </form>
            </div>
        </main>
    );
}
