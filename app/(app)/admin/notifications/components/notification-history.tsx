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
      <div className="text-muted-foreground py-8 text-center">
        <Bell className="mx-auto mb-3 size-12 opacity-30" />
        <p>No notifications sent yet</p>
        <p className="mt-1 text-sm">Send your first notification to get started</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {notifications.map((notification: any) => (
        <div key={notification.id} className="rounded-lg border p-3">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-medium">{notification.title}</h4>
              <p className="text-muted-foreground mt-1 text-sm">
                {notification.message}
              </p>
            </div>
            <Badge variant="secondary">{notification.target}</Badge>
          </div>
          <div className="text-muted-foreground mt-2 flex items-center gap-4 text-xs">
            <span>{notification.sentAt}</span>
            <span className="flex items-center gap-1">
              <CheckCircle className="size-3" />
              {notification.readCount} read
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
