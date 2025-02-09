"use client"

import { useState } from "react"
import { Chatbot } from "./components/Chatbot"
import { StoreList } from "./components/StoreList"
import { StoreDetails } from "./components/StoreDetails"
import { processUserInput } from "./lib/ai-service"
import type { Store } from "./lib/database"

export default function Home() {
  const [stores, setStores] = useState<Store[]>([])
  const [selectedStore, setSelectedStore] = useState<Store | null>(null)
  const [isChatting, setIsChatting] = useState(false)

  const handleSearch = async (query: string) => {
    const result = await processUserInput(query)
    const { stores } = result
    setStores(stores)
    setSelectedStore(null)
    setIsChatting(false)
  }

  const handleStoreSelect = (store: Store) => {
    setSelectedStore(store)
    setIsChatting(false)
  }

  const handleNotifyOwner = () => {
    if (selectedStore) {
      setIsChatting(true)
    }
  }
  const handleChatStoresUpdate = (newStores: Store[]) => {
    setStores(newStores);
  };
  
  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      <div className="w-1/3 p-4 border-r border-gray-700">
        <StoreList stores={stores} onSearch={handleSearch} onSelectStore={handleStoreSelect} />
      </div>
      <div className="w-2/3 p-4">
        {isChatting ? (
          <Chatbot storeOwner={selectedStore?.name} />
        ) : selectedStore ? (
          <StoreDetails store={selectedStore} onNotifyOwner={handleNotifyOwner} />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-xl text-gray-500">Select a store to view details or start a chat.</p>
          </div>
        )}
      </div>
    </div>
  )
}
