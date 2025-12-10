"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card } from "@/components/ui/card"

const data = [
  { month: "Tháng 1", newUsers: 240, activeUsers: 720 },
  { month: "Tháng 2", newUsers: 340, activeUsers: 850 },
  { month: "Tháng 3", newUsers: 420, activeUsers: 950 },
  { month: "Tháng 4", newUsers: 380, activeUsers: 1100 },
  { month: "Tháng 5", newUsers: 550, activeUsers: 1250 },
  { month: "Tháng 6", newUsers: 680, activeUsers: 1480 },
]

export default function UserGrowthChart() {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-bold text-foreground mb-4">Tăng Trưởng Người Dùng</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
          <YAxis stroke="hsl(var(--muted-foreground))" />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
            }}
          />
          <Legend />
          <Bar dataKey="newUsers" fill="#3b82f6" name="Người Dùng Mới" />
          <Bar dataKey="activeUsers" fill="#10b981" name="Người Dùng Hoạt Động" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}
