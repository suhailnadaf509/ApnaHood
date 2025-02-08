import "../globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Lost Pets Board",
  description: "A place to report and find lost pets in the neighborhood",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} dark bg-[#0A0A0A] text-gray-300 min-h-screen`}>
        {children}
      </body>
    </html>
  )
}