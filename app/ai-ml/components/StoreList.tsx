"use client"

import { useState } from "react"
import type { Store } from "../lib/database"

interface StoreListProps {
  stores: Store[]
  onSearch: (query: string) => void
  onSelectStore: (store: Store) => void
}

export function StoreList({ stores, onSearch, onSelectStore }: StoreListProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSearch(searchQuery)
  }

  return (
    <div className="h-full flex flex-col">
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          placeholder="Search for a product..."
          className="w-full p-2 bg-gray-800 rounded-lg text-white"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>
      <div className="flex-1 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Stores</h2>
        {stores.length === 0 ? (
          <p>No stores found. Try searching for a product.</p>
        ) : (
          <ul className="space-y-2">
            {stores.map((store) => (
              <li
                key={store.id}
                className="bg-gray-800 rounded-lg p-2 cursor-pointer hover:bg-gray-700"
                onClick={() => onSelectStore(store)}
              >
                <h3 className="font-bold">{store.name}</h3>
                <p className="text-sm text-gray-400">{store.category}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

