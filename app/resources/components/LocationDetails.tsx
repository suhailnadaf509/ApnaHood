import { useState } from "react"
import type { Resource, Review } from "../data/localResources"
import { Star } from "lucide-react"

export interface LocationDetailsProps {
  resource: Resource
}

export function LocationDetails({ resource }: LocationDetailsProps) {
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" })
  const [reviews, setReviews] = useState(resource.reviews)

  const handleNotifyOwner = () => {
    alert(`The owner of ${resource.name} has been notified.`)
  }

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault()
    const review: Review = {
      id: `rev${reviews.length + 1}`,
      user: "Anonymous",
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split("T")[0],
    }
    setReviews([...reviews, review])
    setNewReview({ rating: 5, comment: "" }) // Fixed: Changed setNewLocation to setNewReview
  }

  return (
    <div className="mt-4">
      <h4 className="text-lg font-semibold mb-2 text-gray-100">Reviews</h4>
      {reviews.map((review) => (
        <div key={review.id} className="mb-2 p-2 bg-[#3a3a3a] rounded">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 mr-1" />
            <span className="text-gray-100">{review.rating}</span>
            <span className="ml-2 text-sm text-gray-400">
              {review.user} - {review.date}
            </span>
          </div>
          <p className="text-gray-300">{review.comment}</p>
        </div>
      ))}
      <form onSubmit={handleAddReview} className="mt-4">
        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-300">Rating</label>
          <select
            value={newReview.rating}
            onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
            className="mt-1 block w-full rounded-md bg-[#3a3a3a] border-gray-600 text-gray-100 shadow-sm focus:border-[#5a5a5a] focus:ring focus:ring-[#5a5a5a] focus:ring-opacity-50"
          >
            {[1, 2, 3, 4, 5].map((rating) => (
              <option key={rating} value={rating}>
                {rating}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-300">Comment</label>
          <textarea
            value={newReview.comment}
            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
            className="mt-1 block w-full rounded-md bg-[#3a3a3a] border-gray-600 text-gray-100 shadow-sm focus:border-[#5a5a5a] focus:ring focus:ring-[#5a5a5a] focus:ring-opacity-50"
            rows={3}
          ></textarea>
        </div>
        <button type="submit" className="bg-[#5a5a5a] text-white px-4 py-2 rounded hover:bg-[#6a6a6a]">
          Add Review
        </button>
      </form>
      <button onClick={handleNotifyOwner} className="mt-4 bg-[#5a5a5a] text-white px-4 py-2 rounded hover:bg-[#6a6a6a]">
        Notify Owner
      </button>
    </div>
  )
}

