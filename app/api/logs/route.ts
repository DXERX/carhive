import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export const runtime = 'nodejs'

interface LogEntry {
  timestamp: string
  level: string
  message: string
  context?: string
  error?: string
  data?: any
}

export async function POST(request: NextRequest) {
  try {
    const date = request.nextUrl.searchParams.get('date') || new Date().toISOString().split('T')[0]
    const entry: LogEntry = await request.json()

    // Only server-side processing
    if (process.env.NODE_ENV === 'production' || process.env.LOG_TO_FILE === 'true') {
      const logDir = process.env.LOG_DIR || '/tmp/carhive-logs'
      const logFile = path.join(logDir, `app-${date}.log`)

      // Ensure directory exists
      try {
        if (!fs.existsSync(logDir)) {
          fs.mkdirSync(logDir, { recursive: true })
        }

        // Format log entry
        const baseLog = `[${entry.timestamp}] [${entry.level}]${entry.context ? ` [${entry.context}]` : ''} ${entry.message}`
        const formattedLog = entry.error
          ? `${baseLog}\nError: ${entry.error}`
          : entry.data
            ? `${baseLog}\nData: ${JSON.stringify(entry.data)}`
            : baseLog

        // Append to file
        fs.appendFileSync(logFile, formattedLog + '\n', 'utf8')
      } catch (fileError) {
        // Silently fail - don't recursively log
        console.error('Failed to write log file:', fileError)
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Logging API error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to log' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const date = request.nextUrl.searchParams.get('date') || new Date().toISOString().split('T')[0]
    const logDir = process.env.LOG_DIR || '/tmp/carhive-logs'
    const logFile = path.join(logDir, `app-${date}.log`)

    // Security: only allow reading log files
    if (!logFile.startsWith(logDir)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    if (!fs.existsSync(logFile)) {
      return NextResponse.json({ logs: [] })
    }

    // Read file and return last 100 lines
    const content = fs.readFileSync(logFile, 'utf8')
    const lines = content.split('\n').filter(Boolean).slice(-100)

    return NextResponse.json({ logs: lines, count: lines.length })
  } catch (error) {
    console.error('Failed to read logs:', error)
    return NextResponse.json(
      { error: 'Failed to read logs' },
      { status: 500 }
    )
  }
}
