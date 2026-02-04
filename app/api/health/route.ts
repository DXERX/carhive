import { NextRequest } from 'next/server'
import { getSystemStats, checkDatabaseHealth } from '@/lib/health-check'
import { handleApiRequest } from '@/lib/api-handler'
import { logger } from '@/lib/logger'

export async function GET(request: NextRequest) {
  return handleApiRequest(
    request,
    async () => {
      try {
        logger.info('Health check requested', 'health-api')
        
        const stats = await getSystemStats()
        const health = await checkDatabaseHealth()
        
        return {
          status: health.status,
          database: health.database,
          environment: stats.environment,
          timestamp: stats.timestamp,
          errors: health.errors.length > 0 ? health.errors : undefined,
        }
      } catch (error) {
        logger.error('Health check failed', 'health-api', error)
        throw error
      }
    },
    { endpoint: '/api/health' }
  )
}
