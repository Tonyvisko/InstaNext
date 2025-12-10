"use client"

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Card } from "@/components/ui/card"

const data = [
  { time: "00:00", users: 450 },
  { time: "02:00", users: 320 },
  { time: "04:00", users: 280 },
  { time: "06:00", users: 420 },
  { time: "08:00", users: 780 },
  { time: "10:00", users: 1020 },
  { time: "12:00", users: 1150 },
  { time: "14:00", users: 1247 },
  { time: "16:00", users: 1100 },
  { time: "18:00", users: 950 },
  { time: "20:00", users: 1300 },
  { time: "22:00", users: 650 },
]

export default function RealtimeUsersChart() {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-bold text-foreground mb-4">Người Dùng Online Theo Giờ</h2>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
          <YAxis stroke="hsl(var(--muted-foreground))" />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
            }}
          />
          <Area type="monotone" dataKey="users" stroke="#3b82f6" fillOpacity={1} fill="url(#colorUsers)" />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  )
}
