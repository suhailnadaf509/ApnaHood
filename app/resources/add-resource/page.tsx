"use client"

import { useState } from "react"
import { categories, type CategoryType, type Resource } from "../data/localResources"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function AddResource() {
  const router = useRouter()
  const [newResource, setNewResource] = useState<Omit<Resource, "id" | "rating" | "reviews">>({
    name: "",
    type: "FOOD_BANK" as CategoryType,
    description: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phone: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const categoryIndex = categories.findIndex((category) => category.id === newResource.type)
    if (categoryIndex !== -1) {
      const newResourceWithId: Resource = {
        ...newResource,
        id: `resource-${Date.now()}`,
        rating: 0,
        reviews: [],
      }
      categories[categoryIndex].resources.push(newResourceWithId)
      console.log("New resource added:", newResourceWithId)
      console.log("Updated categories:", categories)
      router.push("/")
    } else {
      console.error("Category not found")
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewResource((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="min-h-screen bg-[#121212] text-gray-200 py-8">
      <div className="container mx-auto px-4">
        <Link href="/" className="inline-block mb-4 text-[#5a5a5a] hover:text-gray-300">
          ← Back to Resources
        </Link>
        <h1 className="text-3xl font-bold mb-6 text-gray-100">Add New Resource</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={newResource.name}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md bg-[#1e1e1e] border-gray-700 text-gray-100 shadow-sm focus:border-[#5a5a5a] focus:ring focus:ring-[#5a5a5a] focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-300">
              Type
            </label>
            <select
              id="type"
              name="type"
              value={newResource.type}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md bg-[#1e1e1e] border-gray-700 text-gray-100 shadow-sm focus:border-[#5a5a5a] focus:ring focus:ring-[#5a5a5a] focus:ring-opacity-50"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={newResource.description}
              onChange={handleInputChange}
              required
              rows={3}
              className="mt-1 block w-full rounded-md bg-[#1e1e1e] border-gray-700 text-gray-100 shadow-sm focus:border-[#5a5a5a] focus:ring focus:ring-[#5a5a5a] focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-300">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={newResource.address}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md bg-[#1e1e1e] border-gray-700 text-gray-100 shadow-sm focus:border-[#5a5a5a] focus:ring focus:ring-[#5a5a5a] focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-300">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={newResource.city}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md bg-[#1e1e1e] border-gray-700 text-gray-100 shadow-sm focus:border-[#5a5a5a] focus:ring focus:ring-[#5a5a5a] focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-300">
              State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={newResource.state}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md bg-[#1e1e1e] border-gray-700 text-gray-100 shadow-sm focus:border-[#5a5a5a] focus:ring focus:ring-[#5a5a5a] focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="zipCode" className="block text-sm font-medium text-gray-300">
              Zip Code
            </label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={newResource.zipCode}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md bg-[#1e1e1e] border-gray-700 text-gray-100 shadow-sm focus:border-[#5a5a5a] focus:ring focus:ring-[#5a5a5a] focus:ring-opacity-50"
            />
          </div>
          <div>
            <button type="submit" className="w-full bg-[#5a5a5a] text-white px-4 py-2 rounded hover:bg-[#6a6a6a]">
              Add Resource
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

