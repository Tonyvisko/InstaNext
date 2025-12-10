"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card } from "@/components/ui/card"

const data = [
  { time: "00:00", posts: 240, comments: 180, likes: 400 },
  { time: "04:00", posts: 300, comments: 200, likes: 500 },
  { time: "08:00", posts: 450, comments: 350, likes: 800 },
  { time: "12:00", posts: 520, comments: 400, likes: 950 },
  { time: "16:00", posts: 480, comments: 380, likes: 920 },
  { time: "20:00", posts: 650, comments: 500, likes: 1200 },
  { time: "24:00", posts: 720, comments: 580, likes: 1400 },
]

export default function OverviewChart() {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-bold text-foreground mb-4">Hoạt Động Trong 24 Giờ</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
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
          <Legend />
          <Line type="monotone" dataKey="posts" stroke="#3b82f6" strokeWidth={2} />
          <Line type="monotone" dataKey="comments" stroke="#8b5cf6" strokeWidth={2} />
          <Line type="monotone" dataKey="likes" stroke="#ec4899" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  )
}
