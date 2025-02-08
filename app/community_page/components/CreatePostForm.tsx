"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface CreatePostFormProps {
  onSubmit: (post: FormData) => void;
}

export default function CreatePostForm({ onSubmit }: CreatePostFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) {
      formData.append("image", image);
    }
    onSubmit(formData);
    setTitle("");
    setContent("");
    setImage(null);
  };

  return (
    <Card className="bg-[#1E1E1E] text-gray-300 mb-6 border-[#2A2A2A]">
      <CardHeader>
        <CardTitle className="text-gray-100">Create a New Post</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-gray-300">
              Title
            </Label>
            <Input
              id="title"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-[#2A2A2A] border-[#3A3A3A] text-gray-100 placeholder-gray-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="content" className="text-gray-300">
              Content
            </Label>
            <Textarea
              id="content"
              placeholder="What's happening in the neighborhood?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="bg-[#2A2A2A] border-[#3A3A3A] text-gray-100 placeholder-gray-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="image" className="text-gray-300">
              Image (optional)
            </Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              className="bg-[#2A2A2A] border-[#3A3A3A] text-gray-100"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className="bg-[#3A3A3A] text-gray-100 hover:bg-[#4A4A4A]"
          >
            Post
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
