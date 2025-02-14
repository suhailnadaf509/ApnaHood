import { useState } from "react"
import type { Category, Resource } from "../data/localResources"
import { Star, ChevronDown, ChevronUp } from "lucide-react"
import { LocationDetails } from "./LocationDetails"

interface ResourceListProps {
  category: Category
}

export function ResourceList({ category }: ResourceListProps) {
  const [expandedResource, setExpandedResource] = useState<string | null>(null)
  const [newResource, setNewResource] = useState({
    name: "",
    type: category.id,
    description: "",
    address: "",
    phone: "",
    rating: 5,
    city: "",
    state: "",
    zipCode: "",
  })

  const toggleResource = (resourceId: string) => {
    setExpandedResource(expandedResource === resourceId ? null : resourceId)
  }

  const handleAddResource = (e: React.FormEvent) => {
    e.preventDefault()
    const resource: Resource = {
      id: `res${category.resources.length + 1}`,
      ...newResource,
      reviews: [],
    }
    category.resources.push(resource)
    setNewResource({
      name: "",
      type: category.id,
      description: "",
      address: "",
      phone: "",
      rating: 5,
      city: "",
      state: "",
      zipCode: "",
    })
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-gray-100">{category.name}</h2>
      <form onSubmit={handleAddResource} className="mb-4 space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={newResource.name}
          onChange={(e) => setNewResource({ ...newResource, name: e.target.value })}
          className="w-full px-3 py-2 bg-[#3a3a3a] border-gray-600 rounded-md text-gray-100 placeholder-gray-400"
          required
        />
        <textarea
          placeholder="Description"
          value={newResource.description}
          onChange={(e) => setNewResource({ ...newResource, description: e.target.value })}
          className="w-full px-3 py-2 bg-[#3a3a3a] border-gray-600 rounded-md text-gray-100 placeholder-gray-400"
          required
        />
        <input
          type="text"
          placeholder="Address"
          value={newResource.address}
          onChange={(e) => setNewResource({ ...newResource, address: e.target.value })}
          className="w-full px-3 py-2 bg-[#3a3a3a] border-gray-600 rounded-md text-gray-100 placeholder-gray-400"
          required
        />
        <input
          type="text"
          placeholder="City"
          value={newResource.city}
          onChange={(e) => setNewResource({ ...newResource, city: e.target.value })}
          className="w-full px-3 py-2 bg-[#3a3a3a] border-gray-600 rounded-md text-gray-100 placeholder-gray-400"
          required
        />
        <input
          type="text"
          placeholder="State"
          value={newResource.state}
          onChange={(e) => setNewResource({ ...newResource, state: e.target.value })}
          className="w-full px-3 py-2 bg-[#3a3a3a] border-gray-600 rounded-md text-gray-100 placeholder-gray-400"
          required
        />
        <input
          type="text"
          placeholder="Zip Code"
          value={newResource.zipCode}
          onChange={(e) => setNewResource({ ...newResource, zipCode: e.target.value })}
          className="w-full px-3 py-2 bg-[#3a3a3a] border-gray-600 rounded-md text-gray-100 placeholder-gray-400"
          required
        />
        <input
          type="text"
          placeholder="Phone"
          value={newResource.phone}
          onChange={(e) => setNewResource({ ...newResource, phone: e.target.value })}
          className="w-full px-3 py-2 bg-[#3a3a3a] border-gray-600 rounded-md text-gray-100 placeholder-gray-400"
          required
        />
        <button type="submit" className="w-full bg-[#5a5a5a] text-white px-4 py-2 rounded hover:bg-[#6a6a6a]">
          Add Resource
        </button>
      </form>
      {category.resources.length > 0 ? (
        <ul className="space-y-4">
          {category.resources.map((resource) => (
            <li key={resource.id} className="bg-[#2a2a2a] shadow rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-gray-100">{resource.name}</h3>
                  <p className="text-gray-400">
                    {resource.address}, {resource.city}, {resource.state} {resource.zipCode}
                  </p>
                  <p className="text-gray-400">{resource.phone}</p>
                </div>
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 mr-1" />
                  <span className="text-gray-100">{resource.rating.toFixed(1)}</span>
                </div>
              </div>
              <button
                onClick={() => toggleResource(resource.id)}
                className="mt-2 text-[#5a5a5a] flex items-center hover:text-gray-300"
              >
                {expandedResource === resource.id ? (
                  <>
                    Hide Details
                    <ChevronUp className="w-4 h-4 ml-1" />
                  </>
                ) : (
                  <>
                    View Details
                    <ChevronDown className="w-4 h-4 ml-1" />
                  </>
                )}
              </button>
              {expandedResource === resource.id && <LocationDetails resource={resource} />}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">No resources found for this category.</p>
      )}
    </div>
  )
}

