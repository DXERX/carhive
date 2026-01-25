"use client"

import { Badge } from "@/components/ui/badge"
import { Bell, Users, CheckCircle } from "lucide-react"

export function NotificationHistory() {
  // This would fetch from database in production
  const notifications: any[] = [
    // Placeholder data
  ]

  if (notifications.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <Bell className="h-12 w-12 mx-auto mb-3 opacity-30" />
        <p>No notifications sent yet</p>
        <p className="text-sm mt-1">Send your first notification to get started</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {notifications.map((notification: any) => (
        <div key={notification.id} className="p-3 border rounded-lg">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-medium">{notification.title}</h4>
              <p className="text-sm text-muted-foreground mt-1">
                {notification.message}
              </p>
            </div>
            <Badge variant="secondary">{notification.target}</Badge>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
            <span>{notification.sentAt}</span>
            <span className="flex items-center gap-1">
              <CheckCircle className="h-3 w-3" />
              {notification.readCount} read
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
