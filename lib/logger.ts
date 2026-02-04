import { LogLevel } from './logger.types'

export { LogLevel }

interface LogEntry {
  timestamp: string
  level: LogLevel
  message: string
  context?: string
  error?: any
  data?: any
}

class Logger {
  private isServer = typeof window === 'undefined'

  private formatLog(entry: LogEntry): string {
    const baseLog = `[${entry.timestamp}] [${entry.level}]${entry.context ? ` [${entry.context}]` : ''} ${entry.message}`
    
    if (entry.error) {
      return `${baseLog}\nError: ${entry.error.message || JSON.stringify(entry.error)}`
    }
    
    if (entry.data) {
      return `${baseLog}\nData: ${JSON.stringify(entry.data, null, 2)}`
    }
    
    return baseLog
  }

  private async writeToFile(entry: LogEntry) {
    // File logging only on server side
    if (!this.isServer) return
    
    try {
      // Send to server API for file logging
      const logDate = new Date().toISOString().split('T')[0]
      await fetch(`/api/logs?date=${logDate}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry),
      }).catch(() => {}) // Silent fail if API unavailable
    } catch (error) {
      // Silently fail - can't write logs if logger itself fails
    }
  }

  private log(level: LogLevel, message: string, context?: string, error?: any, data?: any) {
    const timestamp = new Date().toISOString()
    const entry: LogEntry = { timestamp, level, message, context, error, data }

    // Console output
    const logFn = level === LogLevel.ERROR ? console.error : level === LogLevel.WARN ? console.warn : console.log
    logFn(`[${level}]${context ? ` [${context}]` : ''} ${message}`, error || data || '')

    // File output (server only)
    if ((process.env.NODE_ENV === 'production' || process.env.LOG_TO_FILE === 'true') && this.isServer) {
      this.writeToFile(entry).catch(() => {})
    }
  }

  error(message: string, context?: string, error?: any, data?: any) {
    this.log(LogLevel.ERROR, message, context, error, data)
  }

  warn(message: string, context?: string, data?: any) {
    this.log(LogLevel.WARN, message, context, undefined, data)
  }

  info(message: string, context?: string, data?: any) {
    this.log(LogLevel.INFO, message, context, undefined, data)
  }

  debug(message: string, context?: string, data?: any) {
    if (process.env.DEBUG === 'true') {
      this.log(LogLevel.DEBUG, message, context, undefined, data)
    }
  }
}

export const logger = new Logger()
