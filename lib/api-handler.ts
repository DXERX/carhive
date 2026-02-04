import { NextRequest, NextResponse } from 'next/server'
import { logger } from '@/lib/logger'

export interface ApiErrorResponse {
  success: false
  error: string
  message?: string
  details?: any
}

export interface ApiSuccessResponse<T> {
  success: true
  data: T
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse

/**
 * Wrapper for API routes with error handling and logging
 */
export async function handleApiRequest<T>(
  req: NextRequest,
  handler: (req: NextRequest) => Promise<T>,
  context?: { endpoint?: string }
): Promise<NextResponse<ApiResponse<T>>> {
  const startTime = Date.now()
  const endpoint = context?.endpoint || req.nextUrl.pathname
  
  try {
    logger.debug(`${req.method} ${endpoint} started`, 'api-handler')
    
    const data = await handler(req)
    
    const duration = Date.now() - startTime
    logger.info(`${req.method} ${endpoint} completed in ${duration}ms`, 'api-handler', { duration })
    
    return NextResponse.json({ success: true, data } as ApiResponse<T>)
  } catch (error) {
    const duration = Date.now() - startTime
    
    // Handle specific error types
    if (error instanceof Error) {
      logger.error(
        `${req.method} ${endpoint} failed after ${duration}ms`,
        'api-handler',
        error,
        { duration, message: error.message }
      )
      
      return NextResponse.json(
        {
          success: false,
          error: error.message,
          message: 'An error occurred processing your request',
        } as ApiErrorResponse,
        { status: 500 }
      )
    }
    
    // Handle unknown errors
    logger.error(
      `${req.method} ${endpoint} failed with unknown error after ${duration}ms`,
      'api-handler',
      error,
      { duration, error: String(error) }
    )
    
    return NextResponse.json(
      {
        success: false,
        error: 'Internal Server Error',
        message: 'An unexpected error occurred',
      } as ApiErrorResponse,
      { status: 500 }
    )
  }
}

/**
 * Helper to validate request body
 */
export async function validateRequestBody<T>(req: NextRequest): Promise<T> {
  try {
    const body = await req.json()
    return body as T
  } catch (error) {
    logger.warn('Failed to parse request body', 'api-handler', error)
    throw new Error('Invalid request body')
  }
}

/**
 * Helper to check authentication
 */
export function requireAuth(token?: string): boolean {
  if (!token) {
    logger.warn('Missing authentication token', 'api-handler')
    return false
  }
  return true
}
