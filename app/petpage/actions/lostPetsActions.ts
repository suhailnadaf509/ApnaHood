"use server"

import { revalidatePath } from "next/cache"
import { writeFile } from "fs/promises"
import { join } from "path"

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

let posts: Post[] = [
  {
    id: "1",
    petName: "Max",
    lostLocation: "Central Park",
    photoUrl: "/uploads/placeholder.jpg",
    ownerName: "John Doe",
    ownerNumber: "123-456-7890",
    comments: [
      {
        id: "1",
        author: "Jane Smith",
        content: "I saw a dog matching this description near the lake.",
        location: "https://maps.google.com/?q=40.7812,-73.9665",
        timestamp: "2023-05-01T12:00:00Z",
      },
    ],
  },
]

export async function fetchPosts(): Promise<Post[]> {
  // In a real application, this would fetch from a database
  return posts
}

export async function addPost(formData: FormData): Promise<Post> {
  const file = formData.get("photo") as File
  const petName = formData.get("petName") as string
  const lostLocation = formData.get("lostLocation") as string
  const ownerName = formData.get("ownerName") as string
  const ownerNumber = formData.get("ownerNumber") as string

  if (!file || !petName || !lostLocation || !ownerName || !ownerNumber) {
    throw new Error("Missing required fields")
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const path = join("public", "uploads", file.name)
  await writeFile(path, buffer)
  const photoUrl = `/uploads/${file.name}`

  const post: Post = {
    id: Date.now().toString(),
    petName,
    lostLocation,
    photoUrl,
    ownerName,
    ownerNumber,
    comments: [],
  }

  posts = [post, ...posts]
  revalidatePath("/")
  return post
}

export async function addComment(postId: string, newComment: { content: string; location: string }): Promise<Post> {
  const post = posts.find((p) => p.id === postId)
  if (!post) throw new Error("Post not found")

  const comment: Comment = {
    id: Date.now().toString(),
    author: "Anonymous", // In a real app, this would be the logged-in user
    content: newComment.content,
    location: newComment.location,
    timestamp: new Date().toISOString(),
  }

  post.comments.push(comment)
  revalidatePath("/")
  return post
}

