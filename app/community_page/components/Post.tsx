"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown, Trash2 } from "lucide-react";

interface PostProps {
  id: string;
  user_id: string;
  title: string;
  content: string;
  imagePath?: string;
  currentUser: string;
  onDelete: (id: string) => void;
}

export default function Post({
  id,
  user_id,
  title,
  content,
  imagePath,
  currentUser,
  onDelete,
}: PostProps) {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  const isAuthor = user_id === currentUser;

  return (
    <Card className="bg-[#1E1E1E] text-gray-300 mb-4 border-[#2A2A2A]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage
                src={`https://api.dicebear.com/6.x/initials/svg?seed=${user_id}`}
              />
              <AvatarFallback>{user_id[0]}</AvatarFallback>
            </Avatar>
            <CardTitle className="text-gray-100">{title}</CardTitle>
          </div>
          {isAuthor && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(id)}
              className="text-gray-400 hover:text-red-500 hover:bg-[#2A2A2A]"
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p>{content}</p>
        {imagePath && (
          <div className="mt-4">
            <Image
              src={imagePath || "/placeholder.svg"}
              alt="Post image"
              width={300}
              height={200}
              className="rounded-md"
            />
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setLikes(likes + 1)}
            className="bg-[#2A2A2A] text-gray-300 border-[#3A3A3A] hover:bg-[#3A3A3A]"
          >
            <ThumbsUp className="mr-2 h-4 w-4" /> {likes}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setDislikes(dislikes + 1)}
            className="bg-[#2A2A2A] text-gray-300 border-[#3A3A3A] hover:bg-[#3A3A3A]"
          >
            <ThumbsDown className="mr-2 h-4 w-4" /> {dislikes}
          </Button>
        </div>
        <span className="text-sm text-gray-500">Posted by {user_id}</span>
      </CardFooter>
    </Card>
  );
}
