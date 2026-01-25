import { NextResponse } from 'next/server'
import { getLocations } from '@/db/queries/location-repository'

export const dynamic = 'force-static'
export const revalidate = 3600 // Cache for 1 hour

export async function GET() {
  try {
    const locations = await getLocations()
    
    return NextResponse.json(locations, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
      },
    })
  } catch (error) {
    console.error('Failed to fetch locations:', error)
    return NextResponse.json(
      { error: 'Failed to fetch locations' },
      { status: 500 }
    )
  }
}
