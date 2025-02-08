import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Navigation() {
  return (
    <nav className="bg-[#121212] p-4 mb-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" passHref>
          <Button variant="link" className="text-gray-100">
            Community Board
          </Button>
        </Link>
        <Link href="/admin" passHref>
          <Button variant="link" className="text-gray-100">
            Admin Dashboard
          </Button>
        </Link>
      </div>
    </nav>
  )
}

