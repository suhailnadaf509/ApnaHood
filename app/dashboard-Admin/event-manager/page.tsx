"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";
import { CardContent, Card } from "@/components/ui/card";
import Image from "next/image";

interface EventPost {
  id: string;
  name: string;
  datetime: string;
  imageUrl?: string;
}

export default function EventManager() {
  const [posts, setPosts] = useState<EventPost[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const datetime = formData.get("datetime") as string;
    const imageFile = formData.get("image") as File;

    if (!name || !datetime) return;

    const newPost: EventPost = {
      id: crypto.randomUUID(),
      name,
      datetime,
      imageUrl: imagePreview || "",
    };

    setPosts((prev) => [newPost, ...prev]);
    setImagePreview(null);
    e.currentTarget.reset();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = (id: string) => {
    setPosts((prev) => prev.filter((post) => post.id !== id));
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center mb-8">Event Manager</h1>

        {/* Submit Form */}
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white">
                  Event Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  required
                  className="bg-zinc-800 border-zinc-700 text-white"
                  placeholder="Enter event name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="datetime" className="text-white">
                  Date & Time
                </Label>
                <Input
                  id="datetime"
                  name="datetime"
                  type="datetime-local"
                  required
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image" className="text-white">
                  Event Poster (Optional)
                </Label>
                <Input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
              </div>

              {imagePreview && (
                <div className="mt-4">
                  <Image
                    src={imagePreview || "/placeholder.svg"}
                    alt="Preview"
                    width={200}
                    height={200}
                    className="rounded-lg object-cover"
                  />
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-zinc-700 hover:bg-zinc-600"
              >
                Add Event
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Posts Display */}
        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id} className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-6 flex items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <h3 className="text-xl font-semibold text-white">
                    {post.name}
                  </h3>
                  <p className="text-zinc-400">
                    {new Date(post.datetime).toLocaleString()}
                  </p>
                  {post.imageUrl && (
                    <Image
                      src={post.imageUrl || "/placeholder.svg"}
                      alt={post.name}
                      width={300}
                      height={200}
                      className="rounded-lg object-cover mt-2"
                    />
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(post.id)}
                  className="text-zinc-400 hover:text-red-400 hover:bg-zinc-800"
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
