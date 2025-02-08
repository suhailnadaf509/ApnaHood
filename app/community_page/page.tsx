"use client";
import { Inter } from "next/font/google";
import Posts from "./components/Posts";
import ChatComponent from "./components/ChatComponent";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main>
      <div
        className={`${inter.className} bg-[#0A0A0A] text-gray-300 min-h-screen`}
      >
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6 text-gray-100">
            Community Board
          </h1>
          <Posts />
        </div>
      </div>
    </main>
  );
}
