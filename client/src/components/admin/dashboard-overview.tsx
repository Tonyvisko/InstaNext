"use client"

import { Users, FileText, MessageSquare, AlertTriangle } from "lucide-react"
import StatCard from "./stat-card"
import OverviewChart from "./charts/overview-chart"
import ActivityChart from "./charts/activity-chart"
import UserGrowthChart from "./charts/user-growth-chart"

export default function DashboardOverview() {
  const stats = [
    {
      label: "Người Dùng Tổng Cộng",
      value: "15,482",
      change: "+12.5%",
      icon: Users,
      color: "from-blue-500 to-cyan-500",
    },
    {
      label: "Bài Viết Hôm Nay",
      value: "2,847",
      change: "+8.2%",
      icon: FileText,
      color: "from-purple-500 to-pink-500",
    },
    {
      label: "Bình Luận Tổng Cộng",
      value: "54,293",
      change: "+23.1%",
      icon: MessageSquare,
      color: "from-green-500 to-emerald-500",
    },
    {
      label: "Vi Phạm Đang Chờ",
      value: "32",
      change: "-5.4%",
      icon: AlertTriangle,
      color: "from-red-500 to-orange-500",
    },
  ]

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border bg-card">
        <h1 className="text-3xl font-bold text-foreground">Bảng Điều Khiển Quản Trị</h1>
        <p className="text-muted-foreground mt-1">Chào mừng quay lại, Admin</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <OverviewChart />
            </div>
            <div>
              <ActivityChart />
            </div>
          </div>

          {/* User Growth */}
          <div>
            <UserGrowthChart />
          </div>
        </div>
      </div>
    </div>
  )
}
