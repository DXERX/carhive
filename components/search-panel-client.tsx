"use client"

import { useEffect, useState } from "react"
import { SearchPanel } from "./search-panel"

type Location = {
  id: number
  name: string
  slug: string
  latitude: number
  longitude: number
}

export function SearchPanelClient(props: any) {
  const [locations, setLocations] = useState<Location[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch locations client-side to avoid blocking server render
    fetch('/api/locations')
      .then(res => res.json())
      .then(data => {
        setLocations(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to fetch locations:', err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="animate-pulse rounded-lg border bg-white p-8">
        <div className="h-20 bg-gray-200 rounded"></div>
      </div>
    )
  }

  if (!locations.length) return null

  return <SearchPanel locations={locations} {...props} />
}
