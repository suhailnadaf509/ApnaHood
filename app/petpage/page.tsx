import LostPetsPosts from "./components/LostPetsPosts"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-gray-300 p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-100">Lost Pets in the Neighborhood</h1>
      <LostPetsPosts />
    </div>
  )
}

