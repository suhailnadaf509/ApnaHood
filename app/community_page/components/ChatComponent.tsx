import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";

interface Message {
  id: string;
  user_id: string;
  message: string;
  created_at: string;
}
import { getSession } from "next-auth/react";
const ChatComponent = () => {
  // Initialize state with hardcoded messages
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
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
  const usernames = userName.split("@")[0];
  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const { data, error } = await supabase
      .from("messages")
      .insert([{ user_id: usernames, message: newMessage }])
      .select();

    if (error) {
      console.error("Error sending message:", error);
    } else {
      setNewMessage("");
    }
  };

  useEffect(() => {
    // Fetch initial messages from Supabase
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching messages:", error);
      } else {
        console.log("Fetched messages:", data);
        // Combine hardcoded messages with fetched messages
        setMessages((prev) => [...prev, ...data]);
      }
    };

    fetchMessages();

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
        (payload: { new: Message }) => {
          console.log("New message received:", payload.new);
          setMessages((prev) => [...prev, payload.new]);
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div
      style={{
        backgroundColor: "black",
        color: "white",
        border: "2px solid red",
        padding: "16px",
        marginBottom: "16px",
      }}
    >
      <p>Chat Room</p>
      <p>Username: {usernames}</p>
      {messages.map((message) => (
        <div key={message.id} style={{ marginBottom: "8px" }}>
          <strong>{message.user_id}:</strong> {message.message}
        </div>
      ))}
      <div>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          style={{ color: "black", marginRight: "8px" }}
        />
        <button onClick={sendMessage} style={{ color: "white" }}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;
