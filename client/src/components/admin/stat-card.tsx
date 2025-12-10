import type { LucideIcon } from "lucide-react"
import { Card } from "@/components/ui/card"

interface StatCardProps {
  label: string
  value: string
  change: string
  icon: LucideIcon
  color: string
}

export default function StatCard({ label, value, change, icon: Icon, color }: StatCardProps) {
  const isPositive = change.startsWith("+")

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground font-medium">{label}</p>
          <h3 className="text-3xl font-bold text-foreground mt-2">{value}</h3>
          <p className={`text-sm mt-2 font-semibold ${isPositive ? "text-green-600" : "text-red-600"}`}>{change}</p>
        </div>
        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </Card>
  )
}
