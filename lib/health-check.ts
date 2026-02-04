import { db } from "@/db"
import { carsTable } from "@/db/schema"
import { logger } from "@/lib/logger"

export interface HealthCheckResult {
  status: 'healthy' | 'degraded' | 'unhealthy'
  database: {
    connected: boolean
    tableCount: number
    lastCheck: Date
  }
  errors: string[]
}

export async function checkDatabaseHealth(): Promise<HealthCheckResult> {
  const result: HealthCheckResult = {
    status: 'healthy',
    database: {
      connected: false,
      tableCount: 0,
      lastCheck: new Date(),
    },
    errors: [],
  }

  try {
    if (!db) {
      result.errors.push('Database client not initialized')
      result.status = 'unhealthy'
      logger.error('Database health check failed - client not initialized', 'health-check')
      return result
    }

    // Try a simple query
    const cars = await db
      .select()
      .from(carsTable)
      .limit(1)

    result.database.connected = true
    result.database.tableCount = 1 // At least cars table exists
    
    logger.info('Database health check passed', 'health-check', {
      connected: true,
      hasData: cars.length > 0,
    })

    return result
  } catch (error) {
    result.database.connected = false
    result.status = 'unhealthy'
    result.errors.push(error instanceof Error ? error.message : String(error))
    
    logger.error('Database health check failed', 'health-check', error)
    return result
  }
}

/**
 * Check if app is in maintenance mode
 */
export async function isMaintenanceMode(): Promise<boolean> {
  try {
    if (!db) return false

    // Implement if you add a maintenance_mode setting
    // const maintenanceSetting = await getSetting('maintenance_mode')
    // return maintenanceSetting?.value === 'true'
    
    return false
  } catch (error) {
    logger.error('Failed to check maintenance mode', 'health-check', error)
    return false
  }
}

/**
 * Get system statistics for admin dashboard
 */
export async function getSystemStats() {
  const health = await checkDatabaseHealth()
  
  return {
    health,
    timestamp: new Date().toISOString(),
    environment: {
      nodeEnv: process.env.NODE_ENV || 'unknown',
      hasDatabase: !!db,
      logToFile: process.env.LOG_TO_FILE === 'true',
    },
  }
}
