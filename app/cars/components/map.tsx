"use client"

import { useEffect, useRef, useState } from "react"
import { useSearchParams } from "next/navigation"
import type { Map as LeafletMap } from "leaflet"
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet"
import L from "leaflet"

import "leaflet/dist/leaflet.css"

import {
  MAP_INITIAL_ZOOM_LEVEL,
  MAP_LOCATION_ZOOM_LEVEL,
} from "@/lib/constants"
import { SearchParams } from "@/lib/types"
import { useToast } from "@/hooks/use-toast"

// Custom marker icon - a modern pin with car design
const customIcon = new L.Icon({
  iconUrl: "data:image/svg+xml;base64," + btoa(`
    <svg width="48" height="58" viewBox="0 0 48 58" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Shadow -->
      <ellipse cx="24" cy="56" rx="8" ry="2" fill="#000" opacity="0.2"/>
      <!-- Pin body -->
      <path d="M24 0C14.611 0 7 7.611 7 17c0 1.567.204 3.087.581 4.534C9.598 30.158 24 54 24 54s14.402-23.842 16.419-32.466c.377-1.447.581-2.967.581-4.534C41 7.611 33.389 0 24 0z" fill="#EF4444" stroke="#991B1B" stroke-width="1.5"/>
      <!-- Inner circle -->
      <circle cx="24" cy="17" r="10" fill="white"/>
      <!-- Car icon -->
      <path d="M20 15h8l1 2v3h-1.5a1.5 1.5 0 01-3 0h-3a1.5 1.5 0 01-3 0H17v-3l1-2zm1 1l-.5 1.5h7l-.5-1.5h-6z" fill="#EF4444"/>
    </svg>
  `),
  iconSize: [48, 58],
  iconAnchor: [24, 58],
  popupAnchor: [0, -58],
})

// Istanbul locations
const istanbulLocations = [
  {
    id: 1,
    name: "Istanbul Airport",
    lat: 41.2619,
    lng: 28.7419,
  },
  {
    id: 2,
    name: "Sabiha Gökçen Airport",
    lat: 40.8986,
    lng: 29.3092,
  },
  {
    id: 3,
    name: "Taksim Square",
    lat: 41.0369,
    lng: 28.9856,
  },
  {
    id: 4,
    name: "Sultanahmet",
    lat: 41.0082,
    lng: 28.9784,
  },
]

export default function Map() {
  const searchParams = useSearchParams()
  const mapRef = useRef<LeafletMap | null>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  function Recenter() {
    const map = useMap()
    const { toast } = useToast()

    useEffect(() => {
      if (
        searchParams.has(SearchParams.LAT) &&
        searchParams.has(SearchParams.LNG)
      ) {
        const lat = Number(searchParams.get(SearchParams.LAT))
        const lng = Number(searchParams.get(SearchParams.LNG))

        if (!isNaN(lat) && !isNaN(lng)) {
          map.setView({ lat, lng }, MAP_LOCATION_ZOOM_LEVEL)
        } else {
          console.error("Invalid latitude or longitude values:", { lat, lng })
          toast({
            variant: "destructive",
            title: "Invalid Location Data",
            description:
              "Either the latitude or longitude search parameters in the URL are not valid numbers. Please check the URL and try again.",
          })
        }
      } else {
        // Default view centered on Istanbul
        map.setView([41.0082, 28.9784], 11)
      }
    }, [map, toast])

    return null
  }

  if (!isClient) {
    return <div className="h-[calc(100dvh_-_var(--site-header-height))] bg-neutral-100" />
  }

  return (
    <MapContainer
      className="h-[calc(100dvh_-_var(--site-header-height))]"
      center={[41.0082, 28.9784]}
      zoom={11}
      ref={mapRef}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Recenter />
      
      {/* Location markers */}
      {istanbulLocations.map((location) => (
        <Marker
          key={location.id}
          position={[location.lat, location.lng]}
          icon={customIcon}
        >
          <Popup>
            <div className="p-2 text-center">
              <strong className="text-base font-semibold text-neutral-900">{location.name}</strong>
              <p className="mt-2 text-sm text-neutral-600">
                🚗 Car rental available 24/7
              </p>
              <p className="mt-1 text-xs text-neutral-500">
                Premium vehicles • Airport pickup
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
