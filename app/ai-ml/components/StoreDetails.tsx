import type { Store } from "../lib/database"

interface StoreDetailsProps {
  store: Store
  onNotifyOwner: () => void
}

export function StoreDetails({ store, onNotifyOwner }: StoreDetailsProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">{store.name}</h2>
      <p className="text-gray-400 mb-2">{store.category}</p>
      <p className="mb-4">Phone: {store.phone || "Not available"}</p>
      <h3 className="text-xl font-semibold mb-2">Products:</h3>
      <ul className="list-disc list-inside mb-6">
        {store.products.map((product, index) => (
          <li key={index}>{product}</li>
        ))}
      </ul>
      <button onClick={onNotifyOwner} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Chat with Store Owner
      </button>
    </div>
  )
}

