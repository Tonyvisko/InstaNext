"use client"

import { LayoutDashboard, Users, Flame, AlertCircle, Activity, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SidebarProps {
  currentPage: string
  setCurrentPage: (page: any) => void
}

export default function Sidebar({ currentPage, setCurrentPage }: SidebarProps) {
  const menuItems = [
    { id: "overview", label: "Tổng Quan", icon: LayoutDashboard },
    { id: "users", label: "Quản Lý Tài Khoản", icon: Users },
    { id: "posts", label: "Bài Viết Hot", icon: Flame },
    { id: "violations", label: "Quản Lý Vi Phạm", icon: AlertCircle },
    { id: "monitoring", label: "Giám Sát Thời Gian Thực", icon: Activity },
  ]

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-sidebar-border">
        <h1 className="text-2xl font-bold text-sidebar-foreground">Admin Panel</h1>
        <p className="text-sm text-sidebar-foreground/60 mt-1">Social Media Management</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = currentPage === item.id
          return (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left",
                isActive
                  ? "!bg-sidebar-primary text-sidebar-primary-foreground"
                  : "!text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <Button variant="outline" className="w-full flex items-center justify-center gap-2 bg-transparent">
          <LogOut className="w-4 h-4" />
          Đăng Xuất
        </Button>
      </div>
    </aside>
  )
}
