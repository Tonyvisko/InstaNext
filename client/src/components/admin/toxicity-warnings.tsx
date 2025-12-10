"use client"

import { AlertTriangle } from "lucide-react"
import { Card } from "@/components/ui/card"

const warnings = [
  { level: "Cao", count: 5, color: "text-red-500 bg-red-50 dark:bg-red-950" },
  { level: "Trung Bình", count: 12, color: "text-orange-500 bg-orange-50 dark:bg-orange-950" },
  { level: "Thấp", count: 28, color: "text-yellow-500 bg-yellow-50 dark:bg-yellow-950" },
]

export default function ToxicityWarnings() {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
        <AlertTriangle className="w-5 h-5" />
        Cảnh Báo Ngôn Từ
      </h2>
      <div className="space-y-3">
        {warnings.map((warning, index) => (
          <div key={index} className={`p-3 rounded-lg ${warning.color}`}>
            <div className="flex items-center justify-between">
              <span className="font-medium text-sm">{warning.level}</span>
              <span className="text-lg font-bold">{warning.count}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
