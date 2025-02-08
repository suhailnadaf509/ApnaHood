"use client";
import { supabase } from "../../../lib/supabaseClient";
import { useEffect, useState } from "react";
import Post from "./Post";
import CreatePostForm from "./CreatePostForm";
import { createPost } from "../actions/createPost";
import { getSession } from "next-auth/react";
interface PostData {
  id: string;
  user_id: string;
  title: string;
  content: string;
  imagePath?: string;
}

export default function Posts() {
  const [userName, setUserName] = useState<string>("");
  const fetchuserdata = async () => {
    try {
      const session = await getSession();

      if (session?.user) {
        setUserName(session.user.email || "user");
      }
    } catch (error) {
      console.error("error fetching session data:", error);
    }
  };
  useEffect(() => {
    fetchuserdata();
  }, []);

  useEffect(() => {
    setCurrentUser(userName.split("@")[0]);
  }, [userName]);

  const [currentUser, setCurrentUser] = useState(userName.split("@")[0]);
  const [posts, setPosts] = useState<PostData[]>([]);
  const [newpost, setnewpost] = useState("");
  const sendMessage = async (formData: FormData) => {
    const content = formData.get("content") as string;
    const imageFile = formData.get("image") as File;
    const title = formData.get("title") as string;
    if (!content.trim() && !imageFile) {
      console.error("No content or image provided");
      return;
    }

    let imagePath = "";

    // Upload image to Supabase Storage if an image is provided
    if (imageFile) {
      const fileName = `${Date.now()}_${imageFile.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("message-images") // Your Supabase Storage bucket name
        .upload(fileName, imageFile);

      if (uploadError) {
        console.error("Error uploading image:", uploadError.message);
        return;
      }

      // Get the public URL of the uploaded image
      const { data: publicUrlData } = supabase.storage
        .from("message-images")
        .getPublicUrl(fileName);

      imagePath = publicUrlData.publicUrl;
    }

    // Insert the message into the database
    const { data, error } = await supabase
      .from("messages")
      .insert([{ user_id: currentUser, title, content, imagePath }])
      .select();

    if (error) {
      console.error("Error sending message:", error.message);
    } else {
      console.log("Message sent successfully:", data);
      setnewpost("");
    }
  };
  const addPost = async (formData: FormData) => {
    const result = await createPost(formData);
    if ("error" in result) {
      return { error: result.error };
    }
    setPosts([{ ...result, user_id: currentUser }, ...posts]);
    await sendMessage(formData);
    return {};
  };

  const deletePost = (id: string) => {
    setPosts(posts.filter((post) => post.id !== id));
  };
  useEffect(() => {
    // Fetch initial messages from Supabase
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching posts:", error);
      } else {
        console.log("Fetched messages:", data);
        // Combine hardcoded messages with fetched messages
        setPosts(data);
      }
    };

    fetchPosts();

    // Subscribe to new messages
    const subscription = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        (payload: { new: PostData }) => {
          console.log("New message received:", payload.new);
          setPosts((prev) => [...prev, payload.new]);
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <>
      <div className="mb-4 text-gray-400">Logged in as: {currentUser}</div>
      <CreatePostForm onSubmit={addPost} />
      <div className="space-y-6">
        {posts.map((post) => (
          <Post
            key={post.id}
            {...post}
            currentUser={currentUser}
            onDelete={deletePost}
          />
        ))}
      </div>
    </>
  );
}
