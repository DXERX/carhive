'use client'

import { useEffect } from 'react'
import { logger } from '@/lib/logger'

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    logger.error('Application error', 'error-boundary', error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="mt-6 text-3xl font-extrabold text-gray-900">
            Oops! Something went wrong
          </h1>
          <p className="mt-2 text-gray-600">
            We apologize for the inconvenience. Please try again or contact support.
          </p>
        </div>

        {process.env.NODE_ENV === 'development' && (
          <div className="bg-red-50 border border-red-200 rounded p-4">
            <p className="text-sm text-red-800 font-mono">{error.message}</p>
            {error.digest && (
              <p className="text-xs text-red-600 mt-2">Error ID: {error.digest}</p>
            )}
          </div>
        )}

        <button
          onClick={() => reset()}
          className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition"
        >
          Try Again
        </button>

        <a
          href="/"
          className="block w-full text-center bg-gray-300 text-gray-900 py-2 px-4 rounded hover:bg-gray-400 transition"
        >
          Go Home
        </a>
      </div>
    </div>
  )
}
