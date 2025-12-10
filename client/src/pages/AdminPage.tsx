"use client"

import { useState } from "react"
import Sidebar from "@/components/admin/sidebar"
import DashboardOverview from "@/components/admin/dashboard-overview"
import UserManagement from "@/components/admin/user-management"
import TrendingPosts from "@/components/admin/trending-posts"
import ViolationManagement from "@/components/admin/violation-management"
import MonitoringPanel from "@/components/admin/monitoring-panel"

type Page = "overview" | "users" | "posts" | "violations" | "monitoring"

export default function AdminDashboard() {
  const [currentPage, setCurrentPage] = useState<Page>("overview")

  const renderPage = () => {
    switch (currentPage) {
      case "overview":
        return <DashboardOverview />
      case "users":
        return <UserManagement />
      case "posts":
        return <TrendingPosts />
      case "violations":
        return <ViolationManagement />
      case "monitoring":
        return <MonitoringPanel />
      default:
        return <DashboardOverview />
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="flex-1 overflow-auto">{renderPage()}</main>
    </div>
  )
}
