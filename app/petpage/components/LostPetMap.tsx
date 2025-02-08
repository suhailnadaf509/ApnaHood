"use client"

import { useEffect, useRef } from "react"

interface Comment {
  id: string
  author: string
  content: string
  location: string
  timestamp: string
}

interface LostPetMapProps {
  comments: Comment[]
}

declare global {
  interface Window {
    google: any
  }
}

export default function LostPetMap({ comments }: LostPetMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window.google === "undefined") {
      const script = document.createElement("script")
      script.src = `https://maps.googleapis.com/maps/api/js?key={env.process.NEXT_GOOGLE_MAPS_APIKEY}&callback=initMap`
      script.async = true
      document.head.appendChild(script)
      return () => {
        document.head.removeChild(script)
      }
    } else {
      initMap()
    }
  }, []) // Removed unnecessary dependency: comments

  const initMap = () => {
    if (!mapRef.current) return

    const map = new window.google.maps.Map(mapRef.current, {
      zoom: 12,
      center: { lat: 0, lng: 0 },
      styles: [
        { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
        { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
        { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
      ],
    })

    const bounds = new window.google.maps.LatLngBounds()

    comments.forEach((comment, index) => {
      const location = extractLatLng(comment.location)
      if (location) {
        const marker = new window.google.maps.Marker({
          position: location,
          map: map,
          label: `${index + 1}`,
        })
        bounds.extend(location)
      }
    })

    map.fitBounds(bounds)
  }

  const extractLatLng = (url: string) => {
    const match = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/)
    return match ? { lat: Number.parseFloat(match[1]), lng: Number.parseFloat(match[2]) } : null
  }

  return <div ref={mapRef} style={{ width: "100%", height: "400px" }} />
}

