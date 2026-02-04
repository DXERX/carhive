'use client'

import { logger } from '@/lib/logger'
import { useEffect } from 'react'

export default function AdminBookingsErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    logger.error('Admin bookings page error', 'admin-bookings-error', error)
  }, [error])

  return (
    <div className="space-y-4">
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <h2 className="text-lg font-semibold text-red-900 mb-2">Error Loading Bookings</h2>
        <p className="text-red-700">Failed to load bookings data. Please try again.</p>
        
        {process.env.NODE_ENV === 'development' && (
          <details className="mt-2 text-sm text-red-600">
            <summary className="cursor-pointer">Debug Info</summary>
            <pre className="mt-2 bg-red-100 p-2 rounded overflow-auto text-xs">
              {error.message}
            </pre>
          </details>
        )}
      </div>

      <button
        onClick={() => reset()}
        className="inline-block bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
      >
        Try Again
      </button>
    </div>
  )
}
