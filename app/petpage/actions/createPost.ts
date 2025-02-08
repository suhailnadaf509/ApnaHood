"use server"

import { writeFile } from "fs/promises"
import { join } from "path"

export async function createPost(formData: FormData) {
  const title = formData.get("title") as string
  const content = formData.get("content") as string
  const image = formData.get("image") as File | null

  if (!title || !content) {
    return { error: "Title and content are required." }
  }

  let imagePath = ""

  if (image) {
    const bytes = await image.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const path = join("public", "uploads", image.name)
    await writeFile(path, buffer)
    imagePath = `/uploads/${image.name}`
  }

  // In a real application, you would save the post data to a database here
  const post = {
    id: Date.now().toString(),
    title,
    content,
    imagePath,
  }

  return post
}

