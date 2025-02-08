"use client"

import { useState } from "react"
import Post from "./Post"
import CreatePostForm from "./CreatePostForm"
import { createPost } from "../actions/createPost"

interface PostData {
  id: string
  author: string
  title: string
  content: string
  imagePath?: string
}

export default function Posts() {
  const [currentUser, setCurrentUser] = useState("John Doe") // Simulating a logged-in user
  const [posts, setPosts] = useState<PostData[]>([
    {
      id: "1",
      author: "John Doe",
      title: "Community Cleanup This Weekend",
      content: "Join us for a neighborhood cleanup this Saturday at 10 AM. Meet at the central park!",
      imagePath: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "2",
      author: "Jane Smith",
      title: "New Coffee Shop Opening",
      content: "Excited to announce that a new artisanal coffee shop is opening next week on Main Street!",
      imagePath: "/placeholder.svg?height=200&width=300",
    },
  ])

  const addPost = async (formData: FormData) => {
    const result = await createPost(formData)
    if ("error" in result) {
      return { error: result.error }
    }
    setPosts([{ ...result, author: currentUser }, ...posts])
    return {}
  }

  const deletePost = (id: string) => {
    setPosts(posts.filter((post) => post.id !== id))
  }

  return (
    <>
      <div className="mb-4 text-gray-400">Logged in as: {currentUser}</div>
      <CreatePostForm onSubmit={addPost} />
      <div className="space-y-6">
        {posts.map((post) => (
          <Post key={post.id} {...post} currentUser={currentUser} onDelete={deletePost} />
        ))}
      </div>
    </>
  )
}

