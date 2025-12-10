"use client"

import { useState } from "react"
import { Search, Lock, Unlock, Trash2 } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface User {
  id: string
  fullname: string
  email: string
  status: "active" | "locked"
  joinDate: string
  posts: number
}

const mockUsers: User[] = [
  {
    id: "1",
    fullname: "Nguyễn Văn A",
    email: "nguyenvana@email.com",
    status: "active",
    joinDate: "2024-01-15",
    posts: 45,
  },
  { id: "2", fullname: "Trần Thị B", email: "tranthib@email.com", status: "active", joinDate: "2024-02-20", posts: 32 },
  {
    id: "3",
    fullname: "Phạm Minh C",
    email: "phamminhc@email.com",
    status: "locked",
    joinDate: "2024-03-10",
    posts: 18,
  },
  { id: "4", fullname: "Đỗ Quốc D", email: "doquocd@email.com", status: "active", joinDate: "2024-04-05", posts: 56 },
  {
    id: "5",
    fullname: "Hoàng Thu E",
    email: "hoangthue@email.com",
    status: "active",
    joinDate: "2024-05-12",
    posts: 23,
  },
]

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredUsers = users.filter(
    (user) =>
      user.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleToggleLock = (id: string) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, status: user.status === "active" ? "locked" : "active" } : user,
      ),
    )
  }

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter((user) => user.id !== id))
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border bg-card">
        <h1 className="text-3xl font-bold text-foreground">Quản Lý Tài Khoản Người Dùng</h1>
        <p className="text-muted-foreground mt-1">Quản lý và giám sát tài khoản người dùng trên nền tảng</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <Card className="p-6">
          {/* Search */}
          <div className="mb-6 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên hoặc email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Tên Người Dùng</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Email</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Trạng Thái</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Ngày Tham Gia</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Bài Viết</th>
                  <th className="text-center py-3 px-4 font-semibold text-muted-foreground">Hành Động</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="py-4 px-4 text-foreground font-medium">{user.fullname}</td>
                    <td className="py-4 px-4 text-muted-foreground">{user.email}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          user.status === "active"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                        }`}
                      >
                        {user.status === "active" ? "Hoạt Động" : "Khóa"}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-muted-foreground">{user.joinDate}</td>
                    <td className="py-4 px-4 text-foreground">{user.posts}</td>
                    <td className="py-4 px-4">
                      <div className="flex justify-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleToggleLock(user.id)}
                          title={user.status === "active" ? "Khóa tài khoản" : "Mở khóa tài khoản"}
                        >
                          {user.status === "active" ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                        </Button>
                        <Button
                          size="sm"
                          variant="default"
                          onClick={() => handleDeleteUser(user.id)}
                          title="Xóa tài khoản"
                          className="!bg-red-600 text-white hover:bg-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  )
}
