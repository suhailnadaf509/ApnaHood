"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { fetchPosts, addPost, addComment } from "../actions/lostPetsActions"
import LostPetMap from "./LostPetMap"

interface Comment {
  id: string
  author: string
  content: string
  location: string
  timestamp: string
}

interface Post {
  id: string
  petName: string
  lostLocation: string
  photoUrl: string
  ownerName: string
  ownerNumber: string
  comments: Comment[]
}

export default function LostPetsPosts() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [newComment, setNewComment] = useState({ postId: "", content: "", location: "" })

  useEffect(() => {
    const loadPosts = async () => {
      const fetchedPosts = await fetchPosts()
      setPosts(fetchedPosts)
      setLoading(false)
    }
    loadPosts()
  }, [])

  const handleNewPost = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    try {
      const newPost = await addPost(formData)
      setPosts([newPost, ...posts])
      event.currentTarget.reset()
    } catch (error) {
      console.error("Error adding post:", error)
    }
  }

  const handleAddComment = async (postId: string) => {
    if (!newComment.content || !newComment.location) return

    try {
      const updatedPost = await addComment(postId, {
        content: newComment.content,
        location: newComment.location,
      })
      setPosts(posts.map(post => post.id === postId ? updatedPost : post))
      setNewComment({ postId: "", content: "", location: "" })
    } catch (error) {
      console.error("Error adding comment:", error)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-8">
      <Card className="bg-[#121212] border-[#1A1A1A]">
        <CardHeader>
          <CardTitle>Report Lost Pet</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleNewPost} className="space-y-4">
            <div>
              <Label htmlFor="petName">Pet Name</Label>
              <Input id="petName" name="petName" required className="bg-[#1A1A1A] border-[#2A2A2A]" />
            </div>
            <div>
              <Label htmlFor="lostLocation">Last Seen Location</Label>
              <Input id="lostLocation" name="lostLocation" required className="bg-[#1A1A1A] border-[#2A2A2A]" />
            </div>
            <div>
              <Label htmlFor="photo">Photo</Label>
              <Input id="photo" name="photo" type="file" accept="image/*" required className="bg-[#1A1A1A] border-[#2A2A2A]" />
            </div>
            <div>
              <Label htmlFor="ownerName">Your Name</Label>
              <Input id="ownerName" name="ownerName" required className="bg-[#1A1A1A] border-[#2A2A2A]" />
            </div>
            <div>
              <Label htmlFor="ownerNumber">Contact Number</Label>
              <Input id="ownerNumber" name="ownerNumber" required className="bg-[#1A1A1A] border-[#2A2A2A]" />
            </div>
            <Button type="submit" className="w-full">Submit Report</Button>
          </form>
        </CardContent>
      </Card>

      {posts.map((post) => (
        <Card key={post.id} className="bg-[#121212] border-[#1A1A1A]">
          <CardHeader>
            <CardTitle>{post.petName}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative h-64 w-full">
              <Image
                src={post.photoUrl}
                alt={post.petName}
                fill
                className="object-cover rounded-md"
              />
            </div>
            <div>
              <p><strong>Last Seen:</strong> {post.lostLocation}</p>
              <p><strong>Contact:</strong> {post.ownerName} ({post.ownerNumber})</p>
            </div>
            
            {post.comments.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Sightings</h3>
                <LostPetMap comments={post.comments} />
                <div className="mt-4 space-y-2">
                  {post.comments.map((comment) => (
                    <div key={comment.id} className="bg-[#1A1A1A] p-3 rounded-md">
                      <p>{comment.content}</p>
                      <p className="text-sm text-gray-400 mt-1">
                        Reported by {comment.author} on {new Date(comment.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Textarea
                placeholder="Report a sighting..."
                value={newComment.content}
                onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
                className="bg-[#1A1A1A] border-[#2A2A2A]"
              />
              <Input
                placeholder="Location (Google Maps URL)"
                value={newComment.location}
                onChange={(e) => setNewComment({ ...newComment, location: e.target.value })}
                className="bg-[#1A1A1A] border-[#2A2A2A]"
              />
              <Button onClick={() => handleAddComment(post.id)}>Add Sighting</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}