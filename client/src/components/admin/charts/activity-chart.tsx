"use client"

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"
import { Card } from "@/components/ui/card"

const data = [
  { name: "Bình Luận", value: 45 },
  { name: "Thích", value: 30 },
  { name: "Chia Sẻ", value: 15 }
]

const COLORS = ["#3b82f6", "#8b5cf6", "#ec4899" ]

export default function ActivityChart() {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-bold text-foreground mb-4">Phân Loại Hoạt Động</h2>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name} ${value}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  )
}
