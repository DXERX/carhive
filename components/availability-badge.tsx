import { Clock } from "lucide-react"

export function AvailabilityBadge() {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-sm font-medium text-green-700">
      <Clock className="h-4 w-4 animate-pulse" />
      <span>24/7 Available - Book Anytime</span>
    </div>
  )
}
