"use client"

import { useEffect, useState } from "react"
import { Users, Activity, TrendingUp } from "lucide-react"
import { Card } from "@/components/ui/card"
import RealtimeUsersChart from "./charts/realtime-users-chart"
import ToxicityWarnings from "./toxicity-warnings"

export default function MonitoringPanel() {
  const [onlineUsers, setOnlineUsers] = useState(1247)
  const [activeRequests, setActiveRequests] = useState(342)
  const [serverHealth, setServerHealth] = useState(98)

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineUsers((prev) => prev + Math.floor(Math.random() * 20) - 10)
      setActiveRequests((prev) => prev + Math.floor(Math.random() * 30) - 15)
      setServerHealth((prev) => Math.max(90, Math.min(100, prev + Math.floor(Math.random() * 4) - 2)))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border bg-card">
        <h1 className="text-3xl font-bold text-foreground">Giám Sát Thời Gian Thực</h1>
        <p className="text-muted-foreground mt-1">Theo dõi trạng thái hệ thống và hoạt động người dùng</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="space-y-6">
          {/* Real-time Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Người Dùng Online</p>
                  <h3 className="text-3xl font-bold text-foreground mt-2">{onlineUsers.toLocaleString()}</h3>
                </div>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center animate-pulse">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Yêu Cầu Hoạt Động</p>
                  <h3 className="text-3xl font-bold text-foreground mt-2">{activeRequests.toLocaleString()}</h3>
                </div>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center animate-pulse">
                  <Activity className="w-6 h-6 text-white" />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Sức Khỏe Hệ Thống</p>
                  <h3 className="text-3xl font-bold text-foreground mt-2">{serverHealth}%</h3>
                </div>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <RealtimeUsersChart />
            </div>
            <div>
              <ToxicityWarnings />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
