"use server";

import { writeFile } from "fs/promises";
import { join } from "path";
import { mkdir } from "fs";
import { promisify } from "util";

const mkdirAsync = promisify(mkdir);

export async function createPost(formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const image = formData.get("image") as File | null;

  // Validate title and content
  if (!title || !content) {
    throw new Error("Title and content are required.");
  }

  let imagePath = "";

  if (image) {
    const uploadsDir = join("public", "uploads");

    // Ensure the uploads directory exists
    try {
      await mkdirAsync(uploadsDir, { recursive: true });
    } catch (error) {
      console.error("Error creating uploads directory:", error);
      return;
    }

    const path = join(uploadsDir, image.name);
    const buffer = await image.arrayBuffer();
    await writeFile(path, Buffer.from(buffer));
    imagePath = `/uploads/${image.name}`;
  }

  // In a real application, you would save the post data to a database here
  const post = {
    id: Date.now().toString(),
    title,
    content,
    imagePath,
  };

  return post;
}
