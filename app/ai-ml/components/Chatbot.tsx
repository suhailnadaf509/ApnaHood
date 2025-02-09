"use client"

import { useState } from "react"
import { useChat } from "ai/react"
import { processUserInput } from "../lib/ai-service"

interface ChatbotProps {
  storeOwner?: string
  onStoresUpdate?: (stores: any[]) => void
}

type Message = {
  id: string;
  role: "data" | "user" | "system" | "assistant";
  content: string;
};

export function Chatbot({ storeOwner, onStoresUpdate }: ChatbotProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  
  const { messages, input, handleInputChange, setMessages } = useChat({
    initialMessages: storeOwner
      ? [{ id: "0", role: "system", content: `You are now chatting with the owner of ${storeOwner}.` }]
      : [],
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isProcessing) return

    setIsProcessing(true)
    
    try {
      const userMessage: Message = { id: Date.now().toString(), role: "user", content: input };
      setMessages([...messages, userMessage]);

      if (!storeOwner && onStoresUpdate) {
        const result = await processUserInput(input);
        onStoresUpdate(result.stores);
        
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: result.message
        }]);
      }
    } catch (error) {
      console.error('Error processing message:', error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: "assistant",
        content: "I'm sorry, I encountered an error processing your request. Please try again."
      }]);
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <div className="flex flex-col h-full bg-gray-800 rounded-lg overflow-hidden">
      <div className="p-4 bg-gray-700 text-center">
        <h2 className="text-xl font-bold">{storeOwner ? `Chat with ${storeOwner}` : "AI Assistant"}</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m) => (
          <div key={m.id} className={`${m.role === "user" ? "text-right" : "text-left"}`}>
            <span className={`inline-block p-2 rounded-lg ${m.role === "user" ? "bg-blue-600" : "bg-gray-700"}`}>
              {m.content}
            </span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-700">
        <input
          className="w-full p-2 bg-gray-700 rounded text-white"
          value={input}
          placeholder={storeOwner ? "Type your message to the store owner..." : "Describe what kind of help you're looking for..."}
          onChange={handleInputChange}
          disabled={isProcessing}
        />
      </form>
    </div>
  )
}
