"use client"
import { useState, ChangeEvent } from "react";

export default function ChatbotInterface() {

    const [userMessage, setUserMessage] = useState("");
    const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);

    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);



    const generate = async() => {
        if (!userMessage) return;

        setLoading(true);
        const temp_message = userMessage;
        setUserMessage("");

        try {
            const response = await fetch(`/api/ai?text=${encodeURIComponent(temp_message)}`);
            const data = await response.json();
            setResult(data);
        } catch (error) {
            console.error('error during classification: ', error);
            setResult({ error: 'Classification failed' });   
        } finally {
            setLoading(false);
        }
    };

    const handleSend = () => {
        if (!userMessage.trim()) return;
    
        setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
        setUserMessage(""); // Clear input
      };

    return (

        <div className="flex flex-col bg-blue-700 min-h-screen">
            {/* messages area */}
            <h1 className="flex text-3xl justify-center p-5">Winners Win</h1>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, idx) => (
                <div
                    key={idx}
                    className={`p-3 rounded-lg ${
                    msg.role === "user" ? "bg-blue-500 text-white self-end" : "bg-gray-300 text-black self-start"
                    }`}
                >
                    {msg.content}
                    
                </div>
                ))}
                {result && (
                    <pre className="bg-black-600 p-4 rounded mt-4">
                    {JSON.stringify(result, null, 2)}
                    </pre>
                )}
            </div>
            {/* Input Area */}
            <div className="flex items-center gap-2 p-2 pb-20 border-t bg-white">
                <input
                type="text"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                
                <button
                onClick={generate}
                disabled={loading}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                {loading ? 'Loading...' : 'Generate'}
                </button>
                
            </div>

        </div>
    );


  
}

// message box 