"use server"

import { revalidatePath } from "next/cache"

interface Post {
  id: string
  author: string
  title: string
  content: string
  createdAt: string
}

interface User {
  id: string
  name: string
  email: string
  role: string
}

// Simulated database
let posts: Post[] = [
  { id: "1", author: "John Doe", title: "First Post", content: "Hello World", createdAt: "2023-01-01T00:00:00Z" },
  {
    id: "2",
    author: "Jane Smith",
    title: "Second Post",
    content: "Nice to meet you",
    createdAt: "2023-01-02T00:00:00Z",
  },
]

let users: User[] = [
  { id: "1", name: "John Doe", email: "john@example.com", role: "user" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", role: "user" },
  { id: "3", name: "Admin User", email: "admin@example.com", role: "admin" },
]

export async function fetchPosts(): Promise<Post[]> {
  // In a real application, this would fetch from a database
  return posts
}

export async function fetchUsers(): Promise<User[]> {
  // In a real application, this would fetch from a database
  return users
}

export async function deletePost(postId: string): Promise<void> {
  // In a real application, this would delete from a database
  posts = posts.filter((post) => post.id !== postId)
  revalidatePath("/admin")
}

export async function banUser(userId: string): Promise<void> {
  // In a real application, this would update the user's role in a database
  users = users.map((user) => (user.id === userId ? { ...user, role: "banned" } : user))
  revalidatePath("/admin")
}

