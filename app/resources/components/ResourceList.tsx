import { useState, useEffect } from "react";
import type { Category, Resource } from "../data/localResources";
import { Star, ChevronDown, ChevronUp } from "lucide-react";
import { ResourceDetails } from "./ResourceDetails";

interface ResourceListProps {
  category: Category;
}

interface Post {
  id: string;
  title: string;
  content: string;
}

export function ResourceList({ category }: ResourceListProps) {
  const [expandedResource, setExpandedResource] = useState<string | null>(null);
  const [newResource, setNewResource] = useState<
    Omit<Resource, "id" | "reviews">
  >({
    name: "",
    type: category.id,
    description: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
    rating: 0,
  });
  const [posts, setPosts] = useState<Post[]>([]);

  const toggleResource = (resourceId: string) => {
    setExpandedResource(expandedResource === resourceId ? null : resourceId);
  };

  const handleAddResource = async (e: React.FormEvent) => {
    e.preventDefault();
    const resource: Resource = {
      id: `res${category.resources.length + 1}`,
      ...newResource,
      reviews: [],
    };

    // New fetch POST request to add the resource to the database
    try {
      const response = await fetch("/api/resource", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resource),
      });

      if (!response.ok) {
        throw new Error("Failed to add resource");
      }

      const addedResource = await response.json();
      category.resources.push(addedResource); // Update local state with the added resource
    } catch (error) {
      console.error(error);
      // Handle error (e.g., show a notification)
    }

    setNewResource({
      name: "",
      type: category.id,
      description: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      phone: "",
      rating: 0,
    });
  };

  // Fetch resources and posts on component mount
  useEffect(() => {
    const fetchResourcesAndPosts = async () => {
      try {
        const response = await fetch("/api/resource");
        const data = await response.json();
        // Assuming data contains both resources and posts
        // Update local state with fetched posts
        setPosts(data.posts);
      } catch (error) {
        console.error("Failed to fetch resources and posts:", error);
      }
    };

    fetchResourcesAndPosts();
  }, []); // Empty dependency array to run once on mount

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-gray-100">
        {category.name}
      </h2>
      <form onSubmit={handleAddResource} className="mb-4">
        <input
          type="text"
          placeholder="Name"
          value={newResource.name}
          onChange={(e) =>
            setNewResource({ ...newResource, name: e.target.value })
          }
          className="w-full px-3 py-2 bg-[#3a3a3a] border-gray-600 rounded-md text-gray-100 placeholder-gray-400 mb-2"
          required
        />
        <textarea
          placeholder="Description"
          value={newResource.description}
          onChange={(e) =>
            setNewResource({ ...newResource, description: e.target.value })
          }
          className="w-full px-3 py-2 bg-[#3a3a3a] border-gray-600 rounded-md text-gray-100 placeholder-gray-400 mb-2"
          required
          rows={3}
        />
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Address"
            value={newResource.address}
            onChange={(e) =>
              setNewResource({ ...newResource, address: e.target.value })
            }
            className="w-full px-3 py-2 bg-[#3a3a3a] border-gray-600 rounded-md text-gray-100 placeholder-gray-400 mb-2"
            required
          />
          <button
            type="button"
            className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              // Logic to get current location goes here
            }}
          >
            Current Location
          </button>
        </div>
        <input
          type="text"
          placeholder="City"
          value={newResource.city}
          onChange={(e) =>
            setNewResource({ ...newResource, city: e.target.value })
          }
          className="w-full px-3 py-2 bg-[#3a3a3a] border-gray-600 rounded-md text-gray-100 placeholder-gray-400 mb-2"
          required
        />
        <input
          type="text"
          placeholder="State"
          value={newResource.state}
          onChange={(e) =>
            setNewResource({ ...newResource, state: e.target.value })
          }
          className="w-full px-3 py-2 bg-[#3a3a3a] border-gray-600 rounded-md text-gray-100 placeholder-gray-400 mb-2"
          required
        />
        <input
          type="text"
          placeholder="Zip Code"
          value={newResource.zipCode}
          onChange={(e) =>
            setNewResource({ ...newResource, zipCode: e.target.value })
          }
          className="w-full px-3 py-2 bg-[#3a3a3a] border-gray-600 rounded-md text-gray-100 placeholder-gray-400 mb-2"
          required
        />
        <input
          type="tel"
          placeholder="Phone"
          value={newResource.phone}
          onChange={(e) =>
            setNewResource({ ...newResource, phone: e.target.value })
          }
          className="w-full px-3 py-2 bg-[#3a3a3a] border-gray-600 rounded-md text-gray-100 placeholder-gray-400 mb-2"
          required
        />
        <input
          type="number"
          placeholder="Rating"
          value={newResource.rating}
          onChange={(e) =>
            setNewResource({ ...newResource, rating: Number(e.target.value) })
          }
          className="w-full px-3 py-2 bg-[#3a3a3a] border-gray-600 rounded-md text-gray-100 placeholder-gray-400 mb-2"
          required
          min="0"
          max="5"
          step="0.1"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Resource
        </button>
      </form>
      {category.resources.length > 0 ? (
        <ul className="space-y-4">
          {category.resources.map((resource) => (
            <li
              key={resource.id}
              className="bg-[#2a2a2a] shadow rounded-lg p-4"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-gray-100">
                    {resource.name}
                  </h3>
                  <p className="text-gray-400">
                    {resource.address}, {resource.city}, {resource.state}{" "}
                    {resource.zipCode}
                  </p>
                </div>
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 mr-1" />
                  <span className="text-gray-100">
                    {resource.rating ? resource.rating.toFixed(1) : "N/A"}
                  </span>
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
              {expandedResource === resource.id && (
                <ResourceDetails resource={resource} />
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">No resources found for this category.</p>
      )}
      {Array.isArray(posts) && posts.length > 0 ? (
        <div className="mt-4">
          <h3 className="text-xl font-semibold text-gray-100">Posts</h3>
          <ul className="space-y-4">
            {posts.map((post) => (
              <li key={post.id} className="bg-[#2a2a2a] shadow rounded-lg p-4">
                <h4 className="text-lg font-semibold text-gray-100">
                  {post.title}
                </h4>
                <p className="text-gray-400">{post.content}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-gray-400">No posts found.</p>
      )}
    </div>
  );
}
